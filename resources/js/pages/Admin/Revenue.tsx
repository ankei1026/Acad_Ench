import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '../Components/DataTable';
import { columns, type RevenueTransaction } from './column/revenue-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Revenue',
        href: '/admin/revenue',
    },
];

interface RevenueProps {
    transactions: RevenueTransaction[];
}

export default function Revenue({ transactions }: RevenueProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Revenue" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Revenue Transactions</h1>
                    <p className="text-muted-foreground">Paid bookings with receipts</p>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="m-4">
                        <DataTable
                            columns={columns}
                            data={transactions || []}
                            searchKey="tutor"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
