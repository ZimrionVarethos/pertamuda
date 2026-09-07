<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Facility;
use App\Models\MaintenanceTask;
use App\Models\Observation;
use App\Services\Audit\AuditLogger;
use App\Services\Risk\DemoRiskProvider;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssetController extends Controller
{
    public function __construct(
        protected DemoRiskProvider $riskProvider,
        protected AuditLogger $auditLogger
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $search = $request->input('search');
        $tierFilter = $request->input('tier');
        $typeFilter = $request->input('type');

        $query = Asset::where('facility_id', $facility->id)
            ->with(['latestRiskAssessment']);

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        if (! empty($typeFilter)) {
            $query->where('type', $typeFilter);
        }

        $assets = $query->get()->map(function ($a) {
            $latest = $a->latestRiskAssessment;
            return [
                'id' => $a->id,
                'code' => $a->code,
                'name' => $a->name,
                'type' => $a->type,
                'demo_baseline_pressure_bar' => $a->demo_baseline_pressure_bar,
                'composite_score' => $latest?->composite_score,
                'corrosion_score' => $latest?->corrosion_score,
                'leak_score' => $latest?->leak_score,
                'emission_signal_score' => $latest?->emission_signal_score,
                'tier' => $latest?->tier ?? 'Data belum cukup',
                'evaluated_at' => $latest?->evaluated_at?->format('d M Y H:i'),
            ];
        });

        if (! empty($tierFilter)) {
            $assets = $assets->where('tier', $tierFilter)->values();
        }

        return Inertia::render('dashboard/assets/index', [
            'facility' => $facility,
            'assets' => $assets,
            'filters' => [
                'search' => $search,
                'tier' => $tierFilter,
                'type' => $typeFilter,
            ],
            'assetTypes' => Asset::where('facility_id', $facility->id)->distinct()->pluck('type'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if (! $user->hasRole(['owner', 'analyst'])) {
            abort(403, 'Hanya peran Owner dan Analis yang dapat menambahkan aset.');
        }

        $facility = Facility::where('organization_id', $org->id)->firstOrFail();

        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:assets,code,NULL,id,facility_id,' . $facility->id,
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'demo_baseline_pressure_bar' => 'nullable|numeric|min:0.1',
        ]);

        $asset = Asset::create([
            'facility_id' => $facility->id,
            'code' => strtoupper($validated['code']),
            'name' => $validated['name'],
            'type' => $validated['type'],
            'demo_baseline_pressure_bar' => $validated['demo_baseline_pressure_bar'] ?? null,
            'metadata' => [
                'material' => 'Carbon Steel A106',
                'added_manually' => true,
            ],
        ]);

        $this->riskProvider->evaluate($asset);

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'asset_created',
            'Asset',
            $asset->id,
            null,
            ['code' => $asset->code, 'name' => $asset->name]
        );

        return back()->with('success', "Aset {$asset->code} berhasil ditambahkan.");
    }

    public function show(Request $request, Asset $asset): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($asset->facility?->organization_id !== $org->id) {
            abort(403, 'Aset ini bukan bagian dari organisasi Anda.');
        }

        $latestAssessment = $asset->latestRiskAssessment;

        // 7 days sensor history
        $since = Carbon::now()->subDays(7);
        $observations = $asset->observations()
            ->where('observed_at', '>=', $since)
            ->orderBy('observed_at')
            ->get();

        $pressureHistory = [];
        $methaneHistory = [];
        $wallLossHistory = [];

        foreach ($observations as $obs) {
            $timeStr = $obs->observed_at->format('d M H:i');
            if ($obs->parameter === 'pressure') {
                $pressureHistory[] = ['time' => $timeStr, 'value' => (float) $obs->value, 'baseline' => (float) $asset->demo_baseline_pressure_bar];
            } elseif ($obs->parameter === 'methane_concentration') {
                $methaneHistory[] = ['time' => $timeStr, 'value' => (float) $obs->value];
            } elseif ($obs->parameter === 'wall_loss') {
                $wallLossHistory[] = ['time' => $timeStr, 'value' => (float) $obs->value];
            }
        }

        // Active maintenance tasks
        $tasks = $asset->maintenanceTasks()->with('assignee')->latest('id')->get()->map(fn ($t) => [
            'id' => $t->id,
            'title' => $t->title,
            'status' => $t->status,
            'priority' => $t->priority,
            'due_at' => $t->due_at?->toDateString(),
            'assignee_name' => $t->assignee?->name ?? 'Belum ditugaskan',
            'notes' => $t->notes,
        ]);

        return Inertia::render('dashboard/assets/show', [
            'asset' => [
                'id' => $asset->id,
                'code' => $asset->code,
                'name' => $asset->name,
                'type' => $asset->type,
                'demo_baseline_pressure_bar' => $asset->demo_baseline_pressure_bar,
                'metadata' => $asset->metadata,
            ],
            'facility' => $asset->facility,
            'assessment' => $latestAssessment ? [
                'composite_score' => $latestAssessment->composite_score,
                'corrosion_score' => $latestAssessment->corrosion_score,
                'leak_score' => $latestAssessment->leak_score,
                'emission_signal_score' => $latestAssessment->emission_signal_score,
                'tier' => $latestAssessment->tier,
                'explanation' => $latestAssessment->explanation,
                'evaluated_at' => $latestAssessment->evaluated_at->format('d M Y H:i:s'),
                'input_refs' => $latestAssessment->input_refs_json,
            ] : null,
            'sensorHistory' => [
                'pressure' => $pressureHistory,
                'methane' => $methaneHistory,
                'wallLoss' => $wallLossHistory,
            ],
            'tasks' => $tasks,
            'recentObservations' => $observations->take(20)->map(fn ($o) => [
                'id' => $o->id,
                'parameter' => $o->parameter,
                'value' => (float) $o->value,
                'unit' => $o->unit,
                'observed_at' => $o->observed_at->format('d M Y H:i'),
                'quality' => $o->quality,
                'source_ref' => $o->source_ref,
            ]),
        ]);
    }
}