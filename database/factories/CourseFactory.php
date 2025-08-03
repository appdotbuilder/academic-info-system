<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Course>
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = [
            'CS' => 'Computer Science',
            'BUS' => 'Business Administration',
            'PSY' => 'Psychology',
            'ENG' => 'Engineering',
            'MATH' => 'Mathematics',
            'ENGL' => 'English',
            'BIO' => 'Natural Sciences',
            'SOC' => 'Social Sciences',
        ];

        $deptCode = $this->faker->randomElement(array_keys($departments));
        $courseNumber = $this->faker->numberBetween(100, 499);

        return [
            'course_code' => $deptCode . $courseNumber,
            'name' => $this->faker->sentence(3, false),
            'description' => $this->faker->optional()->paragraph(),
            'credits' => $this->faker->numberBetween(1, 4),
            'department' => $departments[$deptCode],
            'year_level' => $this->faker->numberBetween(1, 4),
            'prerequisites' => $this->faker->optional(0.3)->passthrough(json_encode(['CS101', 'MATH120'])),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the course is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}