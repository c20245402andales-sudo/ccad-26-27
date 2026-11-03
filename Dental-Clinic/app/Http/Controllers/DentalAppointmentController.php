<?php

namespace App\Http\Controllers;

use App\Models\DentalAppointment;
use App\Models\Patient;
use App\Models\Dentist;
use App\Models\Procedure;
use App\Http\Requests\StoreDentalAppointmentRequest;
use App\Http\Requests\UpdateDentalAppointmentRequest;
use App\Services\DentalAppointmentService;
use Illuminate\Http\JsonResponse;

class DentalAppointmentController extends Controller
{
    /**
     * Display all dental appointments.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            DentalAppointment::with([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ])
                ->latest('scheduled_datetime')
                ->paginate(10)
        );
    }

    /**
     * Show the appointment creation form data.
     */
    public function create(): JsonResponse
    {
        return response()->json([
            'patients' => Patient::orderBy('patient_name')->get(),
            'dentists' => Dentist::orderBy('dentist_name')->get(),
            'procedures' => Procedure::orderBy('procedure_name')->get(),
        ]);
    }

    /**
     * Store a new dental appointment.
     */
    public function store(
        StoreDentalAppointmentRequest $request,
        DentalAppointmentService $service
    ): JsonResponse {
        $appointment = $service->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Appointment created successfully.',
            'data' => $appointment,
        ], 201);
    }

    /**
     * Display a specific dental appointment.
     */
    public function show(
        DentalAppointment $dentalAppointment
    ): JsonResponse {
        return response()->json(
            $dentalAppointment->load([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ])
        );
    }

    /**
     * Show the appointment editing form data.
     */
    public function edit(
        DentalAppointment $dentalAppointment
    ): JsonResponse {
        return response()->json([
            'appointment' => $dentalAppointment->load([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ]),
            'patients' => Patient::orderBy('patient_name')->get(),
            'dentists' => Dentist::orderBy('dentist_name')->get(),
            'procedures' => Procedure::orderBy('procedure_name')->get(),
        ]);
    }

    /**
     * Update an existing dental appointment.
     */
    public function update(
        UpdateDentalAppointmentRequest $request,
        DentalAppointment $dentalAppointment,
        DentalAppointmentService $service
    ): JsonResponse {
        $appointment = $service->update(
            $dentalAppointment,
            $request->validated()
        );

        return response()->json([
            'message' => 'Appointment updated successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Delete an existing dental appointment.
     */
    public function destroy(
        DentalAppointment $dentalAppointment,
        DentalAppointmentService $service
    ): JsonResponse {
        $service->delete($dentalAppointment);

        return response()->json([
            'message' => 'Appointment deleted successfully.',
        ]);
    }
}
