<?php

namespace App\Services\Reporting;

use App\Models\EmissionCalculation;
use App\Models\Facility;
use App\Models\Report;
use App\Models\ReportVersion;
use App\Models\RiskAssessment;
use App\Services\Audit\AuditLogger;
use App\Services\Emissions\EmissionCalculator;
use Carbon\Carbon;
use Carbon\CarbonInterface;

class ReportBuilder
{
    public function __construct(
        protected EmissionCalculator $emissionCalculator,
        protected AuditLogger $auditLogger
    ) {}

    /**
     * Build an initial draft report with snapshot calculations and checklist.
     */
    public function createDraft(
        Facility $facility,
        string $type,
        CarbonInterface $periodStart,
        CarbonInterface $periodEnd,
        ?int $authorId = null
    ): Report {
        $pStart = Carbon::instance($periodStart);
        $pEnd = Carbon::instance($periodEnd);

        $report = Report::create([
            'organization_id' => $facility->organization_id,
            'facility_id' => $facility->id,
            'type' => $type,
            'period_start' => $pStart,
            'period_end' => $pEnd,
            'status' => 'draft',
            'current_version' => 1,
            'author_id' => $authorId,
        ]);

        // Aggregate emission calculations across facility assets
        $assets = $facility->assets()->get();
        $calcSummaries = [];
        $totalMethaneMassKg = 0.0;
        $totalObservationsCount = 0;

        foreach ($assets as $asset) {
            $calc = $this->emissionCalculator->calculateForAsset($asset, $pStart, $pEnd);
            if ($calc->methane_mass_kg !== null) {
                $totalMethaneMassKg += (float) $calc->methane_mass_kg;
            }
            $obsCount = $asset->observations()
                ->whereBetween('observed_at', [$pStart, $pEnd])
                ->count();
            $totalObservationsCount += $obsCount;

            $calcSummaries[] = [
                'asset_id' => $asset->id,
                'asset_code' => $asset->code,
                'asset_name' => $asset->name,
                'methane_mass_kg' => $calc->methane_mass_kg,
                'co2e_kg' => $calc->co2e_kg,
                'coverage_ratio' => $calc->coverage_ratio,
                'uncertainty' => $calc->uncertainty,
                'exclusions' => $calc->exclusions,
            ];
        }

        $defaultContent = [
            'section_1_facility' => [
                'title' => 'Identitas Fasilitas dan Cakupan Operasional',
                'facility_code' => $facility->code,
                'facility_name' => $facility->name,
                'sector' => 'Minyak dan Gas Bumi',
                'organization_name' => $facility->organization?->name,
                'scope_summary' => 'Pemantauan emisi fugitif metana dan evaluasi integritas aset perpipaan fasilitas migas.',
            ],
            'section_2_period' => [
                'title' => 'Periode Pemantauan dan Asal Sumber Data',
                'period_start' => $pStart->toDateString(),
                'period_end' => $pEnd->toDateString(),
                'total_observations' => $totalObservationsCount,
                'data_source_mode' => 'Data observasi primer hasil pengukuran lapangan berlabel sintetis.',
            ],
            'section_3_method' => [
                'title' => 'Metode Kuantifikasi, Satuan, dan Asumsi',
                'quantification_method' => 'Integrasi laju massa interval waktu [start, end) laju alir kg/h.',
                'units' => 'kg CH4 (Metana); CO2e dihitung jika faktor konversi GWP disetujui.',
                'assumptions' => 'Laju alir diasumsikan konstan dalam interval waktu yang tercatat secara eksplisit.',
                'uncertainty_statement' => 'Tingkat ketidakpastian baku dievaluasi berdasarkan instrumen ukur terkalibrasi.',
            ],
            'section_4_results' => [
                'title' => 'Hasil Kuantifikasi dan Ringkasan Emisi',
                'total_methane_mass_kg' => round($totalMethaneMassKg, 4),
                'co2e_status' => 'Faktor konversi belum ditetapkan untuk penyesuaian GWP resmi.',
                'summary_text' => "Total emisi metana yang terhitung dalam periode adalah " . round($totalMethaneMassKg, 2) . " kg CH4.",
            ],
            'section_5_evidence' => [
                'title' => 'Referensi Observasi dan Bukti Sumber',
                'notes' => 'Seluruh angka kuantifikasi tertaut langsung ke nomor identitas observasi dan catatan impor terkait.',
            ],
            'section_6_review' => [
                'title' => 'Catatan Penelaah Internal dan Riwayat Versi',
                'initial_note' => 'Draf dokumen disiapkan secara otomatis oleh sistem NASIR untuk penelaahan internal tim.',
            ],
        ];

        // Completeness evaluation
        $completeness = $this->calculateCompleteness($defaultContent);

        ReportVersion::create([
            'report_id' => $report->id,
            'version' => 1,
            'content_json' => $defaultContent,
            'calculations_json' => $calcSummaries,
            'evidence_refs_json' => ['total_observations' => $totalObservationsCount],
            'completeness_pct' => $completeness,
            'reviewer_notes' => null,
            'reviewed_by' => null,
            'reviewed_at' => null,
        ]);

        $this->auditLogger->log(
            $facility->organization_id,
            $authorId,
            'report_created',
            'Report',
            $report->id,
            null,
            ['type' => $type, 'version' => 1]
        );

        return $report;
    }

    public function calculateCompleteness(array $content): int
    {
        $checks = [
            ! empty($content['section_1_facility']['facility_name'] ?? null),
            ! empty($content['section_2_period']['period_start'] ?? null),
            ! empty($content['section_3_method']['quantification_method'] ?? null),
            isset($content['section_4_results']['total_methane_mass_kg']),
            ! empty($content['section_5_evidence']['notes'] ?? null),
        ];

        $passed = count(array_filter($checks));
        return (int) round(($passed / count($checks)) * 100);
    }
}
