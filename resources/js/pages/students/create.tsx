import React from 'react';
import { router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { InputError } from '@/components/input-error';



interface StudentFormData {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    address: string;
    major: string;
    year_level: number;
    status: 'active' | 'inactive' | 'graduated' | 'suspended';
    [key: string]: string | number;
}

export default function CreateStudent() {
    const { data, setData, post, processing, errors, reset } = useForm<StudentFormData>({
        student_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
        major: '',
        year_level: 1,
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('students.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button 
                        variant="outline" 
                        onClick={() => router.visit('/students')}
                    >
                        ← Back to Students
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                            <span>➕</span>
                            <span>Add New Student</span>
                        </h1>
                        <p className="text-gray-600 mt-1">Register a new student in the system</p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Student ID *
                                    </label>
                                    <input
                                        type="text"
                                        id="student_id"
                                        value={data.student_id}
                                        onChange={(e) => setData('student_id', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., S2024001"
                                    />
                                    <InputError message={errors.student_id} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="student@example.com"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.first_name} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.last_name} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.phone} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.date_of_birth} className="mt-1" />
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Full address"
                                />
                                <InputError message={errors.address} className="mt-1" />
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                                        Major
                                    </label>
                                    <select
                                        id="major"
                                        value={data.major}
                                        onChange={(e) => setData('major', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Major</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Business Administration">Business Administration</option>
                                        <option value="Psychology">Psychology</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="English Literature">English Literature</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Economics">Economics</option>
                                    </select>
                                    <InputError message={errors.major} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="year_level" className="block text-sm font-medium text-gray-700 mb-1">
                                        Year Level *
                                    </label>
                                    <select
                                        id="year_level"
                                        value={data.year_level}
                                        onChange={(e) => setData('year_level', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value={1}>1st Year (Freshman)</option>
                                        <option value={2}>2nd Year (Sophomore)</option>
                                        <option value={3}>3rd Year (Junior)</option>
                                        <option value={4}>4th Year (Senior)</option>
                                    </select>
                                    <InputError message={errors.year_level} className="mt-1" />
                                </div>
                                
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as StudentFormData['status'])}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="graduated">Graduated</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/students')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Creating...' : 'Create Student'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}