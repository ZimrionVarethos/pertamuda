<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\DataSource;
use App\Models\Facility;
use App\Models\MaintenanceTask;
use App\Models\MethodVersion;
use App\Models\Observation;
use App\Models\Organization;
use App\Models\Report;
use App\Models\ReportVersion;
use App\Models\User;
use App\Services\Emissions\EmissionCalculator;
use App\Services\Reporting\ReportBuilder;
use App\Services\Risk\DemoRiskProvider;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class NasirDemoSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::parse('2026-09-07 10:00:00');

        // 1. Organizations
        $demoOrg = Organization::create([
            'name' => 'Fasilitas Demo Migas',
            'is_demo' => true,
            'timezone' => 'Asia/Jakarta',
        ]);

        $alphaOrg = Organization::create([
            'name' => 'Organisasi Alpha (Terisolasi)',
            'is_demo' => false,
            'timezone' => 'Asia/Jakarta',
        ]);

        // 2. Users and Roles
        $owner = User::firstOrCreate(['email' => 'owner@nasir.test'], [
            'name' => 'Budi Santoso (Owner)',
            'password' => Hash::make('password'),
        ]);
        $analyst = User::firstOrCreate(['email' => 'analyst@nasir.test'], [
            'name' => 'Rafi Alaudin (Analyst)',
            'password' => Hash::make('password'),
        ]);
        $tech = User::firstOrCreate(['email' => 'tech@nasir.test'], [
            'name' => 'Daffa Bisma (Technician)',
            'password' => Hash::make('password'),
        ]);
        $reviewer = User::firstOrCreate(['email' => 'reviewer@nasir.test'], [
            'name' => 'Nafil Athallah (Reviewer)',
            'password' => Hash::make('password'),
        ]);

        // Attach users to Demo Org
        $demoOrg->users()->syncWithoutDetaching([
            $owner->id => ['role' => 'owner'],
            $analyst->id => ['role' => 'analyst'],
            $tech->id => ['role' => 'technician'],
            $reviewer->id => ['role' => 'reviewer'],
        ]);

        // Attach owner to Alpha Org as owner
        $alphaOrg->users()->syncWithoutDetaching([
            $owner->id => ['role' => 'owner'],
        ]);

        // 3. Method Versions
        $riskMethod = MethodVersion::create([
            'organization_id' => $demoOrg->id,
            'kind' => 'risk_triase',
            'version' => 'v1.0-demo',
            'config_json' => [
                'name' => 'Triase Risiko Berbasis Aturan Demonstrasi',
                'weights' => ['corrosion' => 0.35, 'leak' => 0.40, 'emission_signal' => 0.25],
                'window_hours' => 24,
                'formula_notes' => 'clamp100(wall_loss/50*100), clamp100(abs(P-P0)/P0/0.20*100), clamp100(CH4_ppm/100*100)',
            ],
            'provenance' => 'Handbook Opsi C Risk Score Sintetis',
            'created_by' => $owner->id,
        ]);

        $emissionMethod = MethodVersion::create([
            'organization_id' => $demoOrg->id,
            'kind' => 'emission_quantification',
            'version' => 'v1.0-demo',
            'config_json' => [
                'name' => 'Integrasi Interval Laju Massa Metana',
                'formula' => 'sum(methane_rate_kg_h * interval_hours)',
                'default_gwp' => null,
            ],
            'provenance' => 'Pedoman Kuantifikasi Emisi Fugitif Protokol GHG',
            'created_by' => $owner->id,
        ]);

        // 4. Facility
        $facility = Facility::create([
            'organization_id' => $demoOrg->id,
            'code' => 'FAC-01',
            'name' => 'Fasilitas Demo 01',
            'sector' => 'oil_and_gas',
        ]);

        $alphaFacility = Facility::create([
            'organization_id' => $alphaOrg->id,
            'code' => 'FAC-ALPHA',
            'name' => 'Fasilitas Alpha Blok 9',
            'sector' => 'oil_and_gas',
        ]);

        Asset::create([
            'facility_id' => $alphaFacility->id,
            'code' => 'A01',
            'name' => 'Alpha Test Pipe',
            'type' => 'pipeline',
            'demo_baseline_pressure_bar' => 15.0,
        ]);

        // 5. Data Sources
        $csvSource = DataSource::create([
            'organization_id' => $demoOrg->id,
            'facility_id' => $facility->id,
            'type' => 'csv_manual',
            'label' => 'Impor Manual CSV Observasi',
            'mode' => 'manual',
            'last_import_at' => $now->copy()->subHours(2),
        ]);

        // 6. 12 Assets in Demo Facility
        $assetsData = [
            ['code' => 'W01', 'name' => 'Wellhead A-1', 'type' => 'wellhead', 'baseline' => 12.0, 'wall_loss' => 10.0, 'pressure' => 11.8, 'methane' => 15.0, 'rate' => 0.5],
            ['code' => 'S10', 'name' => '3-Phase Separator V-101', 'type' => 'separator', 'baseline' => 10.0, 'wall_loss' => 30.0, 'pressure' => 8.6, 'methane' => 80.0, 'rate' => 2.0], // Fixture 69 Tinggi
            ['code' => 'C20', 'name' => 'Gas Compressor K-201', 'type' => 'compressor', 'baseline' => 45.0, 'wall_loss' => 42.0, 'pressure' => 32.0, 'methane' => 95.0, 'rate' => 4.5], // Kritis
            ['code' => 'T01', 'name' => 'Gas Trunkline TL-01', 'type' => 'pipeline', 'baseline' => 30.0, 'wall_loss' => 18.0, 'pressure' => 28.2, 'methane' => 35.0, 'rate' => 1.2], // Sedang
            ['code' => 'S12', 'name' => 'Inlet Gas Scrubber S-102', 'type' => 'vessel', 'baseline' => 14.0, 'wall_loss' => 6.0, 'pressure' => 13.9, 'methane' => 10.0, 'rate' => 0.3], // Rendah
            ['code' => 'F30', 'name' => 'Flaring Knockout Drum FK-301', 'type' => 'vessel', 'baseline' => 4.5, 'wall_loss' => 22.0, 'pressure' => 4.1, 'methane' => 45.0, 'rate' => 1.8], // Sedang
            ['code' => 'T40', 'name' => 'Condensate Storage Tank T-401', 'type' => 'tank', 'baseline' => 1.5, 'wall_loss' => 8.0, 'pressure' => 1.48, 'methane' => 12.0, 'rate' => 0.2], // Rendah
            ['code' => 'M10', 'name' => 'Production Manifold M-101', 'type' => 'manifold', 'baseline' => 18.0, 'wall_loss' => 32.0, 'pressure' => 15.5, 'methane' => 65.0, 'rate' => 2.8], // Tinggi
            ['code' => 'H20', 'name' => 'Gas Cooler Exchanger E-202', 'type' => 'heat_exchanger', 'baseline' => 22.0, 'wall_loss' => 5.0, 'pressure' => 21.8, 'methane' => 8.0, 'rate' => 0.1], // Rendah
            ['code' => 'V04', 'name' => 'Emergency Valve Station VS-04', 'type' => 'valve', 'baseline' => 28.0, 'wall_loss' => 45.0, 'pressure' => 19.5, 'methane' => 90.0, 'rate' => 3.6], // Kritis
            ['code' => 'P10', 'name' => 'Condensate Transfer Pump P-105', 'type' => 'pump', 'baseline' => 8.0, 'wall_loss' => null, 'pressure' => 7.8, 'methane' => 20.0, 'rate' => 0.4], // Incomplete
            ['code' => 'M01', 'name' => 'Fiscal Metering Station MS-01', 'type' => 'metering', 'baseline' => 35.0, 'wall_loss' => 4.0, 'pressure' => 34.8, 'methane' => 6.0, 'rate' => 0.1], // Rendah
        ];

        $riskProvider = new DemoRiskProvider();
        $emissionCalculator = new EmissionCalculator();
        $createdAssets = [];

        foreach ($assetsData as $data) {
            $asset = Asset::create([
                'facility_id' => $facility->id,
                'code' => $data['code'],
                'name' => $data['name'],
                'type' => $data['type'],
                'demo_baseline_pressure_bar' => $data['baseline'],
                'metadata' => [
                    'material' => 'Carbon Steel A106 Grade B',
                    'nominal_size' => '8 inch SCH 40',
                    'installation_year' => 2020,
                    'last_inspection_type' => 'Ultrasonic Thickness Testing',
                ],
            ]);
            $createdAssets[$data['code']] = $asset;

            // Generate observations across 7 days
            for ($day = 6; $day >= 0; $day--) {
                $obsDate = $now->copy()->subDays($day)->setHour(8)->setMinute(0);

                // Wall loss observation
                if ($data['wall_loss'] !== null) {
                    $noise = ($day % 2 === 0 ? 0.2 : -0.2);
                    Observation::create([
                        'asset_id' => $asset->id,
                        'parameter' => 'wall_loss',
                        'value' => max(0, $data['wall_loss'] + $noise),
                        'unit' => 'percent',
                        'observed_at' => $obsDate->copy()->addMinutes(10),
                        'quality' => 'valid',
                        'source_ref' => 'UT-LOG-SYNTH-2026',
                    ]);
                }

                // Pressure observation
                Observation::create([
                    'asset_id' => $asset->id,
                    'parameter' => 'pressure',
                    'value' => $data['pressure'],
                    'unit' => 'bar',
                    'observed_at' => $obsDate->copy()->addMinutes(20),
                    'quality' => 'valid',
                    'source_ref' => 'SCADA-P-TAG-01',
                ]);

                // Methane concentration
                Observation::create([
                    'asset_id' => $asset->id,
                    'parameter' => 'methane_concentration',
                    'value' => $data['methane'],
                    'unit' => 'ppm',
                    'observed_at' => $obsDate->copy()->addMinutes(30),
                    'quality' => 'valid',
                    'source_ref' => 'OGI-SNIFFER-SYNTH',
                ]);

                // H2S concentration
                Observation::create([
                    'asset_id' => $asset->id,
                    'parameter' => 'h2s_concentration',
                    'value' => 2.5,
                    'unit' => 'ppm',
                    'observed_at' => $obsDate->copy()->addMinutes(35),
                    'quality' => 'valid',
                    'source_ref' => 'TOX-GAS-LOG',
                ]);

                // Methane mass rate (with interval)
                Observation::create([
                    'asset_id' => $asset->id,
                    'parameter' => 'methane_mass_rate',
                    'value' => $data['rate'],
                    'unit' => 'kg/h',
                    'observed_at' => $obsDate->copy()->addMinutes(40),
                    'interval_end' => $obsDate->copy()->addMinutes(100), // 1 hour interval
                    'quality' => 'valid',
                    'source_ref' => 'HI-FLOW-SAMPLER',
                ]);
            }

            // Run initial risk assessment
            $riskProvider->evaluate($asset, $now);
            // Run initial emission calculation for 7 days
            $emissionCalculator->calculateForAsset($asset, $now->copy()->subDays(7), $now);
        }

        // 7. Maintenance Tasks
        MaintenanceTask::create([
            'organization_id' => $demoOrg->id,
            'asset_id' => $createdAssets['C20']->id,
            'title' => 'Pemeriksaan Integritas Seal Gas Kompresor C20',
            'assignee_id' => $tech->id,
            'priority' => 'critical',
            'due_at' => $now->copy()->addDays(2)->toDateString(),
            'status' => 'open',
            'notes' => 'Sinyal konsentrasi metana 95 ppm terdeteksi di sekitar kompresor. Jadwalkan inspeksi OGI mendesak.',
        ]);

        MaintenanceTask::create([
            'organization_id' => $demoOrg->id,
            'asset_id' => $createdAssets['V04']->id,
            'title' => 'Uji Flange dan Penggantian Gasket Katup V04',
            'assignee_id' => $tech->id,
            'priority' => 'high',
            'due_at' => $now->copy()->addDays(4)->toDateString(),
            'status' => 'in_progress',
            'notes' => 'Tingkat wall loss 45 persen dan tekanan drop terindikasi.',
        ]);

        MaintenanceTask::create([
            'organization_id' => $demoOrg->id,
            'asset_id' => $createdAssets['S10']->id,
            'title' => 'Inspeksi Berkala Korosi Separator S10',
            'assignee_id' => $tech->id,
            'priority' => 'high',
            'due_at' => $now->copy()->subDays(1)->toDateString(),
            'status' => 'done',
            'notes' => 'Pemeriksaan ketebalan ultrasonik telah diselesaikan oleh tim inspeksi lapangan.',
        ]);

        // 8. Reports
        $reportBuilder = new ReportBuilder($emissionCalculator, app(\App\Services\Audit\AuditLogger::class));
        $periodStart = $now->copy()->subDays(7);
        $periodEnd = $now;

        $reportBuilder->createDraft($facility, 'dram', $periodStart, $periodEnd, $analyst->id);

        $lcamReport = $reportBuilder->createDraft($facility, 'lcam', $periodStart, $periodEnd, $analyst->id);
        $lcamReport->update(['status' => 'in_review']);

        // Update version 1 with notes
        $v1 = $lcamReport->latestVersion;
        if ($v1) {
            $v1->update([
                'reviewer_notes' => 'Data observasi primer laju massa metana telah dicocokkan dengan catatan log kalibrasi. Draf disetujui untuk langkah review berikutnya.',
                'reviewed_by' => $reviewer->id,
                'reviewed_at' => $now->copy()->subHours(5),
            ]);
        }
    }
}