<?php

namespace App\Services;

use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PatientService
{
    public function create(array $data): Patient
    {
        return DB::transaction(function () use ($data) {
            $data = $this->sanitize($data);

            return Patient::create($data);
        });
    }

    public function update(Patient $patient, array $data): Patient
    {
        return DB::transaction(function () use ($patient, $data) {
            $data = $this->sanitize($data);

            $patient->update($data);

            return $patient->refresh();
        });
    }

    public function delete(Patient $patient): void
    {
        DB::transaction(function () use ($patient) {
            if ($patient->appointments()->exists()) {
                throw ValidationException::withMessages([
                    'patient' =>
                        'This patient has existing appointments and cannot be deleted.',
                ]);
            }

            $patient->delete();
        });
    }

    private function sanitize(array $data): array
    {
        $code = trim($data['patient_code']);
        $name = trim(strip_tags($data['patient_name']));
        $contact = trim($data['patient_contact']);

        if ($code === '') {
            throw ValidationException::withMessages([
                'patient_code' => 'The patient code cannot be empty.',
            ]);
        }

        if ($name === '') {
            throw ValidationException::withMessages([
                'patient_name' => 'The patient name cannot be empty.',
            ]);
        }

        if ($contact === '') {
            throw ValidationException::withMessages([
                'patient_contact' => 'The patient contact cannot be empty.',
            ]);
        }

        return [
            'patient_code' => $code,
            'patient_name' => $name,
            'patient_contact' => $contact,
        ];
    }
}
