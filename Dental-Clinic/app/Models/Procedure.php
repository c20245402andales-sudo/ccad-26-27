<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Procedure extends Model
{
    protected $fillable = [
        'procedure_name',
        'procedure_cost',
    ];

    protected function casts(): array
    {
        return [
            'procedure_cost' => 'decimal:2',
        ];
    }

    public function appointmentEntries(): HasMany
    {
        return $this->hasMany(DentalAppointmentProcedure::class);
    }

    public function appointments(): BelongsToMany
    {
        return $this->belongsToMany(
            DentalAppointment::class,
            'dental_appointment_procedure'
        )->withPivot('tooth_number', 'unit_cost')
         ->withTimestamps();
    }
}
