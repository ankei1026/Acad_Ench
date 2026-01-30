<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRevenueController extends Controller
{
    public function index()
    {
        $paidBookings = \App\Models\Booking::with('receipt', 'tutor.user', 'learner')
            ->where('booking_status', 'paid')
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'date' => $booking->created_at->format('M d, Y'),
                    'tutor' => $booking->tutor?->user?->name,
                    'learner' => $booking->learner?->name,
                    'amount' => $booking->amount,
                    // Convert Laravel storage path to public URL
                    'receipt_image' => $booking->receipt
                        ? \Illuminate\Support\Facades\Storage::url($booking->receipt->image_path)
                        : null,
                ];
            });

        return Inertia::render('Admin/Revenue', [
            'transactions' => $paidBookings,
        ]);
    }
}
