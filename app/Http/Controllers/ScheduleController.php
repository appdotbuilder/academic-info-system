<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Models\Course;
use App\Models\Lecturer;
use App\Models\Schedule;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = Schedule::with(['course', 'lecturer', 'enrollments.student'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('schedules/index', [
            'schedules' => $schedules
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $courses = Course::active()->get();
        $lecturers = Lecturer::active()->get();
        
        return Inertia::render('schedules/create', [
            'courses' => $courses,
            'lecturers' => $lecturers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $schedule = Schedule::create($request->validated());

        return redirect()->route('schedules.show', $schedule)
            ->with('success', 'Schedule created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        $schedule->load(['course', 'lecturer', 'enrollments.student']);
        
        return Inertia::render('schedules/show', [
            'schedule' => $schedule
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        $courses = Course::active()->get();
        $lecturers = Lecturer::active()->get();
        
        return Inertia::render('schedules/edit', [
            'schedule' => $schedule,
            'courses' => $courses,
            'lecturers' => $lecturers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        $schedule->update($request->validated());

        return redirect()->route('schedules.show', $schedule)
            ->with('success', 'Schedule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return redirect()->route('schedules.index')
            ->with('success', 'Schedule deleted successfully.');
    }
}