<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_demo')->default(false);
            $table->timestamp('expires_at')->nullable();
            $table->string('timezone')->default('Asia/Jakarta');
            $table->timestamps();
        });

        Schema::create('organization_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('analyst'); // owner, analyst, technician, reviewer
            $table->timestamps();

            $table->unique(['organization_id', 'user_id']);
        });

        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->string('code', 50);
            $table->string('name');
            $table->string('sector')->default('oil_and_gas');
            $table->timestamps();

            $table->unique(['organization_id', 'code']);
        });

        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facility_id')->constrained()->cascadeOnDelete();
            $table->string('code', 50);
            $table->string('name');
            $table->string('type', 100);
            $table->foreignId('parent_asset_id')->nullable()->constrained('assets')->nullOnDelete();
            $table->decimal('demo_baseline_pressure_bar', 8, 2)->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['facility_id', 'code']);
        });

        Schema::create('data_sources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('facility_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type', 50); // csv_manual, scada_mock, cems_mock
            $table->string('label');
            $table->string('mode', 50)->default('manual'); // manual, simulated
            $table->timestamp('last_import_at')->nullable();
            $table->timestamps();
        });

        Schema::create('imports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('source_id')->nullable()->constrained('data_sources')->nullOnDelete();
            $table->string('file_path');
            $table->string('file_hash', 64);
            $table->string('status', 30)->default('uploaded'); // uploaded, validating, needs_fix, ready, processing, completed, failed
            $table->unsignedInteger('row_count')->default(0);
            $table->unsignedInteger('valid_count')->default(0);
            $table->unsignedInteger('error_count')->default(0);
            $table->json('errors_json')->nullable();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->foreignId('import_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedInteger('source_row')->nullable();
            $table->string('parameter', 50); // pressure, wall_loss, methane_concentration, methane_mass_rate, h2s_concentration
            $table->decimal('value', 12, 4);
            $table->string('unit', 30); // bar, percent, ppm, kg/h
            $table->timestamp('observed_at');
            $table->timestamp('interval_end')->nullable();
            $table->string('source_ref')->nullable();
            $table->string('quality', 30)->default('valid'); // valid, suspect, invalid
            $table->timestamps();

            $table->index(['asset_id', 'parameter', 'observed_at'], 'obs_asset_param_time_idx');
        });

        Schema::create('method_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->string('kind', 50); // risk_triase, emission_quantification
            $table->string('version', 50);
            $table->json('config_json');
            $table->text('provenance')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['organization_id', 'kind', 'version']);
        });

        Schema::create('risk_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->foreignId('method_version_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('evaluated_at');
            $table->decimal('corrosion_score', 5, 1)->nullable();
            $table->decimal('leak_score', 5, 1)->nullable();
            $table->decimal('emission_signal_score', 5, 1)->nullable();
            $table->decimal('composite_score', 5, 1)->nullable();
            $table->string('tier', 30); // Rendah, Sedang, Tinggi, Kritis, Data belum cukup
            $table->json('input_refs_json')->nullable();
            $table->text('explanation')->nullable();
            $table->timestamps();

            $table->index(['asset_id', 'evaluated_at'], 'risk_asset_time_idx');
        });

        Schema::create('emission_calculations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->foreignId('method_version_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('period_start');
            $table->timestamp('period_end');
            $table->decimal('methane_mass_kg', 12, 4)->nullable();
            $table->decimal('co2e_kg', 12, 4)->nullable();
            $table->decimal('coverage_ratio', 5, 2)->default(1.00);
            $table->string('uncertainty')->nullable();
            $table->json('input_refs_json')->nullable();
            $table->text('exclusions')->nullable();
            $table->timestamps();

            $table->index(['asset_id', 'period_start', 'period_end'], 'emiss_asset_period_idx');
        });

        Schema::create('maintenance_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assessment_id')->nullable()->constrained('risk_assessments')->nullOnDelete();
            $table->string('title');
            $table->foreignId('assignee_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('priority', 20)->default('medium'); // low, medium, high, critical
            $table->date('due_at')->nullable();
            $table->string('status', 30)->default('open'); // open, in_progress, done, cancelled
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('facility_id')->constrained()->cascadeOnDelete();
            $table->string('type', 30); // dram, lcam
            $table->timestamp('period_start');
            $table->timestamp('period_end');
            $table->string('status', 30)->default('draft'); // draft, in_review, reviewed, revision_requested
            $table->unsignedInteger('current_version')->default(1);
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('report_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('version');
            $table->json('content_json');
            $table->json('calculations_json')->nullable();
            $table->json('evidence_refs_json')->nullable();
            $table->unsignedTinyInteger('completeness_pct')->default(0);
            $table->text('reviewer_notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->unique(['report_id', 'version']);
        });

        Schema::create('evidence_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('report_id')->nullable()->constrained()->nullOnDelete();
            $table->string('file_path');
            $table->string('file_hash', 64);
            $table->string('file_name');
            $table->unsignedBigInteger('file_size');
            $table->string('source')->nullable();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('uploaded_at');
            $table->timestamps();
        });

        Schema::create('audit_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action', 100);
            $table->string('entity_type', 100);
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->json('payload_before')->nullable();
            $table->json('payload_after')->nullable();
            $table->timestamp('occurred_at');
            $table->timestamps();
        });

        Schema::create('pilot_interests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('organization')->nullable();
            $table->text('message');
            $table->timestamp('consent_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pilot_interests');
        Schema::dropIfExists('audit_events');
        Schema::dropIfExists('evidence_files');
        Schema::dropIfExists('report_versions');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('maintenance_tasks');
        Schema::dropIfExists('emission_calculations');
        Schema::dropIfExists('risk_assessments');
        Schema::dropIfExists('method_versions');
        Schema::dropIfExists('observations');
        Schema::dropIfExists('imports');
        Schema::dropIfExists('data_sources');
        Schema::dropIfExists('assets');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('organization_user');
        Schema::dropIfExists('organizations');
    }
};
