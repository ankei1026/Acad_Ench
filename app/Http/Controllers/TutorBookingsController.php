<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorBookingsController extends Controller
{
    public function index(Request $request)
    {
        // Get the authenticated user's tutor profile
        $tutor = Tutor::where('user_id', auth()->id())->firstOrFail();

        // Fetch bookings for this tutor with learner info
        $bookings = $tutor->bookings()
            ->with(['learner' => function ($query) {
                $query->select('id', 'name', 'email');
            }])
            ->select(
                'book_id',
                'tutor_id',
                'user_id',
                'amount',
                'mop',
                'booking_status',
                'tutor_status'
            )
            ->latest('created_at')
            ->get()
            ->map(function ($booking) {
                return [
                    'book_id' => $booking->book_id,
                    'name' => $booking->learner->name ?? 'N/A',
                    'photo' => $booking->learner->photo ?? '/assets/default.webp',
                    'amount' => $booking->amount ?? 0,
                    'mop' => $booking->mop,
                    'booking_status' => $booking->booking_status,
                    'tutor_status' => $booking->tutor_status,
                    'payment_status' => $booking->booking_status,
                ];
            });

        return Inertia::render('Tutor/Booking', [
            'bookingData' => $bookings,
        ]);
    }
}
