'use client';

import { Badge } from '@/components/ui/badge';
import { formatDate, formatTimeRange } from '@/lib/dateTimeFormat';
import { ColumnDef } from '@tanstack/react-table';
import { Calendar, CheckCircle, Clock, User2, Wallet } from 'lucide-react';

export type PaidBooking = {
    id: string;
    book_id: string;
    user_id: string;
    amount: number;
    status: 'paid' | 'pending';
    booking_date: string;
    start_time: string;
    end_time: string;
    booking?: {
        user?: {
            name?: string;
        };
    };
    tutor?: {
        name?: string;
        email?: string;
        photo?: string | null;
    };
};

export const columns: ColumnDef<PaidBooking>[] = [
    {
        accessorKey: 'book_id',
        header: 'Booking ID',
        cell: ({ row }) => (
            <span className="font-semibold">{row.getValue('book_id')}</span>
        ),
    },
    {
        id: 'learner_name',
        accessorFn: (row) => row.booking?.user?.name ?? '',
        header: 'Learner Name',
        cell: ({ row }) => <div className='flex items-center gap-2'><User2 className='w-4 h-4 text-gray-400'/><span>{row.getValue('learner_name')}</span></div>,
    },
    {
        id: 'tutor',
        header: 'Tutor',
        cell: ({ row }) => {
            const tutor = row.original.tutor;

            return (
                <div className="flex items-center gap-3">
                    {tutor?.photo ? (
                        <img
                            src={tutor.photo}
                            alt={tutor.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <User2 className="h-10 w-10 text-gray-400" />
                    )}

                    <div className="flex flex-col">
                        <span className="font-medium">
                            {tutor?.name ?? 'N/A'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {tutor?.email ?? ''}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
            }).format(amount);

            return (
                <div className="flex items-center gap-2 font-medium">
                    <Wallet className="h-4 w-4 text-gray-500" />

                    {formatted}
                </div>
            );
        },
    },
    {
        accessorKey: 'booking_date',
        header: 'Date & Time',
        cell: ({ row }) => {
            const date = row.getValue('booking_date') as string;
            const startTime = row.getValue('start_time') as string;
            const endTime = row.getValue('end_time') as string
            return (
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                            {date ? formatDate(date) : 'N/A'}
                        </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                            {startTime && endTime
                                ? formatTimeRange(startTime, endTime)
                                : 'N/A'}
                        </span>
                    </div> */}
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status');
            const isPaid = status === 'paid';

            const statusStyles = {
                paid: 'bg-green-100 text-green-800 border-green-200',
                pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            };

            const statusIcons = {
                paid: <CheckCircle className="h-4 w-4 text-green-600" />,
                pending: <Clock className="h-4 w-4 text-yellow-600" />,
            };

            return (
                <div className="flex items-center gap-2">
                    {statusIcons[status as keyof typeof statusIcons]}
                    <Badge
                        className={
                            statusStyles[status as keyof typeof statusStyles]
                        }
                    >
                        {isPaid ? 'Paid' : 'Pending'}
                    </Badge>
                </div>
            );
        },
    },
];
