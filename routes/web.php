<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\AuditController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataSourceController;
use App\Http\Controllers\EmissionController;
use App\Http\Controllers\MaintenanceTaskController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RiskController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

// 1. Halaman Publik (P01 - P05) & Demo Action
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/solusi', [PublicController::class, 'solution'])->name('public.solution');
Route::get('/metodologi', [PublicController::class, 'methodology'])->name('public.methodology');
Route::get('/tentang', [PublicController::class, 'about'])->name('public.about');
Route::post('/pilot-interest', [PublicController::class, 'storePilotInterest'])->name('public.pilot-interest');
Route::get('/privasi', [PublicController::class, 'privacy'])->name('public.privacy');
Route::post('/demo/start', [PublicController::class, 'startDemo'])->name('demo.start');

// 2. Dashboard Terautentikasi (D01 - D12)
Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    // D01: Ringkasan
    Route::get('/', [DashboardController::class, 'overview'])->name('dashboard');

    // D02 & D03: Aset
    Route::get('/assets', [AssetController::class, 'index'])->name('dashboard.assets.index');
    Route::post('/assets', [AssetController::class, 'store'])->name('dashboard.assets.store');
    Route::get('/assets/{asset}', [AssetController::class, 'show'])->name('dashboard.assets.show');

    // D04 & D05: Sumber Data & Impor
    Route::get('/data', [DataSourceController::class, 'index'])->name('dashboard.data.index');
    Route::post('/data/upload', [DataSourceController::class, 'upload'])->name('dashboard.data.upload');
    Route::get('/data/template', [DataSourceController::class, 'downloadTemplate'])->name('dashboard.data.template');
    Route::get('/data/imports/{import}', [DataSourceController::class, 'showImport'])->name('dashboard.data.imports.show');
    Route::post('/data/imports/{import}/confirm', [DataSourceController::class, 'confirmImport'])->name('dashboard.data.imports.confirm');

    // D06: Analisis Risiko
    Route::get('/risk', [RiskController::class, 'index'])->name('dashboard.risk.index');

    // D07: Kuantifikasi Emisi
    Route::get('/emissions', [EmissionController::class, 'index'])->name('dashboard.emissions.index');

    // D08: Pemeliharaan
    Route::get('/maintenance', [MaintenanceTaskController::class, 'index'])->name('dashboard.maintenance.index');
    Route::post('/maintenance', [MaintenanceTaskController::class, 'store'])->name('dashboard.maintenance.store');
    Route::patch('/maintenance/{task}', [MaintenanceTaskController::class, 'update'])->name('dashboard.maintenance.update');

    // D09 & D10: Laporan & Ekspor
    Route::get('/reports', [ReportController::class, 'index'])->name('dashboard.reports.index');
    Route::post('/reports', [ReportController::class, 'store'])->name('dashboard.reports.store');
    Route::get('/reports/{report}', [ReportController::class, 'show'])->name('dashboard.reports.show');
    Route::patch('/reports/{report}', [ReportController::class, 'update'])->name('dashboard.reports.update');
    Route::post('/reports/{report}/submit-review', [ReportController::class, 'submitReview'])->name('dashboard.reports.submit-review');
    Route::post('/reports/{report}/review', [ReportController::class, 'review'])->name('dashboard.reports.review');
    Route::get('/reports/{report}/print', [ReportController::class, 'print'])->name('dashboard.reports.print');
    Route::get('/reports/{report}/export-csv', [ReportController::class, 'exportCsv'])->name('dashboard.reports.export-csv');

    // D11: Jejak Audit
    Route::get('/audit', [AuditController::class, 'index'])->name('dashboard.audit.index');

    // D12: Pengaturan
    Route::get('/settings', [SettingsController::class, 'index'])->name('dashboard.settings.index');
    Route::patch('/settings/profile', [SettingsController::class, 'updateProfile'])->name('dashboard.settings.profile');
});

require __DIR__.'/settings.php';