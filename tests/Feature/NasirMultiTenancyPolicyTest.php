<?php

namespace Tests\Feature;

use App\Models\Asset;
use App\Models\Facility;
use App\Models\MaintenanceTask;
use App\Models\Organization;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NasirMultiTenancyPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_cross_organization_asset_access_is_forbidden(): void
    {
        $orgA = Organization::create(['name' => 'Org A']);
        $orgB = Organization::create(['name' => 'Org B']);

        $userA = User::factory()->create();
        $orgA->users()->attach($userA->id, ['role' => 'analyst']);

        $facB = Facility::create(['organization_id' => $orgB->id, 'code' => 'FAC-B', 'name' => 'Facility B']);
        $assetB = Asset::create([
            'facility_id' => $facB->id,
            'code' => 'AST-B1',
            'name' => 'Asset B',
            'type' => 'valve',
        ]);

        $this->actingAs($userA);
        $this->assertFalse($userA->can('view', $assetB));
    }

    public function test_technician_cannot_update_unassigned_task(): void
    {
        $org = Organization::create(['name' => 'Test Org']);
        $fac = Facility::create(['organization_id' => $org->id, 'code' => 'FAC-T', 'name' => 'Facility T']);
        $asset = Asset::create(['facility_id' => $fac->id, 'code' => 'AST-T', 'name' => 'Asset T', 'type' => 'pump']);

        $tech1 = User::factory()->create();
        $tech2 = User::factory()->create();

        $org->users()->attach($tech1->id, ['role' => 'technician']);
        $org->users()->attach($tech2->id, ['role' => 'technician']);

        $task = MaintenanceTask::create([
            'organization_id' => $org->id,
            'asset_id' => $asset->id,
            'title' => 'Assigned to tech2',
            'assignee_id' => $tech2->id,
            'status' => 'open',
        ]);

        $this->assertFalse($tech1->can('update', $task));
        $this->assertTrue($tech2->can('update', $task));
    }

    public function test_analyst_cannot_self_review_own_report(): void
    {
        $org = Organization::create(['name' => 'Review Org']);
        $fac = Facility::create(['organization_id' => $org->id, 'code' => 'FAC-R', 'name' => 'Facility R']);

        $analyst = User::factory()->create();
        $reviewer = User::factory()->create();

        $org->users()->attach($analyst->id, ['role' => 'analyst']);
        $org->users()->attach($reviewer->id, ['role' => 'reviewer']);

        $report = Report::create([
            'organization_id' => $org->id,
            'facility_id' => $fac->id,
            'type' => 'dram',
            'period_start' => now()->subDays(7),
            'period_end' => now(),
            'status' => 'in_review',
            'author_id' => $analyst->id,
        ]);

        $this->assertFalse($analyst->can('review', $report));
        $this->assertTrue($reviewer->can('review', $report));
    }
}