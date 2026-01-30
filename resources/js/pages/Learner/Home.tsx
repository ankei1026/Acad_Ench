import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { learnerBookingColumns } from './column/learnerbooking-column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/learner/home',
    },
];

interface Booking {
    book_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    session_duration: number | string;
    booking_status: string;
    tutor_status: string;
    decline_reason?: string | null;
    amount?: string | number;
    receipt?: {
        id: number;
        reference: string;
        photo?: string | null;
        amount: string | number;
    } | null;
    tutor?: {
        user?: {
            name: string;
        };
        mop: string;
        number: string
    };
}

interface HomeProps {
    bookings: Booking[];
}

export default function Home({ bookings }: HomeProps) {
    const hasBookings = bookings && bookings.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {!hasBookings ? (
                    // Default UI when no bookings
                    <div className="flex flex-col items-center justify-center mt-12">
                        <img
                            src="/assets/home.png"
                            alt="Home Image"
                            className="h-60 w-80 ml-10"
                        />
                        <p className="mt-6 mb-6 text-sm font-bold">Book a tutor to learn</p>
                        <Button
                            className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
                            asChild
                        >
                            <Link href="/learner/book-tutor">
                                Find Tutor
                            </Link>
                        </Button>
                    </div>
                ) : (
                    // Show bookings table
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Your Bookings
                            </h1>
                            <p className="text-muted-foreground">
                                Manage and track your tutor booking sessions
                            </p>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking History</CardTitle>
                                <CardDescription>
                                    You have {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={learnerBookingColumns}
                                    data={bookings}
                                    searchKey="tutor"
                                />
                            </CardContent>
                        </Card>
                        <Button
                            className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
                            asChild
                        >
                            <Link href="/learner/book-tutor">
                                Book Another Tutor
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
