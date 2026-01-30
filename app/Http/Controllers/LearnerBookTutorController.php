<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function store(Request $request)
    {
        $request->validate([
            'tutor_id' => 'required|exists:tutors,tutor_id',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'session_duration' => 'required|numeric',
        ]);

        if (Auth::user()->role !== 'learner') {
            abort(403, 'Only learners can book tutors.');
        }

        // Get tutor to fetch rate_per_hour
        $tutor = Tutor::findOrFail($request->tutor_id);

        // Calculate amount based on session_duration and rate_per_hour
        $amount = $request->session_duration * $tutor->rate_per_hour;

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'tutor_id' => $request->tutor_id,
            'booking_date' => $request->booking_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'session_duration' => $request->session_duration,
            'amount' => $amount,
        ]);

        return redirect()->back()->with('success', 'Booking successful');
    }

    /**
     * Cancel a booking (by learner)
     */
    public function cancel($book_id)
    {
        $booking = Booking::where('book_id', $book_id)->firstOrFail();

        if ($booking->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $booking->booking_status = 'canceled';
        $booking->save();

        return back()->with('success', 'Booking canceled.');
    }
}
