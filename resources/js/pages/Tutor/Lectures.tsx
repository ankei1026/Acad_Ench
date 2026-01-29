import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lectures',
        href: '/tutor/lectures',
    },
];

export default function Lectures() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lectures" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                Lectures Page
            </div>
        </AppLayout>
    );
}
