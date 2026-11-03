<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dentist extends Model
{
    protected $fillable = [
        'dentist_name',
        'dentist_license',
    ];

    public function appointments(): HasMany
    {
        return $this->hasMany(DentalAppointment::class);
    }
}
