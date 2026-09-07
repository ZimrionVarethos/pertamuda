<?php

namespace App\Policies;

use App\Models\MaintenanceTask;
use App\Models\User;

class MaintenanceTaskPolicy
{
    public function view(User $user, MaintenanceTask $task): bool
    {
        return $user->organizations()->where('organizations.id', $task->organization_id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['owner', 'analyst', 'technician']);
    }

    public function update(User $user, MaintenanceTask $task): bool
    {
        $org = $task->organization;
        if (! $org || ! $user->organizations()->where('organizations.id', $org->id)->exists()) {
            return false;
        }

        if ($user->hasRole(['owner', 'analyst'], $org)) {
            return true;
        }

        // Technician can only update if assigned to them
        if ($user->hasRole('technician', $org) && $task->assignee_id === $user->id) {
            return true;
        }

        return false;
    }
}