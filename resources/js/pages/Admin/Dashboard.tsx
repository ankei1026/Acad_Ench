import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, Users } from 'lucide-react';
import { DataTable } from '../Components/DataTable';
import StatusCard from '../Components/StatusCard';
import { columns, type Payment } from './column/payment-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const data: Payment[] = [
    {
        id: '1',
        photo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        amount: 1000,
        status: 'paid',
        mop: 'gcash',
        name: 'John Doe',
    },
    {
        id: '2',
        photo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        amount: 1500,
        status: 'paid',
        mop: 'paymaya',
        name: 'Jane Smith',
    },
    {
        id: '3',
        photo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        amount: 2000,
        status: 'paid',
        mop: 'gcash',
        name: 'Bob Johnson',
    },
    {
        id: '4',
        photo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        amount: 1500,
        status: 'paid',
        mop: 'paymaya',
        name: 'Jane Smith',
    },
    {
        id: '5',
        photo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        amount: 2000,
        status: 'paid',
        mop: 'gcash',
        name: 'Bob Johnson',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard
                            className="bg-yellow-200 border-yellow-400"
                            title="Revenue"
                            value="8,000"
                            description="Total revenue generated"
                            icon={
                                <div className="text-3xl text-gray-400">₱</div>
                            }
                        />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard
                            title="Tutor"
                            value="34"
                            description="Number of registered tutors"
                            icon={<Users size={24} className="text-gray-400" />}
                        />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <StatusCard
                            title="Learner"
                            value="1,234"
                            description="Number of registered learners"
                            icon={
                                <BookOpen size={24} className="text-gray-400" />
                            }
                        />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl">
                    {/* Pass the columns and data to DataTable */}
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
