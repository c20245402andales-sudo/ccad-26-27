<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DentalAppointmentProcedure extends Model
{
    protected $table = 'dental_appointment_procedure';

    protected $fillable = [
        'dental_appointment_id',
        'procedure_id',
        'tooth_number',
        'unit_cost',
    ];

    protected function casts(): array
    {
        return [
            'tooth_number' => 'integer',
            'unit_cost' => 'decimal:2',
        ];
    }

    public function appointment(): BelongsTo
    {
        return $this->belongsTo(
            DentalAppointment::class,
            'dental_appointment_id'
        );
    }

    public function procedure(): BelongsTo
    {
        return $this->belongsTo(Procedure::class);
    }
}
