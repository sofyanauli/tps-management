<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('number');
            $table->enum('level', ['dpr_ri', 'dprd_province', 'dprd_city']);
            $table->string('party');
            $table->string('electoral_district');
            $table->text('profile')->nullable();
            $table->string('photo')->nullable();
            $table->string('qr_code')->nullable();
            $table->integer('visit_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};