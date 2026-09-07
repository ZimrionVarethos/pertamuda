<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'facility_id',
        'code',
        'name',
        'type',
        'parent_asset_id',
        'demo_baseline_pressure_bar',
        'metadata',
    ];

    protected $casts = [
        'demo_baseline_pressure_bar' => 'decimal:2',
        'metadata' => 'array',
    ];

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function parentAsset(): BelongsTo
    {
        return $this->belongsTo(Asset::class, 'parent_asset_id');
    }

    public function childAssets(): HasMany
    {
        return $this->hasMany(Asset::class, 'parent_asset_id');
    }

    public function observations(): HasMany
    {
        return $this->hasMany(Observation::class);
    }

    public function riskAssessments(): HasMany
    {
        return $this->hasMany(RiskAssessment::class);
    }

    public function latestRiskAssessment(): HasOne
    {
        return $this->hasOne(RiskAssessment::class)->latestOfMany('evaluated_at');
    }

    public function emissionCalculations(): HasMany
    {
        return $this->hasMany(EmissionCalculation::class);
    }

    public function latestEmissionCalculation(): HasOne
    {
        return $this->hasOne(EmissionCalculation::class)->latestOfMany('period_end');
    }

    public function maintenanceTasks(): HasMany
    {
        return $this->hasMany(MaintenanceTask::class);
    }
}
