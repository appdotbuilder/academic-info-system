<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lecturer;
use App\Models\Schedule;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the academic dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get basic statistics
        $stats = [
            'total_students' => Student::count(),
            'total_lecturers' => Lecturer::count(),
            'total_courses' => Course::count(),
            'total_schedules' => Schedule::count(),
            'active_enrollments' => Enrollment::where('status', 'enrolled')->count(),
        ];

        // Get recent activities based on user role
        $recentActivities = [];
        
        if ($user && $user->isAdmin()) {
            // Admin sees all recent activities
            $recentActivities = [
                'recent_students' => Student::with('enrollments.schedule.course')->latest()->take(5)->get(),
                'recent_enrollments' => Enrollment::with(['student', 'schedule.course'])->latest()->take(5)->get(),
                'upcoming_schedules' => Schedule::with(['course', 'lecturer'])
                    ->where('status', 'active')
                    ->take(5)
                    ->get(),
            ];
        } elseif ($user && $user->isStudent() && $user->student) {
            // Student sees their own data
            $student = $user->student;
            $recentActivities = [
                'my_enrollments' => $student->enrollments()
                    ->with(['schedule.course', 'schedule.lecturer', 'grades'])
                    ->where('status', 'enrolled')
                    ->latest()
                    ->get(),
                'my_grades' => $student->enrollments()
                    ->with(['grades', 'schedule.course'])
                    ->whereHas('grades')
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        } elseif ($user && $user->isLecturer() && $user->lecturer) {
            // Lecturer sees their courses and students
            $lecturer = $user->lecturer;
            $recentActivities = [
                'my_schedules' => $lecturer->schedules()
                    ->with(['course', 'enrollments.student'])
                    ->where('status', 'active')
                    ->latest()
                    ->get(),
                'my_students' => Enrollment::with(['student', 'schedule.course'])
                    ->whereHas('schedule', function ($query) use ($lecturer) {
                        $query->where('lecturer_id', $lecturer->id);
                    })
                    ->where('status', 'enrolled')
                    ->latest()
                    ->take(10)
                    ->get(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'student_id' => $user->student_id,
                'lecturer_id' => $user->lecturer_id,
            ] : null,
        ]);
    }
}