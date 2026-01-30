<?php

namespace App\Http\Controllers;

use App\Models\TutorApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Tutor');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'documents' => ['nullable', 'file', 'mimes:pdf', 'max:5120'], // 5MB max
        ]);

        $documentPath = null;

        if ($request->hasFile('documents')) {
            $documentPath = $request->file('documents')->store('tutor-applications', 'public');
        }

        TutorApplication::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'document_path' => $documentPath,
            'status' => 'pending',
        ]);

        return redirect()->route('tutor.index')->with('success', 'Your tutor application has been submitted! We will review it within 2-7 days.');
    }
}

