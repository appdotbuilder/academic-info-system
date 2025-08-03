<?php

namespace Database\Factories;

use App\Models\Lecturer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecturer>
 */
class LecturerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Lecturer>
     */
    protected $model = Lecturer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lecturer_id' => 'L' . str_pad((string)$this->faker->unique()->numberBetween(100, 999), 3, '0', STR_PAD_LEFT),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
            'department' => $this->faker->randomElement([
                'Computer Science',
                'Business Administration',
                'Psychology',
                'Engineering',
                'Mathematics',
                'English',
                'Natural Sciences',
                'Social Sciences',
            ]),
            'title' => $this->faker->optional()->randomElement(['Dr.', 'Prof.', 'Mr.', 'Ms.']),
            'specialization' => $this->faker->optional()->sentence(3),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the lecturer is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}