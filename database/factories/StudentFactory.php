<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Student>
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => 'S' . str_pad((string)$this->faker->unique()->numberBetween(1000, 9999), 4, '0', STR_PAD_LEFT),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
            'date_of_birth' => $this->faker->dateTimeBetween('-30 years', '-18 years')->format('Y-m-d'),
            'address' => $this->faker->optional()->address(),
            'major' => $this->faker->randomElement([
                'Computer Science',
                'Business Administration',
                'Psychology',
                'Engineering',
                'Mathematics',
                'English Literature',
                'Biology',
                'Chemistry',
                'Physics',
                'Economics',
            ]),
            'year_level' => $this->faker->numberBetween(1, 4),
            'status' => $this->faker->randomElement(['active', 'inactive', 'graduated', 'suspended']),
        ];
    }

    /**
     * Indicate that the student is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the student is graduated.
     */
    public function graduated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'graduated',
            'year_level' => 4,
        ]);
    }
}