<?php

namespace App\Policies;

use App\Models\Import;
use App\Models\User;

class ImportPolicy
{
    public function view(User $user, Import $import): bool
    {
        return $user->organizations()->where('organizations.id', $import->organization_id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['owner', 'analyst']);
    }

    public function confirm(User $user, Import $import): bool
    {
        $org = $import->organization;
        return $org && $user->organizations()->where('organizations.id', $org->id)->exists()
            && $user->hasRole(['owner', 'analyst'], $org);
    }
}