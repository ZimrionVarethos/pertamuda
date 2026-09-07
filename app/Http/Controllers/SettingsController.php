<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\MethodVersion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $members = $org->users()->get()->map(fn ($u) => [
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'role' => $u->pivot->role,
        ]);

        $methods = MethodVersion::where('organization_id', $org->id)->get()->map(fn ($m) => [
            'id' => $m->id,
            'kind' => $m->kind,
            'version' => $m->version,
            'config' => $m->config_json,
            'provenance' => $m->provenance,
            'created_at' => $m->created_at->format('d M Y'),
        ]);

        return Inertia::render('dashboard/settings/index', [
            'facility' => $facility,
            'organization' => [
                'id' => $org->id,
                'name' => $org->name,
                'is_demo' => $org->is_demo,
                'timezone' => $org->timezone,
            ],
            'members' => $members,
            'methods' => $methods,
            'currentUserRole' => $user->roleIn($org),
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return back()->with('success', 'Profil pengguna berhasil diperbarui.');
    }
}