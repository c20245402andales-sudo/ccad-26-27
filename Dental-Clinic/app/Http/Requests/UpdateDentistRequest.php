<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDentistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $dentist = $this->route('dentist');

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
                Rule::unique('dentists', 'dentist_license')->ignore($dentist),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'dentist_name.required' => 'Please enter the dentist name.',
            'dentist_name.max' => 'The dentist name cannot exceed 150 characters.',
            'dentist_license.required' => 'Please enter the dentist license number.',
            'dentist_license.unique' => 'This license number is already assigned to another dentist.',
            'dentist_license.max' => 'The license number cannot exceed 50 characters.',
        ];
    }
}
