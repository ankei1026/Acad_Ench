<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReceiptController extends Controller
{
    public function store(Request $request, $book_id)
    {
        $request->validate([
            'reference' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'photo' => 'nullable|image|max:2048',
        ]);

        $booking = Booking::where('book_id', $book_id)->firstOrFail();

        // Only the booking owner can pay
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        // Only allow payment when tutor has accepted and booking is pending
        if ($booking->tutor_status !== 'accept' || $booking->booking_status !== 'pending') {
            return back()->with('error', 'Payment not allowed for this booking.');
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('receipts', 'public');
        }

        $receipt = Receipt::create([
            'book_id' => $booking->book_id,
            'reference' => $request->reference,
            'amount' => $request->amount,
            'photo' => $photoPath,
        ]);

        // Update booking status to paid
        $booking->booking_status = 'paid';
        $booking->save();

        return back()->with('success', 'Payment submitted successfully.');
    }
}
