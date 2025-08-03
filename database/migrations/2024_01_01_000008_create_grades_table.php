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
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->string('grade_type')->comment('midterm, final, assignment, quiz, etc.');
            $table->decimal('points_earned', 5, 2)->nullable();
            $table->decimal('points_possible', 5, 2);
            $table->string('letter_grade', 2)->nullable()->comment('A, B+, C, etc.');
            $table->decimal('grade_percentage', 5, 2)->nullable();
            $table->text('comments')->nullable();
            $table->timestamp('graded_at')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('enrollment_id');
            $table->index('grade_type');
            $table->index('graded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};