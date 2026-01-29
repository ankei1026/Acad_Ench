'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import {
    AlertCircle,
    BookOpen,
    Calendar,
    CheckCircle,
    CheckSquare,
    Clock,
    CreditCard,
    DollarSign,
    MoreHorizontal,
    Smartphone,
    User2,
    XCircle,
} from 'lucide-react';
export type Booking = {
    book_id: string;
    name: string;
    subject: string;
    photo: string;
    amount: number;
    mop: string
    booking_status: 'pending' | 'paid' | 'canceled';
    tutor_status: 'accept' | 'pending' | 'decline' | 'success' | 'failed';
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: 'book_id',
        header: 'ID',
        cell: ({ row }) => {
            const bookId = row.original.book_id || '';
            return (
                <span className="font-mono text-sm">
                    #{bookId.slice(0, 6) || 'N/A'}
                </span>
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Learner',
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div className="flex items-center gap-3">
                    <User2 className="h-4 w-4 text-gray-400" />
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
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span>{row.original.subject}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            return (
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div className="font-medium">
                        ₱
                        {amount.toLocaleString('en-PH', {
                            minimumFractionDigits: 2,
                        })}
                    </div>
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
                    <Badge className={statusStyles[status as keyof typeof statusStyles]}>
                        {statusText[status as keyof typeof statusText]}
                    </Badge>
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
                    <Badge className={statusStyles[status as keyof typeof statusStyles]}>
                        {statusText[status as keyof typeof statusText]}
                    </Badge>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Booking</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log('Update to scheduled', booking.book_id)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Mark as Scheduled
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Update to completed', booking.book_id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => console.log('Update to canceled', booking.book_id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark as Canceled
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
