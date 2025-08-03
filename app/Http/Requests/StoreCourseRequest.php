<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'course_code' => 'required|string|unique:courses,course_code|max:20',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'credits' => 'required|integer|between:1,6',
            'department' => 'required|string|max:255',
            'year_level' => 'required|integer|between:1,4',
            'prerequisites' => 'nullable|json',
            'status' => 'required|in:active,inactive',
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
            'course_code.required' => 'Course code is required.',
            'course_code.unique' => 'This course code is already taken.',
            'name.required' => 'Course name is required.',
            'credits.required' => 'Credits are required.',
            'credits.between' => 'Credits must be between 1 and 6.',
            'department.required' => 'Department is required.',
            'year_level.required' => 'Year level is required.',
            'year_level.between' => 'Year level must be between 1 and 4.',
            'prerequisites.json' => 'Prerequisites must be in valid JSON format.',
        ];
    }
}