<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'actor_id',
        'action',
        'entity_type',
        'entity_id',
        'payload_before',
        'payload_after',
        'occurred_at',
    ];

    protected $casts = [
        'payload_before' => 'array',
        'payload_after' => 'array',
        'occurred_at' => 'datetime',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}
