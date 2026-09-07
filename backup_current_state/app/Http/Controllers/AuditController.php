<?php

namespace App\Http\Controllers;

use App\Models\AuditEvent;
use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $actionFilter = $request->input('action');
        $entityFilter = $request->input('entity');

        $query = AuditEvent::where('organization_id', $org->id)->with('actor');

        if (! empty($actionFilter)) {
            $query->where('action', $actionFilter);
        }

        if (! empty($entityFilter)) {
            $query->where('entity_type', $entityFilter);
        }

        $events = $query->latest('occurred_at')->take(50)->get()->map(fn ($e) => [
            'id' => $e->id,
            'actor_name' => $e->actor?->name ?? 'Sistem',
            'action' => $e->action,
            'entity_type' => $e->entity_type,
            'entity_id' => $e->entity_id,
            'payload_before' => $e->payload_before,
            'payload_after' => $e->payload_after,
            'occurred_at' => $e->occurred_at->format('d M Y H:i:s'),
        ]);

        return Inertia::render('dashboard/audit/index', [
            'facility' => $facility,
            'events' => $events,
            'filters' => [
                'action' => $actionFilter,
                'entity' => $entityFilter,
            ],
            'availableActions' => AuditEvent::where('organization_id', $org->id)->distinct()->pluck('action'),
            'availableEntities' => AuditEvent::where('organization_id', $org->id)->distinct()->pluck('entity_type'),
        ]);
    }
}