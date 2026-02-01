import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request Refund',
        href: '/learner/request-refund',
    },
];

export default function RequestRefund() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Request Refund" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Request Refund
                    </h1>
                </div>
            </div>
        </AppLayout>
    );
}
