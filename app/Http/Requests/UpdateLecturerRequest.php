<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLecturerRequest extends FormRequest
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
            'lecturer_id' => 'required|string|unique:lecturers,lecturer_id,' . $this->route('lecturer')->id . '|max:20',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:lecturers,email,' . $this->route('lecturer')->id,
            'phone' => 'nullable|string|max:20',
            'department' => 'required|string|max:255',
            'title' => 'nullable|string|max:50',
            'specialization' => 'nullable|string',
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
            'lecturer_id.required' => 'Lecturer ID is required.',
            'lecturer_id.unique' => 'This lecturer ID is already taken.',
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered to another lecturer.',
            'department.required' => 'Department is required.',
        ];
    }
}