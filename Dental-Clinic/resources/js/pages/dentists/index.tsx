
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Search,
    Plus,
    Stethoscope,
    Pencil,
    Trash2,
    Eye,
    Users,
} from 'lucide-react';

interface Dentist {
    id: number;
    dentist_name: string;
    dentist_license: string;
    appointments_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDentists {
    data: Dentist[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    dentists: PaginatedDentists;
}

export default function DentistIndex({ dentists }: Props) {
    const [search, setSearch] = useState('');

    const filteredDentists = dentists.data.filter((dentist) => {
        const term = search.toLowerCase();

        return (
            dentist.dentist_name.toLowerCase().includes(term) ||
            dentist.dentist_license.toLowerCase().includes(term)
        );
    });

    const deleteDentist = (id: number) => {
        if (confirm('Are you sure you want to delete this dentist?')) {
            router.delete(`/dentists/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Dentists" />

            <div className="flex flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Dentists
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your dental clinic's dentists and their information.
                        </p>
                    </div>

                    <Link
                        href="/dentists/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Dentist
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Dentists
                                </p>
                                <h2 className="mt-2 text-3xl font-bold">
                                    {dentists.total}
                                </h2>
                            </div>

                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <Stethoscope size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Dentists on This Page
                                </p>
                                <h2 className="mt-2 text-3xl font-bold">
                                    {dentists.data.length}
                                </h2>
                            </div>

                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <Users size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Dentist Records</h2>
                            <p className="text-sm text-muted-foreground">
                                View and manage registered dentists.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search dentist..."
                                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-5 py-4 font-medium">#</th>
                                    <th className="px-5 py-4 font-medium">Dentist Name</th>
                                    <th className="px-5 py-4 font-medium">License Number</th>
                                    <th className="px-5 py-4 font-medium">Appointments</th>
                                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredDentists.length > 0 ? (
                                    filteredDentists.map((dentist, index) => (
                                        <tr
                                            key={dentist.id}
                                            className="transition hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4 text-muted-foreground">
                                                {(dentists.current_page - 1) * 10 + index + 1}
                                            </td>

                                            <td className="px-5 py-4 font-medium">
                                                {dentist.dentist_name}
                                            </td>

                                            <td className="px-5 py-4">
                                                {dentist.dentist_license}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                    {dentist.appointments_count}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/dentists/${dentist.id}`}
                                                        title="View dentist"
                                                        className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                                    >
                                                        <Eye size={17} />
                                                    </Link>

                                                    <Link
                                                        href={`/dentists/${dentist.id}/edit`}
                                                        title="Edit dentist"
                                                        className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                                    >
                                                        <Pencil size={17} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => deleteDentist(dentist.id)}
                                                        title="Delete dentist"
                                                        className="rounded-md p-2 text-red-500 transition hover:bg-red-500/10"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center text-muted-foreground"
                                        >
                                            {search
                                                ? 'No dentists match your search.'
                                                : 'No dentists registered yet. Click Add Dentist to get started.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredDentists.length} of {dentists.total} dentists
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {dentists.links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`rounded-md border px-3 py-2 text-xs ${
                                        link.active
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'bg-background hover:bg-muted'
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
