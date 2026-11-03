
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Pencil,
    Stethoscope,
    CalendarDays,
    User,
    CreditCard,
} from 'lucide-react';

interface Appointment {
    id: number;
    scheduled_datetime: string;
    payment_status: string;
    patient?: {
        patient_name: string;
        patient_code: string;
    };
}

interface Dentist {
    id: number;
    dentist_name: string;
    dentist_license: string;
    appointments: Appointment[];
}

interface Props {
    dentist: Dentist;
}

export default function ShowDentist({ dentist }: Props) {
    return (
        <AppLayout>
            <Head title="Dentist Details" />

            <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-8">
                <div>
                    <Link
                        href="/dentists"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ArrowLeft size={16} />
                        Back to Dentists
                    </Link>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Dentist Details
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                View dentist information and appointment history.
                            </p>
                        </div>

                        <Link
                            href={`/dentists/${dentist.id}/edit`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            <Pencil size={17} />
                            Edit Dentist
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Stethoscope size={36} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                {dentist.dentist_name}
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                License Number: {dentist.dentist_license}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
                        <div className="rounded-lg bg-muted/40 p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CreditCard size={17} />
                                License Number
                            </div>
                            <p className="mt-2 font-semibold">
                                {dentist.dentist_license}
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/40 p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarDays size={17} />
                                Total Appointments
                            </div>
                            <p className="mt-2 text-2xl font-bold">
                                {dentist.appointments.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="border-b p-5">
                        <h2 className="font-semibold">Appointment History</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Patients and appointments assigned to this dentist.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-5 py-4 font-medium">Patient</th>
                                    <th className="px-5 py-4 font-medium">Date & Time</th>
                                    <th className="px-5 py-4 font-medium">Payment</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {dentist.appointments.length > 0 ? (
                                    dentist.appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <User
                                                        size={17}
                                                        className="text-muted-foreground"
                                                    />
                                                    <div>
                                                        <p className="font-medium">
                                                            {appointment.patient?.patient_name ?? 'Unknown Patient'}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {appointment.patient?.patient_code ?? 'No patient code'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                {appointment.scheduled_datetime}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                                                    {appointment.payment_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-5 py-12 text-center text-muted-foreground"
                                        >
                                            This dentist has no appointments yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
