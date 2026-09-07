<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Observation extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'import_id',
        'source_row',
        'parameter',
        'value',
        'unit',
        'observed_at',
        'interval_end',
        'source_ref',
        'quality',
    ];

    protected $casts = [
        'value' => 'decimal:4',
        'observed_at' => 'datetime',
        'interval_end' => 'datetime',
        'source_row' => 'integer',
    ];

    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    public function import(): BelongsTo
    {
        return $this->belongsTo(Import::class);
    }
}
