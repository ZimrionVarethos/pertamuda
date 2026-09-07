<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MethodVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'kind',
        'version',
        'config_json',
        'provenance',
        'created_by',
    ];

    protected $casts = [
        'config_json' => 'array',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function riskAssessments(): HasMany
    {
        return $this->hasMany(RiskAssessment::class);
    }

    public function emissionCalculations(): HasMany
    {
        return $this->hasMany(EmissionCalculation::class);
    }
}
