<?php

namespace App\Services\Risk;

use App\Contracts\RiskProvider;
use App\Models\Asset;
use App\Models\MethodVersion;
use App\Models\RiskAssessment;
use Carbon\Carbon;
use Carbon\CarbonInterface;

class DemoRiskProvider implements RiskProvider
{
    public const WINDOW_HOURS = 24;

    public function evaluate(Asset $asset, ?CarbonInterface $evaluationTime = null): RiskAssessment
    {
        $evalTime = $evaluationTime ? Carbon::instance($evaluationTime) : Carbon::now();
        $windowStart = (clone $evalTime)->subHours(self::WINDOW_HOURS);

        // Get latest method version for risk triase in asset's org
        $orgId = $asset->facility?->organization_id;
        $methodVersion = MethodVersion::where('organization_id', $orgId)
            ->where('kind', 'risk_triase')
            ->latest('id')
            ->first();

        // 1. Corrosion score from latest valid wall_loss observation
        $wallLossObs = $asset->observations()
            ->where('parameter', 'wall_loss')
            ->where('quality', 'valid')
            ->whereBetween('observed_at', [$windowStart, $evalTime])
            ->latest('observed_at')
            ->first();

        $corrosionScore = null;
        if ($wallLossObs !== null && is_numeric($wallLossObs->value)) {
            $wallLossPct = (float) $wallLossObs->value;
            $corrosionScore = $this->clamp100(($wallLossPct / 50.0) * 100.0);
        }

        // 2. Leak score from pressure and baseline
        $pressureObs = $asset->observations()
            ->where('parameter', 'pressure')
            ->where('quality', 'valid')
            ->whereBetween('observed_at', [$windowStart, $evalTime])
            ->latest('observed_at')
            ->first();

        $leakScore = null;
        $baseline = $asset->demo_baseline_pressure_bar ? (float) $asset->demo_baseline_pressure_bar : null;

        if ($pressureObs !== null && $baseline !== null && $baseline > 0 && is_numeric($pressureObs->value)) {
            $pressureVal = (float) $pressureObs->value;
            $leakScore = $this->clamp100((abs($pressureVal - $baseline) / $baseline / 0.20) * 100.0);
        }

        // 3. Emission signal score from methane_concentration (ppm)
        $methaneObs = $asset->observations()
            ->where('parameter', 'methane_concentration')
            ->where('quality', 'valid')
            ->whereBetween('observed_at', [$windowStart, $evalTime])
            ->latest('observed_at')
            ->first();

        $emissionSignalScore = null;
        if ($methaneObs !== null && is_numeric($methaneObs->value)) {
            $methanePpm = (float) $methaneObs->value;
            $emissionSignalScore = $this->clamp100(($methanePpm / 100.0) * 100.0);
        }

        // Input provenance and reference IDs
        $inputRefs = [
            'evaluation_time' => $evalTime->toISOString(),
            'window_hours' => self::WINDOW_HOURS,
            'wall_loss_obs_id' => $wallLossObs?->id,
            'wall_loss_value' => $wallLossObs?->value,
            'pressure_obs_id' => $pressureObs?->id,
            'pressure_value' => $pressureObs?->value,
            'baseline_pressure' => $baseline,
            'methane_obs_id' => $methaneObs?->id,
            'methane_ppm_value' => $methaneObs?->value,
            'weights' => ['corrosion' => 0.35, 'leak' => 0.40, 'emission_signal' => 0.25],
        ];

        // Composite calculation
        $compositeScore = null;
        $tier = 'Data belum cukup';
        $explanation = '';

        if ($corrosionScore !== null && $leakScore !== null && $emissionSignalScore !== null) {
            $composite = (0.35 * $corrosionScore) + (0.40 * $leakScore) + (0.25 * $emissionSignalScore);
            $tier = $this->determineTier($composite);
            $compositeScore = round($composite, 1);
            $explanation = "Skor komposit {$compositeScore} berbasis aturan demonstrasi (Subskor: Korosi {$corrosionScore}, Kebocoran {$leakScore}, Sinyal Emisi {$emissionSignalScore}).";
        } else {
            $missing = [];
            if ($corrosionScore === null) $missing[] = 'kehilangan dinding pipa (wall loss)';
            if ($leakScore === null) $missing[] = 'tekanan / baseline sah';
            if ($emissionSignalScore === null) $missing[] = 'konsentrasi metana ppm';
            $explanation = 'Input wajib belum lengkap atau berada di luar jendela kesegaran: ' . implode(', ', $missing) . '.';
        }

        return RiskAssessment::create([
            'asset_id' => $asset->id,
            'method_version_id' => $methodVersion?->id,
            'evaluated_at' => $evalTime,
            'corrosion_score' => $corrosionScore !== null ? round($corrosionScore, 1) : null,
            'leak_score' => $leakScore !== null ? round($leakScore, 1) : null,
            'emission_signal_score' => $emissionSignalScore !== null ? round($emissionSignalScore, 1) : null,
            'composite_score' => $compositeScore,
            'tier' => $tier,
            'input_refs_json' => $inputRefs,
            'explanation' => $explanation,
        ]);
    }

    public function clamp100(float $value): float
    {
        return min(100.0, max(0.0, $value));
    }

    public function determineTier(float $score): string
    {
        if ($score >= 75.0) {
            return 'Kritis';
        }
        if ($score >= 50.0) {
            return 'Tinggi';
        }
        if ($score >= 25.0) {
            return 'Sedang';
        }
        return 'Rendah';
    }
}
