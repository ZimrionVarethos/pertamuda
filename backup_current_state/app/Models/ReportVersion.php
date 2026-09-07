<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'version',
        'content_json',
        'calculations_json',
        'evidence_refs_json',
        'completeness_pct',
        'reviewer_notes',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'content_json' => 'array',
        'calculations_json' => 'array',
        'evidence_refs_json' => 'array',
        'completeness_pct' => 'integer',
        'reviewed_at' => 'datetime',
        'version' => 'integer',
    ];

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
