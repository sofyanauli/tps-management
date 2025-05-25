<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('polling_stations', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->string('name');
            $table->string('address');
            $table->string('village');
            $table->string('district');
            $table->string('city');
            $table->string('province');
            $table->integer('total_voters')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('polling_stations');
    }
};