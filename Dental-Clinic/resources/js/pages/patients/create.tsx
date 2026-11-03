
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Save } from 'lucide-react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Patients', href: '/patients' },
    { title: 'Add Patient', href: '/patients/create' },
];

export default function CreatePatient() {
    const { data, setData, post, processing, errors } = useForm({
        patient_code: '',
        patient_name: '',
        patient_contact: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/patients');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Patient" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div>
                    <Link
                        href="/patients"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Patients
                    </Link>

                    <h1 className="text-2xl font-bold">Add New Patient</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Enter the patient's information below.
                    </p>
                </div>

                <div className="mx-auto w-full max-w-3xl rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 md:p-8">
                    <div className="mb-6 flex items-center gap-3 border-b pb-5">
                        <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                            <UserPlus size={24} />
                        </div>

                        <div>
                            <h2 className="font-semibold">Patient Information</h2>
                            <p className="text-sm text-gray-500">
                                All fields are required.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="patient_code" className="mb-2 block text-sm font-medium">
                                Patient Code
                            </label>

                            <input
                                id="patient_code"
                                type="text"
                                value={data.patient_code}
                                onChange={(event) => setData('patient_code', event.target.value)}
                                placeholder="Example: PAT-001"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.patient_code && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.patient_code}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="patient_name" className="mb-2 block text-sm font-medium">
                                Full Name
                            </label>

                            <input
                                id="patient_name"
                                type="text"
                                value={data.patient_name}
                                onChange={(event) => setData('patient_name', event.target.value)}
                                placeholder="Enter patient's full name"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.patient_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.patient_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="patient_contact" className="mb-2 block text-sm font-medium">
                                Contact Number
                            </label>

                            <input
                                id="patient_contact"
                                type="text"
                                value={data.patient_contact}
                                onChange={(event) => setData('patient_contact', event.target.value)}
                                placeholder="Example: 09123456789"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {errors.patient_contact && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.patient_contact}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                            <Link
                                href="/patients"
                                className="rounded-lg border px-5 py-3 text-center text-sm font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Save size={17} />
                                {processing ? 'Saving...' : 'Save Patient'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
