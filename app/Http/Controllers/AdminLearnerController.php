<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLearnerController extends Controller
{
    public function index()
    {
        // Get all users with role 'learner'
        $learners = User::where('role', 'learner')
            ->select(['id', 'name', 'email', 'created_at',])
            ->latest()
            ->get()
            ->map(function ($learner) {
                return [
                    'id' => $learner->id,
                    'name' => $learner->name,
                    'email' => $learner->email,
                    'created_at' => $learner->created_at->format('Y-m-d H:i:s'),
                    'created_at_human' => $learner->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('Admin/Learners', [
            'learners' => $learners,
        ]);
    }
}
