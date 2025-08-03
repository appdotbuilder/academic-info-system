<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Grade;
use App\Models\Lecturer;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AcademicSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@academichub.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create lecturers
        $lecturers = Lecturer::factory(10)->active()->create();
        
        // Create lecturer users
        foreach ($lecturers as $lecturer) {
            User::create([
                'name' => $lecturer->full_name,
                'email' => 'lecturer' . $lecturer->id . '@academichub.com',
                'password' => Hash::make('password'),
                'role' => 'lecturer',
                'lecturer_id' => $lecturer->id,
                'email_verified_at' => now(),
            ]);
        }

        // Create courses
        $courses = Course::factory(20)->active()->create();

        // Create students
        $students = Student::factory(50)->active()->create();
        
        // Create student users for first 10 students
        foreach ($students->take(10) as $student) {
            User::create([
                'name' => $student->full_name,
                'email' => 'student' . $student->id . '@academichub.com',
                'password' => Hash::make('password'),
                'role' => 'student',
                'student_id' => $student->id,
                'email_verified_at' => now(),
            ]);
        }

        // Create schedules
        $schedules = [];
        foreach ($courses as $course) {
            $schedule = Schedule::factory()->create([
                'course_id' => $course->id,
                'lecturer_id' => $lecturers->random()->id,
                'status' => 'active',
            ]);
            $schedules[] = $schedule;
        }

        // Create enrollments
        $enrollments = [];
        foreach ($students as $student) {
            // Each student enrolls in 3-6 courses
            $numCourses = random_int(3, 6);
            $studentSchedules = collect($schedules)->random($numCourses);
            
            foreach ($studentSchedules as $schedule) {
                $enrollment = Enrollment::factory()->create([
                    'student_id' => $student->id,
                    'schedule_id' => $schedule->id,
                    'semester' => $schedule->semester,
                    'status' => 'enrolled',
                ]);
                $enrollments[] = $enrollment;
            }
        }

        // Create grades
        foreach ($enrollments as $enrollment) {
            // Create 2-4 grades per enrollment
            $numGrades = random_int(2, 4);
            Grade::factory($numGrades)->create([
                'enrollment_id' => $enrollment->id,
            ]);
        }

        $this->command->info('Academic system seeded successfully!');
        $this->command->info('Admin: admin@academichub.com / password');
        $this->command->info('Lecturers: lecturer1@academichub.com to lecturer10@academichub.com / password');
        $this->command->info('Students: student1@academichub.com to student10@academichub.com / password');
    }
}