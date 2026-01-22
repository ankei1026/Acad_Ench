<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorApplicationController extends Controller
{
    public function index() {
        return Inertia::render('Tutor');
    }
}
