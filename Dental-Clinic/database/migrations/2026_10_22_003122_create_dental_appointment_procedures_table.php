
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dental_appointment_procedure', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dental_appointment_id')
                ->constrained('dental_appointments')
                ->cascadeOnDelete();

            $table->foreignId('procedure_id')
                ->constrained('procedures')
                ->restrictOnDelete();

            $table->unsignedTinyInteger('tooth_number');
            $table->decimal('unit_cost', 10, 2);
            $table->timestamps();

            $table->unique(
                ['dental_appointment_id', 'procedure_id', 'tooth_number'],
                'appointment_procedure_tooth_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dental_appointment_procedure');
    }
};
