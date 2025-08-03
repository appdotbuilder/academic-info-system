<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use App\Models\Enrollment;
use App\Models\Grade;
use Inertia\Inertia;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grades = Grade::with(['enrollment.student', 'enrollment.schedule.course'])
            ->latest('graded_at')
            ->paginate(10);
        
        return Inertia::render('grades/index', [
            'grades' => $grades
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $enrollments = Enrollment::with(['student', 'schedule.course'])
            ->active()
            ->get();
        
        return Inertia::render('grades/create', [
            'enrollments' => $enrollments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGradeRequest $request)
    {
        $grade = Grade::create($request->validated());

        return redirect()->route('grades.show', $grade)
            ->with('success', 'Grade created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Grade $grade)
    {
        $grade->load(['enrollment.student', 'enrollment.schedule.course', 'enrollment.schedule.lecturer']);
        
        return Inertia::render('grades/show', [
            'grade' => $grade
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grade $grade)
    {
        $grade->load(['enrollment.student', 'enrollment.schedule.course']);
        
        return Inertia::render('grades/edit', [
            'grade' => $grade
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradeRequest $request, Grade $grade)
    {
        $grade->update($request->validated());

        return redirect()->route('grades.show', $grade)
            ->with('success', 'Grade updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();

        return redirect()->route('grades.index')
            ->with('success', 'Grade deleted successfully.');
    }
}