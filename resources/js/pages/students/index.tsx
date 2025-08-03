import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth: string;
    address?: string;
    major?: string;
    year_level: number;
    status: 'active' | 'inactive' | 'graduated' | 'suspended';
    created_at: string;
    updated_at: string;
    enrollments?: Array<{
        id: number;
        schedule: {
            course: {
                name: string;
            };
        };
    }>;
}

interface Props {
    students: {
        data: Student[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function StudentsIndex({ students }: Props) {
    const getStatusBadge = (status: string) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            graduated: 'bg-blue-100 text-blue-800',
            suspended: 'bg-red-100 text-red-800',
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getYearLevelText = (level: number) => {
        const levels = { 1: 'Freshman', 2: 'Sophomore', 3: 'Junior', 4: 'Senior' };
        return levels[level as keyof typeof levels] || `Year ${level}`;
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                            <span>👨‍🎓</span>
                            <span>Student Management</span>
                        </h1>
                        <p className="text-gray-600 mt-1">Manage student records and enrollments</p>
                    </div>
                    <Link href="/students/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <span className="mr-2">➕</span>
                            Add Student
                        </Button>
                    </Link>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">{students.total}</p>
                            </div>
                            <div className="text-2xl">👥</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {students.data.filter(s => s.status === 'active').length}
                                </p>
                            </div>
                            <div className="text-2xl">✅</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Graduated</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {students.data.filter(s => s.status === 'graduated').length}
                                </p>
                            </div>
                            <div className="text-2xl">🎓</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Per Page</p>
                                <p className="text-2xl font-bold text-gray-900">{students.per_page}</p>
                            </div>
                            <div className="text-2xl">📄</div>
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Year Level
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Major
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Enrollments
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.data.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {student.first_name} {student.last_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{student.student_id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{getYearLevelText(student.year_level)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{student.major || 'Not assigned'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(student.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {student.enrollments?.length || 0} courses
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link href={`/students/${student.id}`}>
                                                    <Button variant="outline" size="sm">View</Button>
                                                </Link>
                                                <Link href={`/students/${student.id}/edit`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {students.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {students.current_page > 1 && (
                                    <Link href={students.links.find(link => link.label === '&laquo; Previous')?.url || '#'}>
                                        <Button variant="outline">Previous</Button>
                                    </Link>
                                )}
                                {students.current_page < students.last_page && (
                                    <Link href={students.links.find(link => link.label === 'Next &raquo;')?.url || '#'}>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing page <span className="font-medium">{students.current_page}</span> of{' '}
                                        <span className="font-medium">{students.last_page}</span> ({students.total} total students)
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {students.links.map((link, index) => {
                                            if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${
                                                            link.url
                                                                ? 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                                                : 'text-gray-300 bg-white border border-gray-300 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {link.label === '&laquo; Previous' ? '←' : '→'}
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                            : link.url
                                                            ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            : 'bg-white border-gray-300 text-gray-300 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Empty State */}
                {students.data.length === 0 && (
                    <div className="bg-white shadow rounded-lg p-12 text-center">
                        <div className="text-6xl mb-4">👨‍🎓</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                        <p className="text-gray-500 mb-6">Get started by adding your first student to the system.</p>
                        <Link href="/students/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <span className="mr-2">➕</span>
                                Add First Student
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}