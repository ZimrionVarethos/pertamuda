<?php

namespace Tests\Unit;

use App\Models\Asset;
use App\Models\Facility;
use App\Models\Observation;
use App\Models\Organization;
use App\Services\Emissions\EmissionCalculator;
use App\Services\Risk\DemoRiskProvider;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NasirDomainFormulasTest extends TestCase
{
    use RefreshDatabase;

    public function test_fixture_formula_produces_score_69_and_tier_tinggi(): void
    {
        $org = Organization::create(['name' => 'Demo Org', 'is_demo' => true]);
        $facility = Facility::create(['organization_id' => $org->id, 'code' => 'FAC-01', 'name' => 'Facility 01']);
        $asset = Asset::create([
            'facility_id' => $facility->id,
            'code' => 'AST-01',
            'name' => 'Test Pipe',
            'type' => 'pipeline',
            'demo_baseline_pressure_bar' => 10.0,
        ]);

        $evalTime = Carbon::parse('2026-09-07 10:00:00');

        // wall_loss: 30% -> (30 / 50) * 100 = 60
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'wall_loss',
            'value' => 30.0,
            'unit' => 'percent',
            'observed_at' => $evalTime->copy()->subMinutes(10),
            'quality' => 'valid',
        ]);

        // pressure: 8.6 bar (baseline 10 bar) -> (abs(8.6 - 10) / 10 / 0.20) * 100 = 70
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'pressure',
            'value' => 8.6,
            'unit' => 'bar',
            'observed_at' => $evalTime->copy()->subMinutes(5),
            'quality' => 'valid',
        ]);

        // methane_concentration: 80 ppm -> (80 / 100) * 100 = 80
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'methane_concentration',
            'value' => 80.0,
            'unit' => 'ppm',
            'observed_at' => $evalTime->copy()->subMinutes(2),
            'quality' => 'valid',
        ]);

        $provider = new DemoRiskProvider();
        $assessment = $provider->evaluate($asset, $evalTime);

        // 0.35 * 60 + 0.40 * 70 + 0.25 * 80 = 21 + 28 + 20 = 69
        $this->assertEquals(60.0, (float) $assessment->corrosion_score);
        $this->assertEquals(70.0, (float) $assessment->leak_score);
        $this->assertEquals(80.0, (float) $assessment->emission_signal_score);
        $this->assertEquals(69.0, (float) $assessment->composite_score);
        $this->assertEquals('Tinggi', $assessment->tier);
    }

    public function test_missing_or_stale_inputs_produce_null_composite_score(): void
    {
        $org = Organization::create(['name' => 'Demo Org 2', 'is_demo' => true]);
        $facility = Facility::create(['organization_id' => $org->id, 'code' => 'FAC-02', 'name' => 'Facility 02']);
        $asset = Asset::create([
            'facility_id' => $facility->id,
            'code' => 'AST-02',
            'name' => 'Test Incomplete Asset',
            'type' => 'separator',
            'demo_baseline_pressure_bar' => 10.0,
        ]);

        $evalTime = Carbon::parse('2026-09-07 10:00:00');

        // Only wall_loss provided, pressure and methane missing
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'wall_loss',
            'value' => 20.0,
            'unit' => 'percent',
            'observed_at' => $evalTime->copy()->subMinutes(10),
            'quality' => 'valid',
        ]);

        $provider = new DemoRiskProvider();
        $assessment = $provider->evaluate($asset, $evalTime);

        $this->assertNull($assessment->composite_score);
        $this->assertEquals('Data belum cukup', $assessment->tier);
        $this->assertEquals(40.0, (float) $assessment->corrosion_score);
        $this->assertNull($assessment->leak_score);
        $this->assertNull($assessment->emission_signal_score);
    }

    public function test_emission_interval_calculation_fixture(): void
    {
        $org = Organization::create(['name' => 'Emission Org', 'is_demo' => true]);
        $facility = Facility::create(['organization_id' => $org->id, 'code' => 'FAC-EM', 'name' => 'Emission Facility']);
        $asset = Asset::create([
            'facility_id' => $facility->id,
            'code' => 'AST-EM',
            'name' => 'Emission Test Asset',
            'type' => 'compressor',
        ]);

        $periodStart = Carbon::parse('2026-09-07 08:00:00');
        $periodEnd = Carbon::parse('2026-09-07 12:00:00');

        // 1. 2 kg/h for 30 minutes (08:00 - 08:30) = 1.0 kg CH4
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'methane_mass_rate',
            'value' => 2.0,
            'unit' => 'kg/h',
            'observed_at' => Carbon::parse('2026-09-07 08:00:00'),
            'interval_end' => Carbon::parse('2026-09-07 08:30:00'),
            'quality' => 'valid',
        ]);

        // 2. 4 kg/h for 15 minutes (08:30 - 08:45) = 1.0 kg CH4
        Observation::create([
            'asset_id' => $asset->id,
            'parameter' => 'methane_mass_rate',
            'value' => 4.0,
            'unit' => 'kg/h',
            'observed_at' => Carbon::parse('2026-09-07 08:30:00'),
            'interval_end' => Carbon::parse('2026-09-07 08:45:00'),
            'quality' => 'valid',
        ]);

        $calculator = new EmissionCalculator();
        $calc = $calculator->calculateForAsset($asset, $periodStart, $periodEnd);

        // Total = 1.0 + 1.0 = 2.0 kg CH4
        $this->assertEquals(2.0, (float) $calc->methane_mass_kg);
    }
}
