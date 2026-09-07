<?php

namespace App\Policies;

use App\Models\Asset;
use App\Models\User;

class AssetPolicy
{
    public function view(User $user, Asset $asset): bool
    {
        $org = $asset->facility?->organization;
        return $org && $user->organizations()->where('organizations.id', $org->id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['owner', 'analyst']);
    }

    public function update(User $user, Asset $asset): bool
    {
        $org = $asset->facility?->organization;
        return $org && $user->organizations()->where('organizations.id', $org->id)->exists()
            && $user->hasRole(['owner', 'analyst'], $org);
    }
}