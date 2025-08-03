<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\Enrollment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grade>
 */
class GradeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Grade>
     */
    protected $model = Grade::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pointsPossible = $this->faker->randomFloat(2, 50, 100);
        $pointsEarned = $this->faker->randomFloat(2, 0, $pointsPossible);
        $percentage = ($pointsEarned / $pointsPossible) * 100;
        
        // Calculate letter grade
        $letterGrade = 'F';
        if ($percentage >= 90) $letterGrade = 'A';
        elseif ($percentage >= 80) $letterGrade = 'B';
        elseif ($percentage >= 70) $letterGrade = 'C';
        elseif ($percentage >= 60) $letterGrade = 'D';

        return [
            'enrollment_id' => Enrollment::factory(),
            'grade_type' => $this->faker->randomElement(['midterm', 'final', 'assignment', 'quiz', 'project']),
            'points_earned' => $pointsEarned,
            'points_possible' => $pointsPossible,
            'letter_grade' => $letterGrade,
            'grade_percentage' => round($percentage, 2),
            'comments' => $this->faker->optional()->sentence(),
            'graded_at' => $this->faker->optional()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}