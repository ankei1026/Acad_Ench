<?php

namespace App\Http\Controllers;

use App\Models\TutorApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminTutorFilesController extends Controller
{
    public function index()
    {
        $applications = TutorApplication::all()
            ->map(fn($app) => [
                'id' => $app->id,
                'full_name' => $app->full_name,
                'email' => $app->email,
                'subject' => $app->subject,
                'document_path' => $app->document_path,
                'status' => $app->status,
                'created_at' => $app->created_at,
            ])
            ->toArray();

        return Inertia::render('Admin/TutorFiles', [
            'applications' => $applications,
        ]);
    }

    public function approve($id)
    {
        try {
            $application = TutorApplication::findOrFail($id);
            $application->update(['status' => 'approved']);

            return back()->with('success', "Application from {$application->full_name} has been approved successfully!");
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to approve application');
        }
    }

    public function reject($id)
    {
        try {
            $application = TutorApplication::findOrFail($id);
            $application->update(['status' => 'rejected']);

            return back()->with('error', "Application from {$application->full_name} has been rejected.");
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to reject application');
        }
    }

    public function downloadDocument($id)
    {
        try {
            $application = TutorApplication::findOrFail($id);

            if (!$application->document_path) {
                return back()->with('error', 'No document found');
            }

            return Storage::disk('public')->download($application->document_path);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to download document');
        }
    }
}
