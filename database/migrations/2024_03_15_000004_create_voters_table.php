<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('polling_station_id')->constrained()->cascadeOnDelete();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->foreignId('volunteer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('nik')->unique();
            $table->string('phone')->nullable();
            $table->string('address');
            $table->date('birth_date');
            $table->enum('category', ['X1', 'X2', 'X3', 'X4', 'X5', 'X6']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voters');
    }
};