<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Report;
use App\Models\ReportVersion;
use App\Services\Audit\AuditLogger;
use App\Services\Reporting\ReportBuilder;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function __construct(
        protected ReportBuilder $reportBuilder,
        protected AuditLogger $auditLogger
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $typeFilter = $request->input('type');
        $statusFilter = $request->input('status');

        $query = Report::where('organization_id', $org->id)
            ->with(['author', 'latestVersion']);

        if (! empty($typeFilter)) {
            $query->where('type', $typeFilter);
        }
        if (! empty($statusFilter)) {
            $query->where('status', $statusFilter);
        }

        $reports = $query->latest('id')->get()->map(fn ($r) => [
            'id' => $r->id,
            'type' => strtoupper($r->type),
            'raw_type' => $r->type,
            'period_start' => $r->period_start->format('d M Y'),
            'period_end' => $r->period_end->format('d M Y'),
            'status' => $r->status,
            'current_version' => $r->current_version,
            'author_name' => $r->author?->name ?? 'Sistem',
            'completeness_pct' => $r->latestVersion?->completeness_pct ?? 0,
            'updated_at' => $r->updated_at->format('d M Y H:i'),
        ]);

        return Inertia::render('dashboard/reports/index', [
            'facility' => $facility,
            'reports' => $reports,
            'filters' => [
                'type' => $typeFilter,
                'status' => $statusFilter,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if (! $user->hasRole(['owner', 'analyst'])) {
            abort(403, 'Hanya peran Owner dan Analis yang dapat membuat draf laporan.');
        }

        $facility = Facility::where('organization_id', $org->id)->firstOrFail();

        $validated = $request->validate([
            'type' => 'required|in:dram,lcam',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after:period_start',
        ]);

        $report = $this->reportBuilder->createDraft(
            $facility,
            $validated['type'],
            Carbon::parse($validated['period_start']),
            Carbon::parse($validated['period_end']),
            $user->id
        );

        return redirect()->route('dashboard.reports.show', $report->id)
            ->with('success', 'Draf laporan baru berhasil dibuat.');
    }

    public function show(Request $request, Report $report): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($report->organization_id !== $org->id) {
            abort(403, 'Akses laporan ditolak.');
        }

        $latestVersion = $report->latestVersion;
        $versions = $report->versions()->with('reviewer')->get()->map(fn ($v) => [
            'id' => $v->id,
            'version' => $v->version,
            'completeness_pct' => $v->completeness_pct,
            'reviewer_notes' => $v->reviewer_notes,
            'reviewer_name' => $v->reviewer?->name,
            'reviewed_at' => $v->reviewed_at?->format('d M Y H:i'),
            'created_at' => $v->created_at->format('d M Y H:i'),
        ]);

        return Inertia::render('dashboard/reports/show', [
            'report' => [
                'id' => $report->id,
                'type' => strtoupper($report->type),
                'raw_type' => $report->type,
                'period_start' => $report->period_start->format('d M Y'),
                'period_end' => $report->period_end->format('d M Y'),
                'status' => $report->status,
                'current_version' => $report->current_version,
                'author_id' => $report->author_id,
                'author_name' => $report->author?->name ?? 'Sistem',
                'created_at' => $report->created_at->format('d M Y H:i'),
            ],
            'facility' => $report->facility,
            'latestVersion' => $latestVersion ? [
                'version' => $latestVersion->version,
                'content' => $latestVersion->content_json,
                'calculations' => $latestVersion->calculations_json,
                'evidence' => $latestVersion->evidence_refs_json,
                'completeness_pct' => $latestVersion->completeness_pct,
                'reviewer_notes' => $latestVersion->reviewer_notes,
                'reviewed_by' => $latestVersion->reviewer?->name,
                'reviewed_at' => $latestVersion->reviewed_at?->format('d M Y H:i'),
            ] : null,
            'versions' => $versions,
            'canReview' => $user->can('review', $report),
        ]);
    }

    public function update(Request $request, Report $report): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($report->organization_id !== $org->id) {
            abort(403, 'Akses laporan ditolak.');
        }

        if (! $user->hasRole(['owner', 'analyst'])) {
            abort(403, 'Hanya peran Owner dan Analis yang dapat mengedit draf laporan.');
        }

        $validated = $request->validate([
            'content' => 'required|array',
        ]);

        $latestVersion = $report->latestVersion;
        $completeness = $this->reportBuilder->calculateCompleteness($validated['content']);

        if ($report->status === 'draft') {
            // Update current version in-place
            $latestVersion->update([
                'content_json' => $validated['content'],
                'completeness_pct' => $completeness,
            ]);
        } else {
            // Create a new version snapshot
            $newVerNum = $report->current_version + 1;
            $report->update(['current_version' => $newVerNum, 'status' => 'draft']);

            ReportVersion::create([
                'report_id' => $report->id,
                'version' => $newVerNum,
                'content_json' => $validated['content'],
                'calculations_json' => $latestVersion?->calculations_json,
                'evidence_refs_json' => $latestVersion?->evidence_refs_json,
                'completeness_pct' => $completeness,
            ]);
        }

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'report_updated',
            'Report',
            $report->id,
            null,
            ['version' => $report->current_version]
        );

        return back()->with('success', 'Perubahan draf laporan berhasil disimpan.');
    }

    public function submitReview(Request $request, Report $report): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($report->organization_id !== $org->id) {
            abort(403, 'Akses laporan ditolak.');
        }

        $report->update(['status' => 'in_review']);

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'report_submitted_review',
            'Report',
            $report->id,
            ['status' => 'draft'],
            ['status' => 'in_review']
        );

        return back()->with('success', 'Draf laporan berhasil diajukan untuk penelaahan internal.');
    }

    public function review(Request $request, Report $report): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if (! $user->can('review', $report)) {
            abort(403, 'Anda tidak memiliki wewenang untuk meninjau laporan ini.');
        }

        $validated = $request->validate([
            'decision' => 'required|in:reviewed,revision_requested',
            'notes' => 'required|string|max:2000',
        ]);

        $latestVersion = $report->latestVersion;
        if ($latestVersion) {
            $latestVersion->update([
                'reviewer_notes' => $validated['notes'],
                'reviewed_by' => $user->id,
                'reviewed_at' => Carbon::now(),
            ]);
        }

        $report->update(['status' => $validated['decision']]);

        $this->auditLogger->log(
            $org->id,
            $user->id,
            'report_reviewed',
            'Report',
            $report->id,
            ['status' => 'in_review'],
            ['decision' => $validated['decision'], 'notes' => $validated['notes']]
        );

        $msg = $validated['decision'] === 'reviewed'
            ? 'Laporan berhasil disetujui (Ditinjau internal).'
            : 'Permintaan revisi berhasil dicatat.';

        return back()->with('success', $msg);
    }

    public function print(Request $request, Report $report): HttpResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($report->organization_id !== $org->id) {
            abort(403, 'Akses laporan ditolak.');
        }

        $latestVersion = $report->latestVersion;
        $content = $latestVersion?->content_json ?? [];
        $calculations = $latestVersion?->calculations_json ?? [];

        $html = view('print-report', [
            'report' => $report,
            'version' => $latestVersion,
            'content' => $content,
            'calculations' => $calculations,
        ])->render();

        return response($html);
    }

    public function exportCsv(Request $request, Report $report): StreamedResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($report->organization_id !== $org->id) {
            abort(403, 'Akses laporan ditolak.');
        }

        $latestVersion = $report->latestVersion;
        $calculations = $latestVersion?->calculations_json ?? [];

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"laporan_{$report->type}_v{$report->current_version}.csv\"",
        ];

        return response()->stream(function () use ($calculations) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['asset_code', 'asset_name', 'methane_mass_kg', 'co2e_kg', 'coverage_ratio', 'uncertainty', 'exclusions']);
            foreach ($calculations as $c) {
                fputcsv($file, [
                    $c['asset_code'] ?? '',
                    $c['asset_name'] ?? '',
                    $c['methane_mass_kg'] ?? '',
                    $c['co2e_kg'] ?? '',
                    $c['coverage_ratio'] ?? '',
                    $c['uncertainty'] ?? '',
                    $c['exclusions'] ?? '',
                ]);
            }
            fclose($file);
        }, 200, $headers);
    }
}