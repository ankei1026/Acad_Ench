'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle, Clock, XCircle, AlertCircle, CreditCard, Smartphone, Calendar, CheckSquare } from 'lucide-react';

export type Booking = {
    id: string;
    name: string;
    subject: string;
    photo: string;
    amount: number;
    mop: 'gcash' | 'paymaya';
    payment_status: 'paid' | 'pending' | 'canceled' | 'failed';
    booking_status: 'scheduled' | 'completed' | 'canceled';
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            return <span className="text-sm font-mono">#{row.getValue('id').slice(0, 6)}</span>;
        },
    },
    {
        accessorKey: 'name',
        header: 'Learner',
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div className="flex items-center gap-3">

                    <div>
                        <div className="font-medium">{booking.name}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            return (
                <div className="font-medium">
                    ₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </div>
            );
        },
    },
    {
        accessorKey: 'mop',
        header: 'Payment Method',
        cell: ({ row }) => {
            const mop = row.getValue('mop');
            return (
                <div className="flex items-center gap-2">
                    {mop === 'gcash' ? (
                        <>
                            <Smartphone className="h-4 w-4 text-green-600" />
                            <span className="text-sm">GCash</span>
                        </>
                    ) : (
                        <>
                            <CreditCard className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">PayMaya</span>
                        </>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'payment_status',
        header: 'Payment Status',
        cell: ({ row }) => {
            const status = row.getValue('payment_status');

            const statusStyles = {
                paid: 'bg-green-100 text-green-800 border-green-200',
                pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                canceled: 'bg-gray-100 text-gray-800 border-gray-200',
                failed: 'bg-red-100 text-red-800 border-red-200',
            };

            const statusIcons = {
                paid: <CheckCircle className="h-4 w-4 text-green-600" />,
                pending: <Clock className="h-4 w-4 text-yellow-600" />,
                canceled: <XCircle className="h-4 w-4 text-gray-600" />,
                failed: <AlertCircle className="h-4 w-4 text-red-600" />,
            };

            const statusText = {
                paid: 'Paid',
                pending: 'Pending',
                canceled: 'Canceled',
                failed: 'Failed',
            };

            return (
                <div className="flex items-center gap-2">
                    {statusIcons[status as keyof typeof statusIcons]}
                    <span className={`px-3 py-1 rounded-full text-xs border ${statusStyles[status as keyof typeof statusStyles]}`}>
                        {statusText[status as keyof typeof statusText]}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'booking_status',
        header: 'Booking Status',
        cell: ({ row }) => {
            const status = row.getValue('booking_status');

            const statusStyles = {
                scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
                completed: 'bg-green-100 text-green-800 border-green-200',
                canceled: 'bg-red-100 text-red-800 border-red-200',
            };

            const statusIcons = {
                scheduled: <Calendar className="h-4 w-4 text-blue-600" />,
                completed: <CheckSquare className="h-4 w-4 text-green-600" />,
                canceled: <XCircle className="h-4 w-4 text-red-600" />,
            };

            const statusText = {
                scheduled: 'Scheduled',
                completed: 'Completed',
                canceled: 'Canceled',
            };

            return (
                <div className="flex items-center gap-2">
                    {statusIcons[status as keyof typeof statusIcons]}
                    <span className={`px-3 py-1 rounded-full text-xs border ${statusStyles[status as keyof typeof statusStyles]}`}>
                        {statusText[status as keyof typeof statusText]}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const booking = row.original;

            return (
                <div className="flex gap-2">
                    <button
                        onClick={() => console.log('View:', booking.id)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        View
                    </button>
                </div>
            );
        },
    },
];
