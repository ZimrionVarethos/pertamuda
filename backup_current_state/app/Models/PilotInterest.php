<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PilotInterest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'organization',
        'message',
        'consent_at',
    ];

    protected $casts = [
        'consent_at' => 'datetime',
    ];
}
