import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">📚</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">AcademicHub</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button>Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login">
                                        <Button variant="outline">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Register</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        🎓 Complete Academic Information System
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
                        Streamline your educational institution with our comprehensive platform for managing students, 
                        courses, schedules, grades, and faculty. Built for administrators, students, and lecturers.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Student Management */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">👨‍🎓</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Management</h3>
                        <p className="text-gray-600 mb-4">
                            Complete student registration, profile management, and enrollment tracking with detailed records.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Student registration & profiles</li>
                            <li>• Enrollment management</li>
                            <li>• Academic history tracking</li>
                            <li>• Status monitoring</li>
                        </ul>
                    </div>

                    {/* Course Management */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📖</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Management</h3>
                        <p className="text-gray-600 mb-4">
                            Organize courses with descriptions, prerequisites, credits, and department categorization.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Course catalog management</li>
                            <li>• Prerequisites tracking</li>
                            <li>• Credit system</li>
                            <li>• Department organization</li>
                        </ul>
                    </div>

                    {/* Grade Management */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Grade Management</h3>
                        <p className="text-gray-600 mb-4">
                            Comprehensive grading system with transcript generation and performance analytics.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Multiple grade types</li>
                            <li>• Transcript generation</li>
                            <li>• Performance tracking</li>
                            <li>• Grade analytics</li>
                        </ul>
                    </div>

                    {/* Schedule Management */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Schedule Management</h3>
                        <p className="text-gray-600 mb-4">
                            Create and manage class schedules with room assignments and capacity management.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Class scheduling</li>
                            <li>• Room assignments</li>
                            <li>• Capacity management</li>
                            <li>• Time conflict detection</li>
                        </ul>
                    </div>

                    {/* Lecturer Management */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">👩‍🏫</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Lecturer Management</h3>
                        <p className="text-gray-600 mb-4">
                            Manage faculty profiles, teaching assignments, and departmental organization.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Faculty profiles</li>
                            <li>• Teaching assignments</li>
                            <li>• Department management</li>
                            <li>• Specialization tracking</li>
                        </ul>
                    </div>

                    {/* User Roles */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🔐</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Role-Based Access</h3>
                        <p className="text-gray-600 mb-4">
                            Secure access control with distinct interfaces for administrators, students, and lecturers.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-1">
                            <li>• Admin: Full system access</li>
                            <li>• Student: Personal records</li>
                            <li>• Lecturer: Course management</li>
                            <li>• Secure authentication</li>
                        </ul>
                    </div>
                </div>

                {/* User Roles Section */}
                <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">🎯 Built for Every User</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👑</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Administrators</h4>
                            <p className="text-gray-600">
                                Complete control over all system aspects including student management, course creation, 
                                schedule planning, and comprehensive reporting.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Students</h4>
                            <p className="text-gray-600">
                                Access personal profiles, view enrolled courses, check grades and transcripts, 
                                and manage class schedules in one convenient location.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍🏫</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Lecturers</h4>
                            <p className="text-gray-600">
                                Manage teaching assignments, input student grades, view class rosters, 
                                and track course progress with dedicated tools.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-10 mb-16">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">⚡ Modern Technology Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="font-medium">Laravel</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="font-medium">React</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <span className="font-medium">Inertia.js</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="font-medium">PostgreSQL</span>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started? 🚀</h3>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of educational institutions already using AcademicHub to streamline their academic operations.
                    </p>
                    {auth.user ? (
                        <Link href="/dashboard">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-3">
                                Access Your Dashboard →
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-3">
                                    Create Account →
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>© 2024 AcademicHub. Built with Laravel, React, and PostgreSQL.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}