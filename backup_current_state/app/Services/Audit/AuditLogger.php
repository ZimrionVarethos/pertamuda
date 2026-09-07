<?php

namespace App\Services\Audit;

use App\Models\AuditEvent;
use Carbon\Carbon;

class AuditLogger
{
    public function log(
        int $organizationId,
        ?int $actorId,
        string $action,
        string $entityType,
        ?int $entityId = null,
        ?array $payloadBefore = null,
        ?array $payloadAfter = null
    ): AuditEvent {
        return AuditEvent::create([
            'organization_id' => $organizationId,
            'actor_id' => $actorId,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'payload_before' => $payloadBefore,
            'payload_after' => $payloadAfter,
            'occurred_at' => Carbon::now(),
        ]);
    }
}
