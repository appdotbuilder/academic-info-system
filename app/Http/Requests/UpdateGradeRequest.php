<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGradeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'enrollment_id' => 'required|exists:enrollments,id',
            'grade_type' => 'required|string|max:50',
            'points_earned' => 'nullable|numeric|min:0',
            'points_possible' => 'required|numeric|min:0.01',
            'letter_grade' => 'nullable|string|max:2',
            'grade_percentage' => 'nullable|numeric|between:0,100',
            'comments' => 'nullable|string',
            'graded_at' => 'nullable|date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'enrollment_id.required' => 'Enrollment is required.',
            'enrollment_id.exists' => 'Selected enrollment does not exist.',
            'grade_type.required' => 'Grade type is required.',
            'points_possible.required' => 'Points possible is required.',
            'points_possible.min' => 'Points possible must be greater than 0.',
            'points_earned.min' => 'Points earned cannot be negative.',
            'grade_percentage.between' => 'Grade percentage must be between 0 and 100.',
        ];
    }
}