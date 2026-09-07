<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmissionCalculation extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'method_version_id',
        'period_start',
        'period_end',
        'methane_mass_kg',
        'co2e_kg',
        'coverage_ratio',
        'uncertainty',
        'input_refs_json',
        'exclusions',
    ];

    protected $casts = [
        'period_start' => 'datetime',
        'period_end' => 'datetime',
        'methane_mass_kg' => 'decimal:4',
        'co2e_kg' => 'decimal:4',
        'coverage_ratio' => 'decimal:2',
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
}
