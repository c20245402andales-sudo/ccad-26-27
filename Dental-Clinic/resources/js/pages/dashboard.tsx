
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardProps {
    statistics: {
        patients: number;
        dentists: number;
        procedures: number;
        appointments: number;
    };
    recentAppointments: {
        id: number;
        patient: string;
        dentist: string;
        scheduled_datetime: string;
        payment_status: string;
        procedures: string[];
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    statistics,
    recentAppointments,
}: DashboardProps) {
    const cards = [
        {
            title: 'Total Patients',
            value: statistics.patients,
            description: 'Registered patients',
            icon: '👥',
            color: 'bg-blue-100 text-blue-700',
        },
        {
            title: 'Total Dentists',
            value: statistics.dentists,
            description: 'Available dentists',
            icon: '🧑‍⚕️',
            color: 'bg-green-100 text-green-700',
        },
        {
            title: 'Total Procedures',
            value: statistics.procedures,
            description: 'Dental services',
            icon: '🦷',
            color: 'bg-purple-100 text-purple-700',
        },
        {
            title: 'Total Appointments',
            value: statistics.appointments,
            description: 'Scheduled appointments',
            icon: '📅',
            color: 'bg-orange-100 text-orange-700',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Welcome */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Dental Clinic Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Welcome! Here's an overview of your dental clinic.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
                                >
                                    <span className="text-xl">
                                        {card.icon}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-4 text-3xl font-bold">
                                {card.value}
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Recent Appointments */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2 dark:bg-neutral-900">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Recent Appointments
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Latest scheduled dental appointments
                                </p>
                            </div>

                            <Link
                                href="/dental-appointments"
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                View all
                            </Link>
                        </div>

                        {recentAppointments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b text-gray-500">
                                            <th className="px-3 py-3 font-medium">
                                                Patient
                                            </th>
                                            <th className="px-3 py-3 font-medium">
                                                Dentist
                                            </th>
                                            <th className="px-3 py-3 font-medium">
                                                Date
                                            </th>
                                            <th className="px-3 py-3 font-medium">
                                                Payment
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentAppointments.map((appointment) => (
                                            <tr
                                                key={appointment.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-3 py-4 font-medium">
                                                    {appointment.patient}
                                                    <p className="mt-1 text-xs font-normal text-gray-500">
                                                        {appointment.procedures.join(', ') || 'No procedures'}
                                                    </p>
                                                </td>

                                                <td className="px-3 py-4">
                                                    {appointment.dentist}
                                                </td>

                                                <td className="px-3 py-4">
                                                    {appointment.scheduled_datetime}
                                                </td>

                                                <td className="px-3 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            appointment.payment_status.toLowerCase() === 'paid'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-orange-100 text-orange-700'
                                                        }`}
                                                    >
                                                        {appointment.payment_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-lg bg-gray-50 py-12 text-center dark:bg-neutral-800">
                                <p className="text-3xl">📅</p>
                                <p className="mt-3 font-medium">
                                    No appointments yet
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Your recent appointments will appear here.
                                </p>
                                <Link
                                    href="/dental-appointments/create"
                                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Create Appointment
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Quick Access */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold">
                            Quick Access
                        </h2>
                        <p className="mb-5 text-sm text-gray-500">
                            Manage your clinic records
                        </p>

                        <div className="space-y-3">
                            {[
                                {
                                    title: 'Manage Patients',
                                    description: 'View patient records',
                                    href: '/patients',
                                    icon: '👥',
                                },
                                {
                                    title: 'Manage Dentists',
                                    description: 'View dentist information',
                                    href: '/dentists',
                                    icon: '🧑‍⚕️',
                                },
                                {
                                    title: 'Manage Procedures',
                                    description: 'View dental procedures',
                                    href: '/procedures',
                                    icon: '🦷',
                                },
                                {
                                    title: 'Manage Appointments',
                                    description: 'View clinic appointments',
                                    href: '/dental-appointments',
                                    icon: '📅',
                                },
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-50 dark:hover:bg-neutral-800"
                                >
                                    <span className="text-2xl">
                                        {item.icon}
                                    </span>
                                    <span>
                                        <span className="block text-sm font-semibold">
                                            {item.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {item.description}
                                        </span>
                                    </span>
                                    <span className="ml-auto text-gray-400">
                                        →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
