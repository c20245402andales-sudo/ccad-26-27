<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    protected $fillable = [
        'patient_code',
        'patient_name',
        'patient_contact',
    ];

    public function appointments(): HasMany
    {
        return $this->hasMany(DentalAppointment::class);
    }
}