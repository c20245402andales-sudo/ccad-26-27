<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDentalAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patient_id' => [
                'required',
                'integer',
                'exists:patients,id',
            ],
            'dentist_id' => [
                'required',
                'integer',
                'exists:dentists,id',
            ],
            'scheduled_datetime' => [
                'required',
                'date',
                'after:now',
            ],
            'payment_status' => [
                'required',
                'in:unpaid,paid,partial',
            ],
            'procedures' => [
                'required',
                'array',
                'min:1',
            ],
            'procedures.*.procedure_id' => [
                'required',
                'integer',
                'exists:procedures,id',
            ],
            'procedures.*.tooth_number' => [
                'required',
                'integer',
                'between:1,32',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'patient_id.required' => 'Please select a patient.',
            'patient_id.exists' => 'The selected patient does not exist.',
            'dentist_id.required' => 'Please select a dentist.',
            'dentist_id.exists' => 'The selected dentist does not exist.',
            'scheduled_datetime.required' => 'Please provide an appointment date and time.',
            'scheduled_datetime.date' => 'Please enter a valid appointment date and time.',
            'scheduled_datetime.after' => 'The appointment must be scheduled in the future.',
            'payment_status.required' => 'Please select a payment status.',
            'payment_status.in' => 'Choose unpaid, paid, or partial.',
            'procedures.required' => 'Please add at least one procedure.',
            'procedures.array' => 'The procedures must be submitted as a list.',
            'procedures.min' => 'An appointment must have at least one procedure.',
            'procedures.*.procedure_id.required' => 'Please select a procedure.',
            'procedures.*.procedure_id.exists' => 'A selected procedure does not exist.',
            'procedures.*.tooth_number.required' => 'Please enter the tooth number.',
            'procedures.*.tooth_number.between' => 'Tooth number must be between 1 and 32.',
        ];
    }
}
