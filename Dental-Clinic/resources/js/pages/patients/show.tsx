
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, User, Phone, Hash, CalendarDays, Stethoscope } from 'lucide-react';

interface Appointment {
    id: number;
    scheduled_datetime: string;
    payment_status: string;
    dentist?: {
        dentist_name: string;
    };
    procedure_entries?: {
        procedure?: {
            procedure_name: string;
        };
    }[];
}

interface Patient {
    id: number;
    patient_code: string;
    patient_name: string;
    patient_contact: string;
    appointments: Appointment[];
}

interface ShowPatientProps {
    patient: Patient;
}

export default function ShowPatient({ patient }: ShowPatientProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Patients', href: '/patients' },
        { title: 'Patient Details', href: `/patients/${patient.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Patient - ${patient.patient_name}`} />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div>
                    <Link
                        href="/patients"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Patients
                    </Link>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Patient Details
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                View patient information and appointment history.
                            </p>
                        </div>

                        <Link
                            href={`/patients/${patient.id}/edit`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            <Pencil size={17} />
                            Edit Patient
                        </Link>
                    </div>
                </div>

                {/* Patient Information */}
                <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <div className="mb-6 flex items-center gap-4 border-b pb-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                            <User size={32} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                {patient.patient_name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Patient ID: #{patient.id}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                                <Hash size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Patient Code
                                </p>
                                <p className="font-semibold">
                                    {patient.patient_code}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-3 text-green-700">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Contact Number
                                </p>
                                <p className="font-semibold">
                                    {patient.patient_contact}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment History */}
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-neutral-900">
                    <div className="border-b p-5">
                        <h2 className="text-lg font-semibold">
                            Appointment History
                        </h2>
                        <p className="text-sm text-gray-500">
                            Previous and scheduled dental appointments.
                        </p>
                    </div>

                    {patient.appointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 dark:bg-neutral-800">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">
                                            Date
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Dentist
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Procedures
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Payment
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {patient.appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center gap-2">
                                                    <CalendarDays size={16} className="text-gray-400" />
                                                    {appointment.scheduled_datetime}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                {appointment.dentist?.dentist_name ?? 'Not assigned'}
                                            </td>

                                            <td className="px-5 py-4">
                                                {appointment.procedure_entries
                                                    ?.map((entry) => entry.procedure?.procedure_name)
                                                    .filter(Boolean)
                                                    .join(', ') || 'No procedures'}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                    {appointment.payment_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-14 text-center">
                            <Stethoscope
                                size={36}
                                className="mx-auto text-gray-400"
                            />
                            <p className="mt-3 font-semibold">
                                No appointment history
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                This patient does not have any appointments yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
