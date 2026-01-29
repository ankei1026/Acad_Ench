<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LearnerHomeController extends Controller
{
    public function index()
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->with(['tutor.user', 'tutor']) // Load both tutor and tutor.user
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                return [
                    'book_id' => $booking->book_id,
                    'booking_date' => $booking->booking_date,
                    'start_time' => $booking->start_time,
                    'end_time' => $booking->end_time,
                    'session_duration' => $booking->session_duration,
                    'booking_status' => $booking->booking_status,
                    'tutor_status' => $booking->tutor_status,
                    'amount' => $booking->amount,
                    'tutor' => $booking->tutor ? [
                        'user' => $booking->tutor->user ? [
                            'name' => $booking->tutor->user->name,
                        ] : null,
                        'mop' => $booking->tutor->mop, 
                        'number' => $booking->tutor->number,
                    ] : null,
                ];
            });

        return Inertia::render('Learner/Home', [
            'bookings' => $bookings,
        ]);
    }
}