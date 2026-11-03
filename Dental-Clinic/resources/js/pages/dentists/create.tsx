
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Stethoscope, Save } from 'lucide-react';

export default function CreateDentist() {
    const { data, setData, post, processing, errors } = useForm({
        dentist_name: '',
        dentist_license: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dentists');
    };

    return (
        <AppLayout>
            <Head title="Add Dentist" />

            <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 md:p-8">
                <div>
                    <Link
                        href="/dentists"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ArrowLeft size={16} />
                        Back to Dentists
                    </Link>

                    <h1 className="text-2xl font-bold tracking-tight">
                        Add New Dentist
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Register a dentist in your dental clinic.
                    </p>
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex items-center gap-3 border-b p-5">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <Stethoscope size={22} />
                        </div>

                        <div>
                            <h2 className="font-semibold">Dentist Information</h2>
                            <p className="text-sm text-muted-foreground">
                                Enter the dentist's details below.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 p-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="dentist_name"
                                className="text-sm font-medium"
                            >
                                Full Name
                            </label>

                            <input
                                id="dentist_name"
                                type="text"
                                value={data.dentist_name}
                                onChange={(e) =>
                                    setData('dentist_name', e.target.value)
                                }
                                placeholder="e.g. Dr. Maria Santos"
                                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                                required
                            />

                            {errors.dentist_name && (
                                <p className="text-sm text-red-500">
                                    {errors.dentist_name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="dentist_license"
                                className="text-sm font-medium"
                            >
                                License Number
                            </label>

                            <input
                                id="dentist_license"
                                type="text"
                                value={data.dentist_license}
                                onChange={(e) =>
                                    setData('dentist_license', e.target.value)
                                }
                                placeholder="e.g. DENT-001"
                                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                                required
                            />

                            {errors.dentist_license && (
                                <p className="text-sm text-red-500">
                                    {errors.dentist_license}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                            <Link
                                href="/dentists"
                                className="rounded-lg border px-5 py-2.5 text-center text-sm font-medium transition hover:bg-muted"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={17} />
                                {processing ? 'Saving...' : 'Save Dentist'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
