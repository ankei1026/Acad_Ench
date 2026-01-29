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

// Sample booking data with both payment_status and booking_status
const bookingData: Booking[] = [
    {
        id: 'bk_001',
        name: 'John Doe',
        subject: 'Mathematics',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        amount: 250,
        mop: 'gcash',
        payment_status: 'paid',
        booking_status: 'scheduled',
    },
    {
        id: 'bk_002',
        name: 'Jane Smith',
        subject: 'Physics',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?w=400&h=400&fit=crop&crop=face',
        amount: 250,
        mop: 'paymaya',
        payment_status: 'pending',
        booking_status: 'scheduled',
    },
    {
        id: 'bk_003',
        name: 'Robert Johnson',
        subject: 'Chemistry',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        amount: 250,
        mop: 'gcash',
        payment_status: 'canceled',
        booking_status: 'canceled',
    },
];

export default function Booking() {
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
