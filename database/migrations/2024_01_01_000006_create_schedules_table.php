<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
            $table->string('semester')->comment('Fall 2024, Spring 2025, etc.');
            $table->string('section')->default('A')->comment('Section identifier');
            $table->string('day_of_week')->comment('Monday, Tuesday, etc.');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room')->nullable();
            $table->integer('max_students')->default(30);
            $table->enum('status', ['active', 'cancelled'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['course_id', 'semester']);
            $table->index(['lecturer_id', 'semester']);
            $table->index(['day_of_week', 'start_time']);
            $table->index('semester');
            $table->unique(['course_id', 'section', 'semester']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};