import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: 'admin' | 'student' | 'lecturer';
            student_id?: number;
            lecturer_id?: number;
        };
    };
    stats: {
        total_students: number;
        total_lecturers: number;
        total_courses: number;
        total_schedules: number;
        active_enrollments: number;
    };
    recentActivities: {
        recent_students?: Array<{
            id: number;
            first_name: string;
            last_name: string;
            student_id: string;
            major?: string;
            created_at: string;
        }>;
        my_enrollments?: Array<{
            id: number;
            semester: string;
            schedule: {
                course: {
                    name: string;
                    course_code: string;
                };
            };
        }>;
        my_schedules?: Array<{
            id: number;
            day_of_week: string;
            start_time: string;
            end_time: string;
            room?: string;
            course: {
                name: string;
            };
            enrollments: Array<{ id: number }>;
        }>;
    };
    [key: string]: unknown;
}

export default function Dashboard({ auth, stats, recentActivities }: Props) {
    const { user } = auth;

    const getGreeting = () => {
        if (user.role === 'admin') return 'Administrator Dashboard';
        if (user.role === 'student') return 'Student Dashboard';
        if (user.role === 'lecturer') return 'Lecturer Dashboard';
        return 'Dashboard';
    };

    const getRoleIcon = () => {
        if (user.role === 'admin') return '👑';
        if (user.role === 'student') return '🎓';
        if (user.role === 'lecturer') return '👨‍🏫';
        return '📚';
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{getRoleIcon()}</span>
                        <h1 className="text-2xl font-bold">{getGreeting()}</h1>
                    </div>
                    <p className="text-blue-100">Welcome back, {user.name}!</p>
                </div>

                {/* Statistics Cards */}
                {user.role === 'admin' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_students}</p>
                                </div>
                                <div className="text-2xl">👨‍🎓</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Lecturers</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_lecturers}</p>
                                </div>
                                <div className="text-2xl">👩‍🏫</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_courses}</p>
                                </div>
                                <div className="text-2xl">📖</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Schedules</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_schedules}</p>
                                </div>
                                <div className="text-2xl">📅</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Enrollments</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active_enrollments}</p>
                                </div>
                                <div className="text-2xl">📊</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h2>
                    
                    {user.role === 'admin' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link href="/students">
                                <Button variant="outline" className="w-full justify-start h-auto p-4">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">👨‍🎓</div>
                                        <div className="font-medium">Manage Students</div>
                                        <div className="text-sm text-gray-500">Add, edit, and view student records</div>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/lecturers">
                                <Button variant="outline" className="w-full justify-start h-auto p-4">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">👩‍🏫</div>
                                        <div className="font-medium">Manage Lecturers</div>
                                        <div className="text-sm text-gray-500">Faculty profiles and assignments</div>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/courses">
                                <Button variant="outline" className="w-full justify-start h-auto p-4">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">📖</div>
                                        <div className="font-medium">Manage Courses</div>
                                        <div className="text-sm text-gray-500">Course catalog and requirements</div>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/schedules">
                                <Button variant="outline" className="w-full justify-start h-auto p-4">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">📅</div>
                                        <div className="font-medium">Manage Schedules</div>
                                        <div className="text-sm text-gray-500">Class scheduling and rooms</div>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/grades">
                                <Button variant="outline" className="w-full justify-start h-auto p-4">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">📊</div>
                                        <div className="font-medium">Manage Grades</div>
                                        <div className="text-sm text-gray-500">Grade entry and transcripts</div>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/students/create">
                                <Button className="w-full justify-start h-auto p-4 bg-blue-600 hover:bg-blue-700">
                                    <div className="text-left">
                                        <div className="text-xl mb-1">➕</div>
                                        <div className="font-medium">Add New Student</div>
                                        <div className="text-sm text-blue-100">Register a new student</div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    )}

                    {user.role === 'student' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">👤</div>
                                    <div className="font-medium">My Profile</div>
                                    <div className="text-sm text-gray-500">View and update personal information</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📚</div>
                                    <div className="font-medium">My Courses</div>
                                    <div className="text-sm text-gray-500">View enrolled courses</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📊</div>
                                    <div className="font-medium">My Grades</div>
                                    <div className="text-sm text-gray-500">View grades and transcript</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📅</div>
                                    <div className="font-medium">My Schedule</div>
                                    <div className="text-sm text-gray-500">View class schedule</div>
                                </div>
                            </Button>
                        </div>
                    )}

                    {user.role === 'lecturer' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">👤</div>
                                    <div className="font-medium">My Profile</div>
                                    <div className="text-sm text-gray-500">View and update lecturer information</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📚</div>
                                    <div className="font-medium">My Courses</div>
                                    <div className="text-sm text-gray-500">Courses I teach</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">👨‍🎓</div>
                                    <div className="font-medium">My Students</div>
                                    <div className="text-sm text-gray-500">View enrolled students</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📊</div>
                                    <div className="font-medium">Grade Entry</div>
                                    <div className="text-sm text-gray-500">Enter and manage grades</div>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-xl mb-1">📅</div>
                                    <div className="font-medium">My Schedule</div>
                                    <div className="text-sm text-gray-500">View teaching schedule</div>
                                </div>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Recent Activities */}
                {recentActivities && Object.keys(recentActivities).length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Activities</h2>
                        
                        {user.role === 'admin' && recentActivities.recent_students && (
                            <div className="mb-6">
                                <h3 className="text-md font-medium text-gray-700 mb-2">Recently Added Students</h3>
                                <div className="space-y-2">
                                    {recentActivities.recent_students.slice(0, 3).map((student) => (
                                        <div key={student.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                            <div className="text-lg">👨‍🎓</div>
                                            <div className="flex-1">
                                                <p className="font-medium">{student.first_name} {student.last_name}</p>
                                                <p className="text-sm text-gray-500">{student.student_id} • {student.major || 'No major assigned'}</p>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                {new Date(student.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.role === 'student' && recentActivities.my_enrollments && (
                            <div className="mb-6">
                                <h3 className="text-md font-medium text-gray-700 mb-2">My Current Enrollments</h3>
                                <div className="space-y-2">
                                    {recentActivities.my_enrollments.slice(0, 3).map((enrollment) => (
                                        <div key={enrollment.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                            <div className="text-lg">📚</div>
                                            <div className="flex-1">
                                                <p className="font-medium">{enrollment.schedule.course.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {enrollment.schedule.course.course_code} • {enrollment.semester}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.role === 'lecturer' && recentActivities.my_schedules && (
                            <div className="mb-6">
                                <h3 className="text-md font-medium text-gray-700 mb-2">My Teaching Schedule</h3>
                                <div className="space-y-2">
                                    {recentActivities.my_schedules.slice(0, 3).map((schedule) => (
                                        <div key={schedule.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                            <div className="text-lg">📅</div>
                                            <div className="flex-1">
                                                <p className="font-medium">{schedule.course.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {schedule.day_of_week} • {schedule.start_time} - {schedule.end_time}
                                                    {schedule.room && ` • Room ${schedule.room}`}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                {schedule.enrollments.length} students
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Getting Started Guide */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">💡 Getting Started</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-800 mb-2">For Administrators:</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Start by adding lecturers and courses</li>
                                <li>• Create class schedules for each course</li>
                                <li>• Register students and enroll them in courses</li>
                                <li>• Monitor grades and generate reports</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800 mb-2">Key Features:</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Complete CRUD operations for all entities</li>
                                <li>• Role-based access control</li>
                                <li>• Automated transcript generation</li>
                                <li>• Schedule conflict detection</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}