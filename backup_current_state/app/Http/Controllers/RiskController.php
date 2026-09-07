<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Facility;
use App\Models\MethodVersion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RiskController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $method = MethodVersion::where('organization_id', $org->id)
            ->where('kind', 'risk_triase')
            ->latest('id')
            ->first();

        $assets = Asset::where('facility_id', $facility->id)
            ->with('latestRiskAssessment')
            ->get();

        $tierCounts = ['Rendah' => 0, 'Sedang' => 0, 'Tinggi' => 0, 'Kritis' => 0, 'Data belum cukup' => 0];

        $rankedAssets = $assets->map(function ($a) use (&$tierCounts) {
            $latest = $a->latestRiskAssessment;
            $tier = $latest?->tier ?? 'Data belum cukup';
            if (isset($tierCounts[$tier])) {
                $tierCounts[$tier]++;
            }

            return [
                'id' => $a->id,
                'code' => $a->code,
                'name' => $a->name,
                'type' => $a->type,
                'composite_score' => $latest?->composite_score,
                'corrosion_score' => $latest?->corrosion_score,
                'leak_score' => $latest?->leak_score,
                'emission_signal_score' => $latest?->emission_signal_score,
                'tier' => $tier,
                'explanation' => $latest?->explanation,
                'evaluated_at' => $latest?->evaluated_at?->format('d M Y H:i'),
            ];
        })->sortByDesc(fn ($a) => $a['composite_score'] ?? -1)->values();

        return Inertia::render('dashboard/risk/index', [
            'facility' => $facility,
            'method' => $method ? [
                'version' => $method->version,
                'provenance' => $method->provenance,
                'config' => $method->config_json,
            ] : null,
            'tierCounts' => $tierCounts,
            'rankedAssets' => $rankedAssets,
        ]);
    }
}