import { Badge } from '@/components/ui/badge';
import { formatDate, formatTimeRange } from '@/lib/dateTimeFormat';
import { ColumnDef } from '@tanstack/react-table';
import {
    Calendar,
    CheckCircle,
    Clock,
    MoreHorizontal,
    User2,
    Wallet,
    XCircle,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@headlessui/react';

export interface BookingColumn {
    book_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    session_duration: number | string;
    booking_status: string;
    tutor_status: string;
    amount: string;
    tutor?: {
        user?: {
            name: string;
        };
        mop: string;
        number: string;
    };
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'paid':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'canceled':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'pending':
            return <Clock className="h-4 w-4 text-yellow-600" />;
        case 'paid':
            return <CheckCircle className="h-4 w-4 text-green-600" />;
        case 'canceled':
            return <XCircle className="h-4 w-4 text-red-600" />;
        default:
            return null;
    }
};

const getTutorStatusColor = (status: string) => {
    switch (status) {
        case 'accept':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'decline':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'success':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'failed':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getTutorStatusIcon = (status: string) => {
    switch (status) {
        case 'accept':
            return <CheckCircle className="h-4 w-4 text-green-600" />;
        case 'decline':
            return <XCircle className="h-4 w-4 text-red-600" />;
        case 'success':
            return <CheckCircle className="h-4 w-4 text-blue-600" />;
        case 'failed':
            return <XCircle className="h-4 w-4 text-red-600" />;
        default:
            return null;
    }
};

export const learnerBookingColumns: ColumnDef<BookingColumn>[] = [
    {
        accessorKey: 'book_id',
        header: 'Booking ID',
        cell: ({ row }) => (
            <span className="font-semibold">{row.getValue('book_id')}</span>
        ),
    },
    {
        accessorKey: 'tutor.user.name',
        header: 'Tutor',
        cell: ({ row }) => {
            const tutor = row.original.tutor;
            return (
                <div className="flex items-center gap-2">
                    <User2 className="h-4 w-4 text-gray-400" />
                    <span>{tutor?.user?.name || 'N/A'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'booking_date',
        header: 'Date',
        cell: ({ row }) => {
            const date = row.getValue('booking_date') as string;
            return (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{date ? formatDate(date) : 'N/A'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'start_time',
        header: 'Time',
        cell: ({ row }) => {
            const startTime = row.original.start_time;
            const endTime = row.original.end_time;
            return (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                        {startTime && endTime
                            ? formatTimeRange(startTime, endTime)
                            : 'N/A'}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'session_duration',
        header: 'Duration',
        cell: ({ row }) => {
            const duration = row.getValue('session_duration');
            return (
                <span>
                    {duration
                        ? `${duration} hr${duration !== 1 ? 's' : ''}`
                        : 'N/A'}
                </span>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = row.getValue('amount');
            return <span>₱{" "}{amount}</span>;
        },
    },
    {
        accessorKey: 'mop',
        header: 'Mode of Payment',
        cell: ({ row }) => {
            const tutor = row.original.tutor;
            return (
                <span className="flex gap-2 items-center">
                    <Wallet className="h-4 w-4 text-gray-400" />{' '}
                    {tutor?.mop || 'N/A'}
                </span>
            );
        },
    },
    {
        accessorKey: 'number',
        header: 'Number',
        cell: ({ row }) => {
            const tutor = row.original.tutor;
            return <span>{tutor?.number || 'N/A'}</span>;
        },
    },
    {
        accessorKey: 'booking_status',
        header: 'Booking Status',
        cell: ({ row }) => {
            const status = row.getValue('booking_status') as string;
            return (
                <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <Badge
                        variant="outline"
                        className={`${getStatusColor(status)} border`}
                    >
                        {status?.charAt(0).toUpperCase() + status?.slice(1)}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'tutor_status',
        header: 'Tutor Response',
        cell: ({ row }) => {
            const tutorStatus = row.getValue('tutor_status') as string;
            return (
                <div className="flex items-center gap-2">
                    {getTutorStatusIcon(tutorStatus)}
                    <Badge
                        variant="outline"
                        className={`${getTutorStatusColor(tutorStatus)} border`}
                    >
                        {tutorStatus?.charAt(0).toUpperCase() +
                            tutorStatus?.slice(1)}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const tutor = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Booking Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className='text-green-400'>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                            Pay Booking
                        </DropdownMenuItem>

                        <DropdownMenuItem className='text-red-400'>
                            <XCircle className="mr-2 h-4 w-4 text-red-400" />
                            Cancel Booking
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
