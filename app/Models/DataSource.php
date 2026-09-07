<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DataSource extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'facility_id',
        'type',
        'label',
        'mode',
        'last_import_at',
    ];

    protected $casts = [
        'last_import_at' => 'datetime',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function imports(): HasMany
    {
        return $this->hasMany(Import::class, 'source_id');
    }
}
