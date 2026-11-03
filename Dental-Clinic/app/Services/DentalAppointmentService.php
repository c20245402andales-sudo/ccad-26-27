<?php

namespace App\Services;

use App\Models\DentalAppointment;
use App\Models\Procedure;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class DentalAppointmentService
{
    /**
     * Create a new dental appointment.
     */
    public function create(array $data): DentalAppointment
    {
        return DB::transaction(function () use ($data) {

            $this->checkDentistSchedule(
                $data['dentist_id'],
                $data['scheduled_datetime']
            );

            $appointment = DentalAppointment::create([
                'patient_id' => $data['patient_id'],
                'dentist_id' => $data['dentist_id'],
                'scheduled_datetime' => $data['scheduled_datetime'],
                'payment_status' => $data['payment_status'] ?? 'unpaid',
            ]);

            $this->syncProcedures(
                $appointment,
                $data['procedures']
            );

            return $appointment->load([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ]);
        });
    }

    /**
     * Update an existing dental appointment.
     */
    public function update(
        DentalAppointment $appointment,
        array $data
    ): DentalAppointment {
        return DB::transaction(function () use ($appointment, $data) {

            $this->checkDentistSchedule(
                $data['dentist_id'],
                $data['scheduled_datetime'],
                $appointment->id
            );

            $appointment->update([
                'patient_id' => $data['patient_id'],
                'dentist_id' => $data['dentist_id'],
                'scheduled_datetime' => $data['scheduled_datetime'],
                'payment_status' => $data['payment_status'],
            ]);

            $this->syncProcedures(
                $appointment,
                $data['procedures']
            );

            return $appointment->load([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ]);
        });
    }

    /**
     * Delete an existing dental appointment.
     */
    public function delete(DentalAppointment $appointment): void
    {
        DB::transaction(function () use ($appointment) {

            $appointment->procedureEntries()->delete();

            $appointment->delete();
        });
    }

    /**
     * Check whether the dentist already has an appointment
     * at the requested date and time.
     */
    private function checkDentistSchedule(
        int $dentistId,
        string $scheduledDatetime,
        ?int $ignoreId = null
    ): void {
        $query = DentalAppointment::where(
            'dentist_id',
            $dentistId
        )->where(
            'scheduled_datetime',
            $scheduledDatetime
        );

        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        if ($query->exists()) {
            throw ValidationException::withMessages([
                'scheduled_datetime' =>
                    'This dentist already has an appointment at that time.',
            ]);
        }
    }

    /**
     * Synchronize the procedures associated with an appointment.
     */
    private function syncProcedures(
        DentalAppointment $appointment,
        array $procedures
    ): void {
        $appointment->procedureEntries()->delete();

        foreach ($procedures as $item) {

            $procedure = Procedure::findOrFail(
                $item['procedure_id']
            );

            $appointment->procedureEntries()->create([
                'procedure_id' => $procedure->id,
                'tooth_number' => $item['tooth_number'],
                'unit_cost' => $procedure->procedure_cost,
            ]);
        }
    }
}
