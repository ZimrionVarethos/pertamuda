<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\EmissionCalculation;
use App\Models\Facility;
use App\Models\MethodVersion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmissionController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $method = MethodVersion::where('organization_id', $org->id)
            ->where('kind', 'emission_quantification')
            ->latest('id')
            ->first();

        $days = (int) $request->input('days', 7);
        $periodStart = Carbon::now()->subDays($days);
        $periodEnd = Carbon::now();

        $assets = Asset::where('facility_id', $facility->id)->get();
        $assetSummaries = [];
        $totalMethaneKg = 0.0;
        $totalCoveredHours = 0.0;

        foreach ($assets as $asset) {
            $latestCalc = EmissionCalculation::where('asset_id', $asset->id)
                ->latest('period_end')
                ->first();

            if ($latestCalc && $latestCalc->methane_mass_kg !== null) {
                $totalMethaneKg += (float) $latestCalc->methane_mass_kg;
            }

            $assetSummaries[] = [
                'asset_id' => $asset->id,
                'code' => $asset->code,
                'name' => $asset->name,
                'type' => $asset->type,
                'methane_mass_kg' => $latestCalc?->methane_mass_kg,
                'co2e_kg' => $latestCalc?->co2e_kg,
                'coverage_ratio' => $latestCalc?->coverage_ratio ?? 0,
                'uncertainty' => $latestCalc?->uncertainty ?? 'Belum dievaluasi',
                'exclusions' => $latestCalc?->exclusions,
                'period' => $latestCalc ? $latestCalc->period_start->format('d M') . ' - ' . $latestCalc->period_end->format('d M') : '-',
            ];
        }

        // Sort descending by methane mass
        usort($assetSummaries, fn ($a, $b) => ($b['methane_mass_kg'] ?? -1) <=> ($a['methane_mass_kg'] ?? -1));

        return Inertia::render('dashboard/emissions/index', [
            'facility' => $facility,
            'method' => $method ? [
                'version' => $method->version,
                'provenance' => $method->provenance,
                'config' => $method->config_json,
            ] : null,
            'period' => [
                'days' => $days,
                'start' => $periodStart->format('d M Y'),
                'end' => $periodEnd->format('d M Y'),
            ],
            'totalMethaneKg' => round($totalMethaneKg, 2),
            'assetSummaries' => $assetSummaries,
        ]);
    }
}