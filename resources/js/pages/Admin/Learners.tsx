import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from '../Admin/column/learner-column';
import { DataTable } from '../Components/DataTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Learners',
        href: '/admin/learners',
    },
];

interface LearnerProps {
    learners: Array<{
        id: string;
        name: string;
        email: string;
        created_at?: string;
    }>;
}

export default function Learners({ learners }: LearnerProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Learners" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Learners</h1>
                        <p className="text-muted-foreground">
                            Manage and view all learners in the system
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl bg-[#FFFFFF] shadow-md">
                    <div className="m-4">
                        <DataTable columns={columns} data={learners} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
