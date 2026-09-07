<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaintenanceTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'asset_id',
        'assessment_id',
        'title',
        'assignee_id',
        'priority',
        'due_at',
        'status',
        'notes',
    ];

    protected $casts = [
        'due_at' => 'date',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(RiskAssessment::class, 'assessment_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }
}
