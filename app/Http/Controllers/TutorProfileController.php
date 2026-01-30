<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TutorProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load('tutor');

        return inertia('Tutor/Profile', [
            'user' => $user,
            'tutor' => $user->tutor,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'specializations' => 'nullable|string',
            'rate_per_hour' => 'required|numeric|min:0',
            'bio' => 'nullable|string|max:60',
            'photo' => 'nullable|image|max:2048',
            'mop' => 'required|string|max:10',
            'number' => 'required|string|max:11',
            'portfolio_link' => 'nullable|string|max:255',
        ]);

        $tutor = $request->user()->tutor;

        if ($request->hasFile('photo')) {
            if ($tutor->photo) {
                Storage::disk('public')->delete($tutor->photo);
            }

            $validated['photo'] = $request->file('photo')
                ->store('tutors', 'public');
        }

        // Normalize portfolio link: prepend https:// if scheme is missing
        if (!empty($validated['portfolio_link'] ?? null)) {
            $link = $validated['portfolio_link'];
            if (!preg_match('#^https?://#i', $link)) {
                $validated['portfolio_link'] = 'https://' . $link;
            }
        }

        $tutor->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }


}
