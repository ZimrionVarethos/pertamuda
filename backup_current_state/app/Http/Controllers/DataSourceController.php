<?php

namespace App\Http\Controllers;

use App\Actions\Imports\ImportCsvAction;
use App\Models\DataSource;
use App\Models\Facility;
use App\Models\Import;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DataSourceController extends Controller
{
    public function __construct(
        protected ImportCsvAction $importAction
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();
        $facility = Facility::where('organization_id', $org->id)->first();

        $sources = DataSource::where('organization_id', $org->id)->get()->map(fn ($s) => [
            'id' => $s->id,
            'type' => $s->type,
            'label' => $s->label,
            'mode' => $s->mode,
            'last_import_at' => $s->last_import_at?->diffForHumans() ?? 'Belum pernah',
        ]);

        $imports = Import::where('organization_id', $org->id)
            ->with(['actor', 'source'])
            ->latest('id')
            ->get()
            ->map(fn ($i) => [
                'id' => $i->id,
                'file_hash' => substr($i->file_hash, 0, 10) . '...',
                'status' => $i->status,
                'row_count' => $i->row_count,
                'valid_count' => $i->valid_count,
                'error_count' => $i->error_count,
                'actor_name' => $i->actor?->name ?? 'Sistem',
                'created_at' => $i->created_at->format('d M Y H:i'),
            ]);

        return Inertia::render('dashboard/data/index', [
            'facility' => $facility,
            'dataSources' => $sources,
            'imports' => $imports,
        ]);
    }

    public function upload(Request $request): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if (! $user->hasRole(['owner', 'analyst'])) {
            abort(403, 'Hanya peran Owner dan Analis yang dapat mengunggah berkas.');
        }

        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:5120', // max 5MB
            'source_id' => 'nullable|exists:data_sources,id',
        ]);

        $file = $request->file('file');
        $import = $this->importAction->uploadAndValidate($file, $org, $request->input('source_id'), $user->id);

        return redirect()->route('dashboard.data.imports.show', $import->id)
            ->with('success', 'Berkas CSV berhasil diunggah dan diverifikasi.');
    }

    public function showImport(Request $request, Import $import): Response
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($import->organization_id !== $org->id) {
            abort(403, 'Akses impor ditolak.');
        }

        // Read up to 25 sample rows from file for preview
        $previewRows = [];
        $fullPath = Storage::disk('local')->path($import->file_path);
        if (file_exists($fullPath)) {
            $handle = fopen($fullPath, 'r');
            if ($handle) {
                $header = fgetcsv($handle);
                $count = 0;
                while (($row = fgetcsv($handle)) !== false && $count < 25) {
                    if (! empty(array_filter($row))) {
                        $previewRows[] = array_combine($header, $row);
                        $count++;
                    }
                }
                fclose($handle);
            }
        }

        return Inertia::render('dashboard/data/import-detail', [
            'import' => [
                'id' => $import->id,
                'file_hash' => $import->file_hash,
                'status' => $import->status,
                'row_count' => $import->row_count,
                'valid_count' => $import->valid_count,
                'error_count' => $import->error_count,
                'errors' => $import->errors_json ?? [],
                'created_at' => $import->created_at->format('d M Y H:i:s'),
            ],
            'previewRows' => $previewRows,
        ]);
    }

    public function confirmImport(Request $request, Import $import): RedirectResponse
    {
        $user = $request->user();
        $org = $user->currentOrganization();

        if ($import->organization_id !== $org->id) {
            abort(403, 'Akses impor ditolak.');
        }

        if (! $user->hasRole(['owner', 'analyst'])) {
            abort(403, 'Hanya peran Owner dan Analis yang dapat mengonfirmasi impor.');
        }

        $success = $this->importAction->commitImport($import);

        if ($success) {
            return redirect()->route('dashboard.data.index')
                ->with('success', "Impor berhasil diselesaikan. {$import->valid_count} observasi tersimpan.");
        }

        return back()->with('error', 'Gagal memproses baris impor.');
    }

    public function downloadTemplate(): BinaryFileResponse
    {
        $path = public_path('templates/nasir_observations_template.csv');
        return response()->download($path, 'nasir_template_observasi.csv');
    }
}