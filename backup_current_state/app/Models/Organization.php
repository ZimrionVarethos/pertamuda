<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_demo',
        'expires_at',
        'timezone',
    ];

    protected $casts = [
        'is_demo' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'organization_user')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function facilities(): HasMany
    {
        return $this->hasMany(Facility::class);
    }

    public function dataSources(): HasMany
    {
        return $this->hasMany(DataSource::class);
    }

    public function imports(): HasMany
    {
        return $this->hasMany(Import::class);
    }

    public function maintenanceTasks(): HasMany
    {
        return $this->hasMany(MaintenanceTask::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function auditEvents(): HasMany
    {
        return $this->hasMany(AuditEvent::class);
    }

    public function methodVersions(): HasMany
    {
        return $this->hasMany(MethodVersion::class);
    }
}
