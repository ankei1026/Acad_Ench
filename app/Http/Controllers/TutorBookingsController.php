<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
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
            ->with([
                'learner' => function ($query) {
                    $query->select('id', 'name', 'email');
                },
                'receipt',
            ])
            ->select(
                'book_id',
                'tutor_id',
                'user_id',
                'amount',
                'start_time',
                'end_time',
                'booking_date',
                'booking_status',
                'tutor_status'
            )
            ->latest('created_at')
            ->get()
            ->map(function ($booking) {
                return [
                    'book_id' => $booking->book_id,
                    'name' => $booking->learner->name ?? 'N/A',
                    'amount' => $booking->amount ?? 0,
                    'booking_status' => $booking->booking_status,
                    'start_time' => $booking->start_time,
                    'end_time' => $booking->end_time,
                    'booking_date' => $booking->booking_date,
                    'tutor_status' => $booking->tutor_status,
                    'decline_reason' => $booking->decline_reason,
                    'payment_status' => $booking->booking_status,
                    'receipt' => $booking->receipt ? [
                        'id' => $booking->receipt->id,
                        'reference' => $booking->receipt->reference,
                        'amount' => $booking->receipt->amount,
                        'photo' => $booking->receipt->photo ? asset('storage/' . $booking->receipt->photo) : null,
                    ] : null,
                ];
            });

        return Inertia::render('Tutor/Booking', [
            'bookingData' => $bookings,
        ]);
    }

    public function updateStatus(Request $request, $book_id)
    {
        $request->validate([
            'tutor_status' => 'required|in:pending,accept,decline,success,failed',
            'decline_reason' => 'nullable|string|max:500',
        ]);

        // Find the booking by book_id instead of id
        $booking = Booking::where('book_id', $book_id)->firstOrFail();

        // Check if the booking belongs to the authenticated tutor
        $tutor = Tutor::where('user_id', auth()->id())->firstOrFail();

        if ($booking->tutor_id !== $tutor->tutor_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Prepare update data
        $updateData = [
            'tutor_status' => $request->tutor_status,
        ];

        if ($request->tutor_status === 'decline') {
            $updateData['decline_reason'] = $request->decline_reason;
        } else {
            // Clear previous decline reason if any
            $updateData['decline_reason'] = null;
        }

        // Update the tutor status (and decline reason if applicable)
        $booking->update($updateData);

        return back();
    }
}
