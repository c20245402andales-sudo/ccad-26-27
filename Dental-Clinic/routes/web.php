
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PatientController;
use App\Http\Controllers\DentistController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\DentalAppointmentController;

use App\Models\Patient;
use App\Models\Dentist;
use App\Models\Procedure;
use App\Models\DentalAppointment;

/*
|--------------------------------------------------------------------------
| Welcome Page
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

/*
|--------------------------------------------------------------------------
| Resource Routes
|--------------------------------------------------------------------------
*/

Route::resource('patients', PatientController::class);

Route::resource('dentists', DentistController::class);

Route::resource('procedures', ProcedureController::class);

Route::resource('dental-appointments', DentalAppointmentController::class);

/*
|--------------------------------------------------------------------------
| Authenticated Dashboard
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {

        return Inertia::render('dashboard', [

            // Dashboard Statistics
            'statistics' => [
                'patients' => Patient::count(),
                'dentists' => Dentist::count(),
                'procedures' => Procedure::count(),
                'appointments' => DentalAppointment::count(),
            ],

            // Recent Appointments
            'recentAppointments' => DentalAppointment::with([
                'patient',
                'dentist',
                'procedureEntries.procedure',
            ])
                ->orderByDesc('scheduled_datetime')
                ->limit(5)
                ->get()
                ->map(fn ($appointment) => [
                    'id' => $appointment->id,

                    'patient' => $appointment->patient?->patient_name ?? 'Unknown',

                    'dentist' => $appointment->dentist?->dentist_name ?? 'Unknown',

                    'scheduled_datetime' => $appointment->scheduled_datetime?->format('M d, Y h:i A'),

                    'payment_status' => $appointment->payment_status,

                    'procedures' => $appointment->procedureEntries
                        ->map(fn ($entry) => $entry->procedure?->procedure_name)
                        ->filter()
                        ->values(),
                ]),
        ]);

    })->name('dashboard');

});

/*
|--------------------------------------------------------------------------
| Settings and Authentication Routes
|--------------------------------------------------------------------------
*/

require __DIR__.'/settings.php';

require __DIR__.'/auth.php';
