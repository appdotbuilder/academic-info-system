<?php

namespace Database\Factories;

use App\Models\Schedule;
use App\Models\Course;
use App\Models\Lecturer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Schedule>
     */
    protected $model = Schedule::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = $this->faker->numberBetween(8, 16);
        $duration = $this->faker->randomElement([1, 2, 3]); // 1-3 hour classes
        
        return [
            'course_id' => Course::factory(),
            'lecturer_id' => Lecturer::factory(),
            'semester' => $this->faker->randomElement(['Fall 2024', 'Spring 2025', 'Summer 2024']),
            'section' => $this->faker->randomElement(['A', 'B', 'C']),
            'day_of_week' => $this->faker->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $startHour + $duration),
            'room' => $this->faker->optional()->randomElement(['A101', 'B203', 'C305', 'Lab1', 'Auditorium']),
            'max_students' => $this->faker->numberBetween(20, 50),
            'status' => $this->faker->randomElement(['active', 'cancelled']),
        ];
    }

    /**
     * Indicate that the schedule is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}