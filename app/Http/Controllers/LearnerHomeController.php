<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class LearnerHomeController extends Controller
{
    public function index()
    {
        // Conditionally eager load receipt only if the table exists to avoid runtime errors
        $query = Booking::where('user_id', Auth::id());

        if (Schema::hasTable('receipts')) {
            $query->with(['tutor.user', 'tutor', 'receipt']);
        } else {
            $query->with(['tutor.user', 'tutor']);
        }

        $bookings = $query->orderBy('created_at', 'desc')
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
                    'decline_reason' => $booking->decline_reason,
                    'amount' => $booking->amount,
                    'receipt' => $booking->receipt ? [
                        'id' => $booking->receipt->id,
                        'reference' => $booking->receipt->reference,
                        'photo' => $booking->receipt->photo ? asset('storage/' . $booking->receipt->photo) : null,
                        'amount' => $booking->receipt->amount,
                    ] : null,
                    'tutor' => $booking->tutor ? [
                        'user' => $booking->tutor->user ? [
                            'name' => $booking->tutor->user->name,
                        ] : null,
                        'subject' => $booking->tutor->subject,
                        'photo' => $booking->tutor->photo ? asset('storage/' . $booking->tutor->photo) : null,
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
