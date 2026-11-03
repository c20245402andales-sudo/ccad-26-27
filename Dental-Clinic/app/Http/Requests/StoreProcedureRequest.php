<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProcedureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'procedure_name' => [
                'required',
                'string',
                'max:150',
                'unique:procedures,procedure_name',
            ],
            'procedure_cost' => [
                'required',
                'numeric',
                'min:0',
                'decimal:0,2',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'procedure_name.required' => 'Please enter the procedure name.',
            'procedure_name.unique' => 'This procedure already exists.',
            'procedure_name.max' => 'The procedure name cannot exceed 150 characters.',
            'procedure_cost.required' => 'Please enter the procedure cost.',
            'procedure_cost.numeric' => 'The procedure cost must be a number.',
            'procedure_cost.min' => 'The procedure cost cannot be negative.',
            'procedure_cost.decimal' => 'The procedure cost can have at most two decimal places.',
        ];
    }
}
