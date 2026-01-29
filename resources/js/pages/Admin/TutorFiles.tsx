import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tutor Applications',
        href: '/admin/tutor-applications',
    },
];

export default function TutorApplications() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tutor Applications" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                Tutor Applications Page
            </div>
        </AppLayout>
    );
}
