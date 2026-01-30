<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Tutor;
use App\Models\TutorApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $learners = User::where('role', 'learner')->count();

        $tutors = Tutor::count();

        $totalRevenue = Booking::where('booking_status', 'paid')->sum('amount');

        $paidBookings = Booking::where('booking_status', 'paid')
            ->with('tutor.user', 'learner')
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->book_id,
                    'book_id' => $booking->book_id,
                    'booking' => [
                        'user' => [
                            'name' => $booking->learner->name ?? 'N/A',
                        ],
                    ],
                    'tutor' => [
                        'name' => $booking->tutor->user->name ?? 'N/A',
                        'email' => $booking->tutor->user->email ?? 'N/A',
                        'photo' => $booking->tutor->photo
                            ? \Illuminate\Support\Facades\Storage::url($booking->tutor->photo)
                            : null,
                    ],
                    'amount' => $booking->amount,
                    'status' => $booking->booking_status,
                    'booking_date' => $booking->booking_date,
                    'start_time' => $booking->start_time,
                    'end_time' => $booking->end_time,

                ];
            });

        $tutorApplications = TutorApplication::count();

        return Inertia::render(
            'Admin/Dashboard',
            [
                'learners' => $learners,
                'tutors' => $tutors,
                'revenue' => $totalRevenue,
                'paid_bookings' => $paidBookings,
                'tutor_applications' => $tutorApplications,
            ]
        );
    }
}
