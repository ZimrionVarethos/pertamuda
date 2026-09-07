<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\PilotInterest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('public/home');
    }

    public function solution(): Response
    {
        return Inertia::render('public/solution');
    }

    public function methodology(): Response
    {
        return Inertia::render('public/methodology');
    }

    public function about(): Response
    {
        return Inertia::render('public/about');
    }

    public function privacy(): Response
    {
        return Inertia::render('public/privacy');
    }

    public function storePilotInterest(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'consent' => 'accepted',
        ]);

        PilotInterest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'organization' => $validated['organization'] ?? null,
            'message' => $validated['message'],
            'consent_at' => Carbon::now(),
        ]);

        return back()->with('success', 'Formulir minat pilot berhasil dikirimkan. Tim kami akan segera meninjau pesan Anda.');
    }

    public function startDemo(): RedirectResponse
    {
        // Log in to the single seeded demo account
        $demoUser = User::where('email', 'demo@nasir.test')->first() ?? User::first();

        if ($demoUser) {
            Auth::login($demoUser);
            request()->session()->regenerate();
            return redirect()->route('dashboard')->with('success', 'Selamat datang di workspace demo NASIR. Anda masuk dengan akses penuh data sintetis.');
        }

        return redirect()->route('login');
    }
}