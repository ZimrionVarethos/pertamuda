<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RiskAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'method_version_id',
        'evaluated_at',
        'corrosion_score',
        'leak_score',
        'emission_signal_score',
        'composite_score',
        'tier',
        'input_refs_json',
        'explanation',
    ];

    protected $casts = [
        'evaluated_at' => 'datetime',
        'corrosion_score' => 'decimal:1',
        'leak_score' => 'decimal:1',
        'emission_signal_score' => 'decimal:1',
        'composite_score' => 'decimal:1',
        'input_refs_json' => 'array',
    ];

    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    public function methodVersion(): BelongsTo
    {
        return $this->belongsTo(MethodVersion::class);
    }

    public function maintenanceTasks(): HasMany
    {
        return $this->hasMany(MaintenanceTask::class, 'assessment_id');
    }
}
