import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '../Components/DataTable';
import StatusCard from '../Components/StatusCard';
import { columns, type Booking } from './column/booking-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/tutor/booking',
    },
];

interface BookingPageProps {
    bookingData: Booking[];
}

export default function Booking({ bookingData = [] }: BookingPageProps) {
    // Calculate total revenue from paid bookings
    const totalRevenue = bookingData
        .filter((b) => b.payment_status === 'paid')
        .reduce((sum, booking) => sum + booking.amount, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Booking" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Booking Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and track all student bookings and payments
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <StatusCard
                            title="Total Bookings"
                            value={bookingData.length}
                            className="rounded-lg"
                        />
                    </div>

                    <div className="rounded-lg border bg-white shadow-sm">
                        <StatusCard
                            title="Paid"
                            value={
                                bookingData.filter(
                                    (b) => b.payment_status === 'paid',
                                ).length
                            }
                            className="rounded-lg"
                        />
                    </div>

                    <div className="rounded-lg border bg-white shadow-sm">
                        <StatusCard
                            title="Pending"
                            value={
                                bookingData.filter(
                                    (b) => b.payment_status === 'pending',
                                ).length
                            }
                            className="rounded-lg"
                        />
                    </div>

                    <div className="rounded-lg border bg-white shadow-sm">
                        <StatusCard
                            title="Total Revenue"
                            value={totalRevenue}
                            prefix="₱"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="m-4">
                        <DataTable
                            columns={columns}
                            data={bookingData}
                            title='Your Bookings'
                            searchKey="name"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
