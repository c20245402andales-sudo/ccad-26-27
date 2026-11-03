
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Plus, Users, Pencil, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

interface Patient {
    id: number;
    patient_code: string;
    patient_name: string;
    patient_contact: string;
    appointments_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PatientProps {
    patients: {
        data: Patient[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Patients',
        href: '/patients',
    },
];

export default function PatientsIndex({ patients }: PatientProps) {
    const [search, setSearch] = useState('');

    const filteredPatients = patients.data.filter((patient) =>
        `${patient.patient_code} ${patient.patient_name} ${patient.patient_contact}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    function deletePatient(patient: Patient) {
        if (confirm(`Are you sure you want to delete ${patient.patient_name}?`)) {
            router.delete(`/patients/${patient.id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patients" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Patient Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your dental clinic's patient records.
                        </p>
                    </div>

                    <Link
                        href="/patients/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add Patient
                    </Link>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Total Patients
                            </p>
                            <Users className="text-blue-600" size={22} />
                        </div>

                        <p className="mt-3 text-3xl font-bold">
                            {patients.total}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Registered patient records
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Current Page
                            </p>
                            <Users className="text-green-600" size={22} />
                        </div>

                        <p className="mt-3 text-3xl font-bold">
                            {patients.current_page} / {patients.last_page}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Patient record pages
                        </p>
                    </div>
                </div>

                {/* Patient Table */}
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-neutral-900">
                    <div className="flex flex-col justify-between gap-4 border-b p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Patient Records
                            </h2>
                            <p className="text-sm text-gray-500">
                                View and manage registered patients.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search patients..."
                                className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Patient Code
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Patient Name
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Contact
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Appointments
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="hover:bg-gray-50 dark:hover:bg-neutral-800"
                                        >
                                            <td className="px-5 py-4 font-medium">
                                                {patient.patient_code}
                                            </td>

                                            <td className="px-5 py-4">
                                                {patient.patient_name}
                                            </td>

                                            <td className="px-5 py-4">
                                                {patient.patient_contact}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                    {patient.appointments_count}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/patients/${patient.id}`}
                                                        className="rounded-lg border p-2 text-gray-600 hover:bg-gray-100"
                                                        title="View patient"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>

                                                    <Link
                                                        href={`/patients/${patient.id}/edit`}
                                                        className="rounded-lg border p-2 text-blue-600 hover:bg-blue-50"
                                                        title="Edit patient"
                                                    >
                                                        <Pencil size={16} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => deletePatient(patient)}
                                                        className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                                                        title="Delete patient"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-16 text-center"
                                        >
                                            <Users
                                                size={36}
                                                className="mx-auto text-gray-400"
                                            />

                                            <p className="mt-3 font-semibold">
                                                No patients found
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Add a patient or try another search.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t p-5">
                        <p className="text-sm text-gray-500">
                            Showing {patients.data.length} of {patients.total} patients
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {patients.links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`rounded-lg border px-3 py-2 text-xs ${
                                        link.active
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'hover:bg-gray-100'
                                    } disabled:cursor-not-allowed disabled:opacity-40`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
