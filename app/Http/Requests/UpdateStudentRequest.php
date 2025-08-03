<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'student_id' => 'required|string|unique:students,student_id,' . $this->route('student')->id . '|max:20',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $this->route('student')->id,
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'required|date|before:today',
            'address' => 'nullable|string|max:500',
            'major' => 'nullable|string|max:255',
            'year_level' => 'required|integer|between:1,4',
            'status' => 'required|in:active,inactive,graduated,suspended',
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
            'student_id.required' => 'Student ID is required.',
            'student_id.unique' => 'This student ID is already taken.',
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered to another student.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'year_level.required' => 'Year level is required.',
            'year_level.between' => 'Year level must be between 1 and 4.',
        ];
    }
}