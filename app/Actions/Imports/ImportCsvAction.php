<?php

namespace App\Actions\Imports;

use App\Models\Asset;
use App\Models\Import;
use App\Models\Observation;
use App\Models\Organization;
use App\Services\Audit\AuditLogger;
use App\Services\Emissions\EmissionCalculator;
use App\Services\Risk\DemoRiskProvider;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ImportCsvAction
{
    protected const ALLOWED_PARAMETERS = [
        'pressure' => ['bar', 'psi'],
        'wall_loss' => ['percent', '%'],
        'methane_concentration' => ['ppm'],
        'methane_mass_rate' => ['kg/h'],
        'h2s_concentration' => ['ppm'],
    ];

    public function __construct(
        protected DemoRiskProvider $riskProvider,
        protected EmissionCalculator $emissionCalculator,
        protected AuditLogger $auditLogger
    ) {}

    /**
     * Upload and parse CSV to create an Import record with validation preview.
     */
    public function uploadAndValidate(UploadedFile $file, Organization $organization, ?int $sourceId = null, ?int $userId = null): Import
    {
        $filePath = $file->store('imports', 'local');
        $fullPath = Storage::disk('local')->path($filePath);
        $fileHash = hash_file('sha256', $fullPath);

        // Check if duplicate completed import exists
        $existing = Import::where('organization_id', $organization->id)
            ->where('file_hash', $fileHash)
            ->where('status', 'completed')
            ->first();

        if ($existing) {
            return Import::create([
                'organization_id' => $organization->id,
                'source_id' => $sourceId,
                'file_path' => $filePath,
                'file_hash' => $fileHash,
                'status' => 'failed',
                'row_count' => 0,
                'valid_count' => 0,
                'error_count' => 1,
                'errors_json' => ['File CSV dengan konten identik sudah pernah berhasil diimpor sebelumnya.'],
                'actor_id' => $userId,
            ]);
        }

        $import = Import::create([
            'organization_id' => $organization->id,
            'source_id' => $sourceId,
            'file_path' => $filePath,
            'file_hash' => $fileHash,
            'status' => 'validating',
            'row_count' => 0,
            'valid_count' => 0,
            'error_count' => 0,
            'actor_id' => $userId,
        ]);

        $this->validateRows($import);

        return $import;
    }

    /**
     * Validate each row in the uploaded CSV.
     */
    public function validateRows(Import $import): void
    {
        $fullPath = Storage::disk('local')->path($import->file_path);
        if (! file_exists($fullPath)) {
            $import->update(['status' => 'failed', 'error_count' => 1, 'errors_json' => ['Berkas CSV tidak ditemukan pada penyimpanan.']]);
            return;
        }

        $handle = fopen($fullPath, 'r');
        if (! $handle) {
            $import->update(['status' => 'failed', 'error_count' => 1, 'errors_json' => ['Gagal membaca berkas CSV.']]);
            return;
        }

        $header = fgetcsv($handle);
        if (! $header) {
            fclose($handle);
            $import->update(['status' => 'failed', 'error_count' => 1, 'errors_json' => ['Format CSV kosong.']]);
            return;
        }

        $header = array_map('trim', array_map('strtolower', $header));
        $requiredCols = ['asset_code', 'observed_at', 'parameter', 'value', 'unit'];
        $missingCols = array_diff($requiredCols, $header);

        if (! empty($missingCols)) {
            fclose($handle);
            $import->update([
                'status' => 'needs_fix',
                'error_count' => count($missingCols),
                'errors_json' => ['Kolom wajib tidak ditemukan: ' . implode(', ', $missingCols)],
            ]);
            return;
        }

        $colIndices = array_flip($header);
        $rowIndex = 1;
        $validCount = 0;
        $errors = [];

        // Preload valid asset codes for this organization
        $validAssets = Asset::whereHas('facility', function ($q) use ($import) {
            $q->where('organization_id', $import->organization_id);
        })->pluck('id', 'code')->toArray();

        while (($row = fgetcsv($handle)) !== false) {
            $rowIndex++;
            if (empty(array_filter($row))) {
                continue; // skip blank rows
            }

            $assetCode = trim($row[$colIndices['asset_code']] ?? '');
            $observedAt = trim($row[$colIndices['observed_at']] ?? '');
            $param = trim($row[$colIndices['parameter']] ?? '');
            $val = trim($row[$colIndices['value']] ?? '');
            $unit = trim($row[$colIndices['unit']] ?? '');
            $intervalEnd = isset($colIndices['interval_end']) ? trim($row[$colIndices['interval_end']] ?? '') : null;

            $rowErrors = [];

            if (! isset($validAssets[$assetCode])) {
                $rowErrors[] = "Kode aset '{$assetCode}' tidak ditemukan di organisasi.";
            }

            if (empty($observedAt) || ! strtotime($observedAt)) {
                $rowErrors[] = "Waktu observasi '{$observedAt}' tidak valid.";
            }

            if (! array_key_exists($param, self::ALLOWED_PARAMETERS)) {
                $rowErrors[] = "Parameter '{$param}' tidak dikenali.";
            } else {
                $allowedUnits = self::ALLOWED_PARAMETERS[$param];
                if (! in_array(strtolower($unit), array_map('strtolower', $allowedUnits), true)) {
                    $rowErrors[] = "Satuan '{$unit}' tidak sesuai untuk parameter '{$param}' (diizinkan: " . implode(', ', $allowedUnits) . ").";
                }
            }

            if (! is_numeric($val)) {
                $rowErrors[] = "Nilai '{$val}' bukan angka finite.";
            }

            if ($param === 'methane_mass_rate' && (empty($intervalEnd) || ! strtotime($intervalEnd))) {
                $rowErrors[] = "Parameter 'methane_mass_rate' wajib memiliki interval_end yang sah.";
            }

            if (! empty($rowErrors)) {
                $errors[] = "Baris {$rowIndex}: " . implode(' ', $rowErrors);
            } else {
                $validCount++;
            }
        }

        fclose($handle);

        $totalRows = $rowIndex - 1;
        $errorCount = count($errors);
        $status = $errorCount > 0 ? 'needs_fix' : 'ready';

        $import->update([
            'status' => $status,
            'row_count' => $totalRows,
            'valid_count' => $validCount,
            'error_count' => $errorCount,
            'errors_json' => $errors,
        ]);
    }

    /**
     * Confirm and commit import into observations, then trigger recalculation.
     */
    public function commitImport(Import $import): bool
    {
        if ($import->status !== 'ready') {
            return false;
        }

        $fullPath = Storage::disk('local')->path($import->file_path);
        $handle = fopen($fullPath, 'r');
        if (! $handle) {
            return false;
        }

        $header = array_map('trim', array_map('strtolower', fgetcsv($handle)));
        $colIndices = array_flip($header);

        $validAssets = Asset::whereHas('facility', function ($q) use ($import) {
            $q->where('organization_id', $import->organization_id);
        })->pluck('id', 'code')->toArray();

        $affectedAssetIds = [];

        DB::beginTransaction();
        try {
            $sourceRow = 1;
            while (($row = fgetcsv($handle)) !== false) {
                $sourceRow++;
                if (empty(array_filter($row))) {
                    continue;
                }

                $assetCode = trim($row[$colIndices['asset_code']]);
                $assetId = $validAssets[$assetCode];
                $param = trim($row[$colIndices['parameter']]);
                $val = (float) trim($row[$colIndices['value']]);
                $unit = trim($row[$colIndices['unit']]);
                $observedAt = Carbon::parse(trim($row[$colIndices['observed_at']]));
                $intervalEnd = ! empty($colIndices['interval_end']) && ! empty(trim($row[$colIndices['interval_end']]))
                    ? Carbon::parse(trim($row[$colIndices['interval_end']]))
                    : null;
                $sourceRef = ! empty($colIndices['source_ref']) ? trim($row[$colIndices['source_ref']]) : null;

                Observation::create([
                    'asset_id' => $assetId,
                    'import_id' => $import->id,
                    'source_row' => $sourceRow,
                    'parameter' => $param,
                    'value' => $val,
                    'unit' => $unit,
                    'observed_at' => $observedAt,
                    'interval_end' => $intervalEnd,
                    'source_ref' => $sourceRef,
                    'quality' => 'valid',
                ]);

                $affectedAssetIds[$assetId] = true;
            }

            fclose($handle);

            $import->update(['status' => 'completed']);

            // Recalculate risk evaluations for affected assets
            foreach (array_keys($affectedAssetIds) as $assetId) {
                $asset = Asset::find($assetId);
                if ($asset) {
                    $this->riskProvider->evaluate($asset);
                }
            }

            $this->auditLogger->log(
                $import->organization_id,
                $import->actor_id,
                'import_completed',
                'Import',
                $import->id,
                null,
                ['row_count' => $import->row_count, 'valid_count' => $import->valid_count]
            );

            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            fclose($handle);
            $import->update(['status' => 'failed', 'errors_json' => [$e->getMessage()]]);
            return false;
        }
    }
}
