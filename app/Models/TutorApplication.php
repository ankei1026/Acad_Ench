<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorApplication extends Model
{
    /** @use HasFactory<\Database\Factories\TutorApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'subject',
        'document_path',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
