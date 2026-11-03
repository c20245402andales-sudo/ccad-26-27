<?php

namespace App\Services;

use App\Models\Procedure;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ProcedureService
{
    public function create(array $data): Procedure
    {
        return DB::transaction(function () use ($data) {
            return Procedure::create($this->sanitize($data));
        });
    }

    public function update(Procedure $procedure, array $data): Procedure
    {
        return DB::transaction(function () use ($procedure, $data) {
            $procedure->update($this->sanitize($data));

            return $procedure->refresh();
        });
    }

    public function delete(Procedure $procedure): void
    {
        DB::transaction(function () use ($procedure) {
            if ($procedure->appointmentEntries()->exists()) {
                throw ValidationException::withMessages([
                    'procedure' =>
                        'This procedure is being used by an appointment and cannot be deleted.',
                ]);
            }

            $procedure->delete();
        });
    }

    private function sanitize(array $data): array
    {
        $name = trim(strip_tags($data['procedure_name']));

        if ($name === '') {
            throw ValidationException::withMessages([
                'procedure_name' => 'The procedure name cannot be empty.',
            ]);
        }

        $cost = $data['procedure_cost'];

        if (!is_numeric($cost) || $cost < 0) {
            throw ValidationException::withMessages([
                'procedure_cost' =>
                    'The procedure cost must be a valid non-negative number.',
            ]);
        }

        return [
            'procedure_name' => $name,
            'procedure_cost' => round((float) $cost, 2),
        ];
    }
}
