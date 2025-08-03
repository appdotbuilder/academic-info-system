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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code')->unique()->comment('Course code like CS101');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('credits')->default(3);
            $table->string('department');
            $table->integer('year_level')->comment('Required year level to take this course');
            $table->text('prerequisites')->nullable()->comment('JSON array of prerequisite course IDs');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('course_code');
            $table->index('department');
            $table->index('year_level');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};