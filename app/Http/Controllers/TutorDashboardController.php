<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorDashboardController extends Controller
{
    public function index(Request $request)
    {
        $tutor = $request->user()->tutor;

        $events = [];

        if ($tutor) {
            $bookings = $tutor->bookings()
                ->with('learner')
                ->where('tutor_status', 'accept')
                ->where('booking_status', 'paid')
                ->get();

            $events = $bookings->map(function ($b) {
                $startTime = $b->start_time ?? '00:00:00';
                $endTime = $b->end_time ?? '23:59:59';
                $start = $b->booking_date . 'T' . $startTime;
                $end = $b->booking_date . 'T' . $endTime;

                return [
                    'id' => $b->book_id,
                    // Only show learner name on calendar
                    'title' => $b->learner->name ?? 'Learner',
                    'start' => $start,
                    'end' => $end,
                    'description' => $b->session_duration,
                    'tutor_status' => $b->tutor_status,
                    'booking_status' => $b->booking_status,
                ];
            })->toArray();
        }

        return Inertia::render('Tutor/Dashboard', [
            'events' => $events,
        ]);
    }
}
