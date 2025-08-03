<?php

namespace Database\Factories;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Enrollment>
     */
    protected $model = Enrollment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(),
            'schedule_id' => Schedule::factory(),
            'semester' => $this->faker->randomElement(['Fall 2024', 'Spring 2025', 'Summer 2024']),
            'enrolled_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'status' => $this->faker->randomElement(['enrolled', 'dropped', 'completed']),
        ];
    }

    /**
     * Indicate that the enrollment is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'enrolled',
        ]);
    }
}