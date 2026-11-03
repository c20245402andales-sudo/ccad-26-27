<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DentalAppointment extends Model
{
    protected $fillable = [
        'patient_id',
        'dentist_id',
        'scheduled_datetime',
        'payment_status',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_datetime' => 'datetime',
        ];
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function dentist(): BelongsTo
    {
        return $this->belongsTo(Dentist::class);
    }

    public function procedureEntries(): HasMany
    {
        return $this->hasMany(DentalAppointmentProcedure::class);
    }

    public function procedures(): BelongsToMany
    {
        return $this->belongsToMany(
            Procedure::class,
            'dental_appointment_procedure'
        )->withPivot('tooth_number', 'unit_cost')
         ->withTimestamps();
    }
}
