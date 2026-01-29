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
            ->with(['tutor.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Learner/Home', [
            'bookings' => $bookings,
        ]);
    }
}
