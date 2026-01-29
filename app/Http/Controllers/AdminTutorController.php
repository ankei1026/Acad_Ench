<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTutorController extends Controller
{
    public function index()
    {
        $tutors = Tutor::with('user')
            ->get()
            ->map(function ($tutor) {
                return [
                    'id' => $tutor->id,
                    'tutor_id' => $tutor->tutor_id,
                    'subject' => $tutor->subject,
                    'specializations' => $tutor->specializations,
                    'rate_per_hour' => $tutor->rate_per_hour,
                    'bio' => $tutor->bio,
                    'photo' => $tutor->photo ? asset('storage/' . $tutor->photo) : null,
                    'mop' => $tutor->mop,
                    'number' => $tutor->number,
                    'status' => $tutor->status ?? 'active',
                    'user' => $tutor->user ? [
                        'id' => $tutor->user->id,
                        'name' => $tutor->user->name,
                        'email' => $tutor->user->email,
                    ] : null,
                ];
            });

        return Inertia::render(
            'Admin/Tutors',
            [
                'tutors' => $tutors
            ]
        );
    }
}
