<?php

namespace App\Services\Emissions;

use App\Models\Asset;
use App\Models\EmissionCalculation;
use App\Models\MethodVersion;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use InvalidArgumentException;

class EmissionCalculator
{
    /**
     * Calculate methane mass emission for an asset over a given period.
     */
    public function calculateForAsset(
        Asset $asset,
        CarbonInterface $periodStart,
        CarbonInterface $periodEnd,
        ?float $gwpFactor = null
    ): EmissionCalculation {
        $pStart = Carbon::instance($periodStart);
        $pEnd = Carbon::instance($periodEnd);

        if ($pEnd->lte($pStart)) {
            throw new InvalidArgumentException('Period end must be strictly after period start.');
        }

        $totalPeriodHours = $pEnd->diffInMinutes($pStart) / 60.0;
        if ($totalPeriodHours <= 0) {
            $totalPeriodHours = 0.0001;
        }

        $orgId = $asset->facility?->organization_id;
        $methodVersion = MethodVersion::where('organization_id', $orgId)
            ->where('kind', 'emission_quantification')
            ->latest('id')
            ->first();

        // Query observations with methane_mass_rate and quality = valid
        $observations = $asset->observations()
            ->where('parameter', 'methane_mass_rate')
            ->where('unit', 'kg/h')
            ->where('quality', 'valid')
            ->whereNotNull('interval_end')
            ->where('observed_at', '<', $pEnd)
            ->where('interval_end', '>', $pStart)
            ->orderBy('observed_at')
            ->get();

        if ($observations->isEmpty()) {
            return EmissionCalculation::create([
                'asset_id' => $asset->id,
                'method_version_id' => $methodVersion?->id,
                'period_start' => $pStart,
                'period_end' => $pEnd,
                'methane_mass_kg' => null,
                'co2e_kg' => null,
                'coverage_ratio' => 0.00,
                'uncertainty' => 'Belum dievaluasi',
                'input_refs_json' => ['observation_ids' => []],
                'exclusions' => 'Tidak ada observasi laju massa metana kg/h yang valid dalam periode ini.',
            ]);
        }

        $totalMassKg = 0.0;
        $coveredHours = 0.0;
        $usedObsIds = [];
        $lastEnd = null;
        $exclusions = [];

        foreach ($observations as $obs) {
            $obsStart = Carbon::instance($obs->observed_at);
            $obsEnd = Carbon::instance($obs->interval_end);

            // Validate non-negative interval
            if ($obsEnd->lte($obsStart)) {
                $exclusions[] = "Observasi #{$obs->id} dilewati karena interval_end <= observed_at.";
                continue;
            }

            // Check overlap with prior interval
            if ($lastEnd !== null && $obsStart->lt($lastEnd)) {
                $exclusions[] = "Observasi #{$obs->id} dilewati karena tumpang-tindih waktu.";
                continue;
            }

            // Clip to [periodStart, periodEnd)
            $effectiveStart = $obsStart->max($pStart);
            $effectiveEnd = $obsEnd->min($pEnd);

            if ($effectiveEnd->lte($effectiveStart)) {
                continue;
            }

            $intervalHours = abs($effectiveEnd->diffInMinutes($effectiveStart)) / 60.0;
            $rate = (float) $obs->value;
            $mass = $rate * $intervalHours;

            $totalMassKg += $mass;
            $coveredHours += $intervalHours;
            $usedObsIds[] = $obs->id;
            $lastEnd = $obsEnd;
        }

        $coverageRatio = round(min(1.0, $coveredHours / $totalPeriodHours), 2);
        $co2e = $gwpFactor !== null && $totalMassKg > 0 ? round($totalMassKg * $gwpFactor, 4) : null;

        return EmissionCalculation::create([
            'asset_id' => $asset->id,
            'method_version_id' => $methodVersion?->id,
            'period_start' => $pStart,
            'period_end' => $pEnd,
            'methane_mass_kg' => round($totalMassKg, 4),
            'co2e_kg' => $co2e,
            'coverage_ratio' => $coverageRatio,
            'uncertainty' => 'Tingkat ketidakpastian baku +/- 15% berdasarkan spesifikasi instrumen aliran',
            'input_refs_json' => [
                'observation_ids' => $usedObsIds,
                'gwp_factor' => $gwpFactor,
                'covered_hours' => round($coveredHours, 2),
                'total_period_hours' => round($totalPeriodHours, 2),
            ],
            'exclusions' => count($exclusions) > 0 ? implode('; ', $exclusions) : null,
        ]);
    }
}
