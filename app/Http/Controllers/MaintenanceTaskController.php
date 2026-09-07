<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Facility;
use App\Models\MaintenanceTask;
use App\Models\User;
use App\Services\Audit\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceTaskController extends Controller
{
    public function __construct(
        protected AuditLogger $auditLogger
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $statusFilter = $request->input('status');
        $priorityFilter = $request->input('priority');

        $query = MaintenanceTask::where('organization_id', $org->id)
            ->with(['asset', 'assignee', 'assessment']);

        if (! empty($statusFilter)) {
            $query->where('status', $statusFilter);
        }

        if (! empty($priorityFilter)) {
            $query->where('priority', $priorityFilter);
        }

        $tasks = $query->latest('id')->get()->map(fn ($t) => [
            'id' => $t->id,
            'title' => $t->title,
            'asset_id' => $t->asset_id,
            'asset_code' => $t->asset?->code,
            'asset_name' => $t->asset?->name,
            'assignee_id' => $t->assignee_id,
            'assignee_name' => $t->assignee?->name ?? 'Belum ditugaskan',
            'priority' => $t->priority,
            'status' => $t->status,
            'due_at' => $t->due_at?->toDateString(),
            'notes' => $t->notes,
            'created_at' => $t->created_at->format('d M Y H:i'),
        ]);

        $members = $org->users()->get()->map(fn ($u) => [
            'id' => $u->id,
            'name' => $u->name,
            'role' => $u->pivot->role,
        ]);

        $assets = Asset::where('facility_id', $facility->id)->get(['id', 'code', 'name']);

        return Inertia::render('dashboard/maintenance/index', [
            'facility' => $facility,
            'tasks' => $tasks,
            'members' => $members,
            'assets' => $assets,
            'filters' => [
                'status' => $statusFilter,
                'priority' => $priorityFilter,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        $validated = $request->validate([
            'asset_id' => 'required|exists:assets,id',
            'title' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high,critical',
            'assignee_id' => 'nullable|exists:users,id',
            'due_at' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        $asset = Asset::findOrFail($validated['asset_id']);
        if ($asset->facility?->organization_id !== $org->id) {
            abort(403, 'Aset tidak berada dalam organisasi Anda.');
        }

        $task = MaintenanceTask::create([
            'organization_id' => $org->id,
            'asset_id' => $asset->id,
            'assessment_id' => $asset->latestRiskAssessment?->id,
            'title' => $validated['title'],
            'priority' => $validated['priority'],
            'assignee_id' => $validated['assignee_id'] ?? null,
            'due_at' => $validated['due_at'] ?? null,
            'status' => 'open',
            'notes' => $validated['notes'] ?? null,
        ]);

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'task_created',
            'MaintenanceTask',
            $task->id,
            null,
            ['title' => $task->title, 'priority' => $task->priority, 'asset' => $asset->code]
        );

        return back()->with('success', "Tugas '{$task->title}' berhasil dibuat.");
    }

    public function update(Request $request, MaintenanceTask $task): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($task->organization_id !== $org->id) {
            abort(403, 'Akses tugas ditolak.');
        }

        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,done,cancelled',
            'notes' => 'nullable|string|max:1000',
            'assignee_id' => 'nullable|exists:users,id',
        ]);

        $before = ['status' => $task->status, 'notes' => $task->notes];

        $task->update([
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? $task->notes,
            'assignee_id' => $validated['assignee_id'] ?? $task->assignee_id,
        ]);

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'task_updated',
            'MaintenanceTask',
            $task->id,
            $before,
            ['status' => $task->status, 'notes' => $task->notes]
        );

        return back()->with('success', 'Status tugas berhasil diperbarui.');
    }
}