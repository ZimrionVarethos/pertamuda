<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Import extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'source_id',
        'file_path',
        'file_hash',
        'status',
        'row_count',
        'valid_count',
        'error_count',
        'errors_json',
        'actor_id',
    ];

    protected $casts = [
        'errors_json' => 'array',
        'row_count' => 'integer',
        'valid_count' => 'integer',
        'error_count' => 'integer',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(DataSource::class, 'source_id');
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function observations(): HasMany
    {
        return $this->hasMany(Observation::class);
    }
}
