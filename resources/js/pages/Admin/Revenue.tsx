import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Revenue',
        href: '/admin/revenue',
    },
];

export default function Revenue() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Revenue" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                Revenue Page
            </div>
        </AppLayout>
    );
}
