<?php

namespace App\Http\Controllers;

use App\Models\Procedure;
use App\Http\Requests\StoreProcedureRequest;
use App\Http\Requests\UpdateProcedureRequest;
use App\Services\ProcedureService;

class ProcedureController extends Controller
{
    public function index()
    {
        return Procedure::with([
            'appointmentEntries.appointment',
        ])
            ->withCount('appointmentEntries')
            ->orderBy('procedure_name')
            ->paginate(10);
    }

    public function create()
    {
        return response()->json([
            'message' => 'Submit procedure_name and procedure_cost to create a procedure.',
        ]);
    }

    public function store(
        StoreProcedureRequest $request,
        ProcedureService $service
    ) {
        $procedure = $service->create($request->validated());

        return response()->json([
            'message' => 'Procedure created successfully.',
            'data' => $procedure,
        ], 201);
    }

    public function show(Procedure $procedure)
    {
        return $procedure->load('appointmentEntries.appointment');
    }

    public function edit(Procedure $procedure)
    {
        return response()->json($procedure);
    }

    public function update(
        UpdateProcedureRequest $request,
        Procedure $procedure,
        ProcedureService $service
    ) {
        $updatedProcedure = $service->update(
            $procedure,
            $request->validated()
        );

        return response()->json([
            'message' => 'Procedure updated successfully.',
            'data' => $updatedProcedure,
        ]);
    }

    public function destroy(
        Procedure $procedure,
        ProcedureService $service
    ) {
        $service->delete($procedure);

        return response()->json([
            'message' => 'Procedure deleted successfully.',
        ]);
    }
}
