import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '../Components/DataTable';
import { columns } from './column/tutor-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tutors',
        href: '/admin/tutors',
    },
];

interface TutorProps {
    tutors: Array<{
        user?: [name: string, email: string];
        tutor_id?: string;
        subject?: string;
        photo?: string;
        rate_per_hour?: string;
        status?: string;
    }>;
}

export default function Tutor({ tutors }: TutorProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tutor" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Tutors</h1>
                        <p className="text-muted-foreground">
                            Manage and view all tutors in the system
                        </p>
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-[#FFFFFF] shadow-md">
                    <div className="m-4">
                        <DataTable columns={columns} data={tutors} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
