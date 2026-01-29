<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminLearnerController;
use App\Http\Controllers\AdminRevenueController;
use App\Http\Controllers\AdminTutorController;
use App\Http\Controllers\AdminTutorFilesController;
use App\Http\Controllers\DeveloperController;
use App\Http\Controllers\LearnerBookTutorController;
use App\Http\Controllers\LearnerDashboardController;
use App\Http\Controllers\LearnerHomeController;
use App\Http\Controllers\LearnerLecturesController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TutorApplicationController;
use App\Http\Controllers\TutorBookingsController;
use App\Http\Controllers\TutorDashboardController;
use App\Http\Controllers\TutorLecturesController;
use App\Http\Controllers\TutorProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::prefix('authentication')->group(function () {
    Route::get('/login', [SessionController::class, 'index'])->name('authentication.login');
    Route::post('/login', [SessionController::class, 'store']);
    Route::get('/signup', [RegisterController::class, 'index'])->name('authentication.signup');
    Route::post('/signup', [RegisterController::class, 'store']);
});

Route::get('/tutor', [TutorApplicationController::class, 'index'])->name('tutor.index');
Route::get('/developers', [DeveloperController::class, 'index'])->name('developers.index');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/learners', [AdminLearnerController::class, 'index'])->name('admin.learners');
    Route::get('/revenue', [AdminRevenueController::class, 'index'])->name('admin.revenue');
    Route::get('/tutors', [AdminTutorController::class, 'index'])->name('admin.tutors');
    Route::get('/tutor-applications', [AdminTutorFilesController::class, 'index'])->name('admin.tutor-applications');
});

Route::middleware(['auth', 'role:tutor'])->prefix('tutor')->group(function () {
    Route::get('/dashboard', [TutorDashboardController::class, 'index'])->name('tutor.dashboard');
    Route::get('/lectures', [TutorLecturesController::class, 'index'])->name('tutor.lectures');
    Route::get('/bookings', [TutorBookingsController::class, 'index'])->name('tutor.bookings');

    Route::get('/profile', [TutorProfileController::class, 'index'])->name('tutor.profile');
    Route::put('/profile', [TutorProfileController::class, 'update'])
        ->name('tutor.profile.update');
});

Route::middleware(['auth', 'role:learner'])->prefix('learner')->group(function () {
    Route::get('/home', [LearnerHomeController::class, 'index'])->name('learner.home');

    Route::get('/book-tutor', [LearnerBookTutorController::class, 'index'])->name('learner.book-tutor');
    Route::get('book-tutor/tutor/{tutor_id}', [LearnerBookTutorController::class, 'show'])->name('learner.tutors.show');

    Route::get('/lectures', [LearnerLecturesController::class, 'index'])->name('learner.lectures');
});

require __DIR__ . '/settings.php';
