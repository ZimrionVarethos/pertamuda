<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ReportPolicy
{
    public function view(User $user, Report $report): bool
    {
        return $user->organizations()->where('organizations.id', $report->organization_id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['owner', 'analyst']);
    }

    public function update(User $user, Report $report): bool
    {
        $org = $report->organization;
        return $org && $user->organizations()->where('organizations.id', $org->id)->exists()
            && $user->hasRole(['owner', 'analyst'], $org);
    }

    public function review(User $user, Report $report): bool
    {
        $org = $report->organization;
        if (! $org || ! $user->organizations()->where('organizations.id', $org->id)->exists()) {
            return false;
        }

        // Reviewer or Owner can review. Author cannot review their own report unless Owner
        $isReviewer = $user->hasRole(['reviewer', 'owner'], $org);
        if (! $isReviewer) {
            return false;
        }

        if ($report->author_id === $user->id && ! $user->hasRole('owner', $org)) {
            return false;
        }

        return true;
    }

    public function export(User $user, Report $report): bool
    {
        $org = $report->organization;
        return $org && $user->organizations()->where('organizations.id', $org->id)->exists()
            && $user->hasRole(['owner', 'analyst', 'reviewer'], $org);
    }
}