<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - role-aware
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Academic Management Routes (Admin access)
    Route::middleware(['auth'])->group(function () {
        // Student Management
        Route::resource('students', StudentController::class);
        
        // Lecturer Management
        Route::resource('lecturers', LecturerController::class);
        
        // Course Management
        Route::resource('courses', CourseController::class);
        
        // Schedule Management
        Route::resource('schedules', ScheduleController::class);
        
        // Grade Management
        Route::resource('grades', GradeController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';