<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearnerBookTutorController extends Controller
{
    public function index(Request $request)
    {
        // Get search and filter parameters
        $search = $request->input('search', '');
        $subject = $request->input('subject', '');

        // Start query
        $query = Tutor::with('user')
            ->where('status', 'active');

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('specializations', 'like', "%{$search}%");
            });
        }

        // Apply subject filter - FIXED: only apply if subject is not "all"
        if ($subject && $subject !== 'all') {
            $query->where('subject', 'like', "%{$subject}%");
        }

        // Get paginated results
        $tutors = $query->paginate(12)->withQueryString();

        // Get unique subjects for filter dropdown
        $subjects = Tutor::where('status', 'active')
            ->distinct('subject')
            ->pluck('subject')
            ->filter()
            ->values();

        return Inertia::render('Learner/BookTutor', [
            'tutors' => $tutors,
            'filters' => [
                'search' => $search,
                'subject' => $subject === 'all' ? '' : $subject, // Send empty string if 'all'
            ],
            'subjects' => $subjects,
        ]);
    }

    public function show($id)
    {
        // Eager load the user relationship and any other needed relations
        $tutor = Tutor::with('user')->findOrFail($id);

        return Inertia::render('Learner/TutorShow', [
            'tutor' => $tutor,
        ]);
    }
}
