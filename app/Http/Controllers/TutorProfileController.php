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
        ]);

        $tutor = $request->user()->tutor;

        if ($request->hasFile('photo')) {
            if ($tutor->photo) {
                Storage::disk('public')->delete($tutor->photo);
            }

            $validated['photo'] = $request->file('photo')
                ->store('tutors', 'public');
        }

        $tutor->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }


}
