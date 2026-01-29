<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TutorLecturesController extends Controller
{
    public function index()
    {
        return inertia('Tutor/Lectures');
    }
}
