import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, File, Users } from 'lucide-react';
import { DataTable } from '../Components/DataTable';
import StatusCard from '../Components/StatusCard';
import { columns, type PaidBooking } from './column/payment-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

interface DashboardProps {
    learners: number;
    tutors: number;
    revenue: number;
    paid_bookings: PaidBooking[];
    tutor_applications: number;
}

export default function Dashboard({
    learners,
    tutors,
    revenue,
    paid_bookings,
    tutor_applications,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative h-[12rem] overflow-hidden rounded-xl shadow-md">
                        <StatusCard
                            link="/admin/revenue"
                            className="bg-yellow-200"
                            title="Revenue"
                            value={`₱${revenue?.toLocaleString() || '0'}`}
                            description="Total revenue generated"
                            icon={
                                <div className="text-3xl text-gray-400">₱</div>
                            }
                        />
                    </div>
                    <div className="relative h-[12rem] overflow-hidden rounded-xl shadow-md">
                        <StatusCard
                            link="/admin/tutors"
                            title="Tutor"
                            value={tutors || '0'}
                            description="Number of registered tutors"
                            icon={<Users size={24} className="text-gray-400" />}
                        />
                    </div>
                    <div className="relative h-[12rem] overflow-hidden rounded-xl shadow-md">
                        <StatusCard
                            link="/admin/learners"
                            title="Learner"
                            value={learners?.toLocaleString() || '0'}
                            description="Number of registered learners"
                            icon={
                                <BookOpen size={24} className="text-gray-400" />
                            }
                        />
                    </div>
                    <div className="relative h-[12rem] overflow-hidden rounded-xl shadow-md">
                        <StatusCard
                            link="/admin/tutor-applications"
                            title="Tutor Applications"
                            value={tutor_applications || 0}
                            description="Number of tutor applications"
                            icon={<File size={24} className="text-gray-400" />}
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Paid Bookings
                    </h1>
                    <p className="text-muted-foreground">
                        Paid bookings overview and details
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-[#FFFFFF] shadow-md">
                    <div className="m-4">
                        {/* Pass the columns and data to DataTable */}
                        <DataTable
                            columns={columns}
                            data={paid_bookings || []}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
