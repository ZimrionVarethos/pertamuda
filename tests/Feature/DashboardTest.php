<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $org = \App\Models\Organization::create(['name' => 'Demo Org']);
        $facility = \App\Models\Facility::create([
            'organization_id' => $org->id,
            'code' => 'DEMO-01',
            'name' => 'Demo Facility',
            'sector' => 'Oil and Gas',
        ]);

        $user = User::factory()->create();
        $org->users()->attach($user->id, ['role' => 'analyst']);

        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }
}
