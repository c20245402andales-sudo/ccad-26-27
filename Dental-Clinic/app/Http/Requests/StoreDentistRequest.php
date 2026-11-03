<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDentistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dentist_name' => [
                'required',
                'string',
                'max:150',
            ],
            'dentist_license' => [
                'required',
                'string',
                'max:50',
                'unique:dentists,dentist_license',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'dentist_name.required' => 'Please enter the dentist name.',
            'dentist_name.max' => 'The dentist name cannot exceed 150 characters.',
            'dentist_license.required' => 'Please enter the dentist license number.',
            'dentist_license.unique' => 'This dentist license number is already registered.',
            'dentist_license.max' => 'The license number cannot exceed 50 characters.',
        ];
    }
}
