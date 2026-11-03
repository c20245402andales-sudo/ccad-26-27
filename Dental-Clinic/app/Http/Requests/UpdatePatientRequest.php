<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $patient = $this->route('patient');

        return [
            'patient_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('patients', 'patient_code')->ignore($patient),
            ],
            'patient_name' => [
                'required',
                'string',
                'max:150',
            ],
            'patient_contact' => [
                'required',
                'string',
                'max:20',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'patient_code.required' => 'Please enter the patient code.',
            'patient_code.unique' => 'This patient code is already used by another patient.',
            'patient_code.max' => 'The patient code cannot exceed 50 characters.',
            'patient_name.required' => 'Please enter the patient full name.',
            'patient_name.max' => 'The patient name cannot exceed 150 characters.',
            'patient_contact.required' => 'Please enter the patient contact number.',
            'patient_contact.max' => 'The contact number cannot exceed 20 characters.',
        ];
    }
}
