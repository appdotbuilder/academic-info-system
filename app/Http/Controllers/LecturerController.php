<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLecturerRequest;
use App\Http\Requests\UpdateLecturerRequest;
use App\Models\Lecturer;
use Inertia\Inertia;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lecturers = Lecturer::with(['schedules.course'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('lecturers/index', [
            'lecturers' => $lecturers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('lecturers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLecturerRequest $request)
    {
        $lecturer = Lecturer::create($request->validated());

        return redirect()->route('lecturers.show', $lecturer)
            ->with('success', 'Lecturer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lecturer $lecturer)
    {
        $lecturer->load(['schedules.course', 'schedules.enrollments.student']);
        
        return Inertia::render('lecturers/show', [
            'lecturer' => $lecturer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lecturer $lecturer)
    {
        return Inertia::render('lecturers/edit', [
            'lecturer' => $lecturer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLecturerRequest $request, Lecturer $lecturer)
    {
        $lecturer->update($request->validated());

        return redirect()->route('lecturers.show', $lecturer)
            ->with('success', 'Lecturer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lecturer $lecturer)
    {
        $lecturer->delete();

        return redirect()->route('lecturers.index')
            ->with('success', 'Lecturer deleted successfully.');
    }
}