<?php

namespace App\Services;

use App\Models\Dentist;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class DentistService
{
    public function create(array $data): Dentist
    {
        return DB::transaction(function () use ($data) {
            $data = $this->sanitize($data);

            return Dentist::create($data);
        });
    }

    public function update(Dentist $dentist, array $data): Dentist
    {
        return DB::transaction(function () use ($dentist, $data) {
            $data = $this->sanitize($data);

            $dentist->update($data);

            return $dentist->refresh();
        });
    }

    public function delete(Dentist $dentist): void
    {
        DB::transaction(function () use ($dentist) {
            if ($dentist->appointments()->exists()) {
                throw ValidationException::withMessages([
                    'dentist' =>
                        'This dentist has existing appointments and cannot be deleted.',
                ]);
            }

            $dentist->delete();
        });
    }

    private function sanitize(array $data): array
    {
        $name = trim(strip_tags($data['dentist_name']));
        $license = trim($data['dentist_license']);

        if ($name === '') {
            throw ValidationException::withMessages([
                'dentist_name' => 'The dentist name cannot be empty.',
            ]);
        }

        if ($license === '') {
            throw ValidationException::withMessages([
                'dentist_license' => 'The dentist license cannot be empty.',
            ]);
        }

        return [
            'dentist_name' => $name,
            'dentist_license' => $license,
        ];
    }
}
