'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, formatTimeRange } from '@/lib/dateTimeFormat';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    MoreHorizontal,
    User2,
    Wallet,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export type Booking = {
    id: number; // Add this field - it's needed for the update
    book_id: string;
    name: string;
    subject?: string;
    photo?: string;
    amount: number;
    start_time: string;
    end_time: string;
    booking_date: string;
    booking_status: 'pending' | 'paid' | 'canceled';
    tutor_status: 'accept' | 'pending' | 'decline' | 'success' | 'failed';
    receipt?: {
        id: number;
        reference: string;
        amount: number;
        photo?: string | null;
    } | null;
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: 'book_id',
        header: 'Booking ID',
        cell: ({ row }) => (
            <div className="font-mono text-sm font-semibold text-gray-700">
                {row.getValue('book_id')}
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Learner',
        cell: ({ row }) => {
            const booking = row.original;
            return (
                <div className="flex items-center gap-3">
                    <User2 className='h-4 w-4'/>
                    <div>
                        <div className="font-medium">{booking.name}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'booking_date',
        header: 'Date & Time',
        cell: ({ row }) => {
            const date = row.getValue('booking_date') as string;
            const startTime = row.original.start_time;
            const endTime = row.original.end_time;
            return (
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                            {date ? formatDate(date) : 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                            {startTime && endTime
                                ? formatTimeRange(startTime, endTime)
                                : 'N/A'}
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
            return (
                <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-500" />
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
        accessorKey: 'booking_status',
        header: 'Payment Status',
        cell: ({ row }) => {
            const status = row.getValue('booking_status');

            const statusStyles = {
                paid: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
                pending:
                    'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
                canceled:
                    'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
            };

            const statusIcons = {
                paid: <CheckCircle className="h-4 w-4 text-green-600" />,
                pending: <Clock className="h-4 w-4 text-yellow-600" />,
                canceled: <XCircle className="h-4 w-4 text-red-600" />,
            };

            const statusText = {
                paid: 'Paid',
                pending: 'Pending',
                canceled: 'Canceled',
            };

            return (
                <div className="flex items-center gap-2">
                    {statusIcons[status as keyof typeof statusIcons]}
                    <Badge
                        variant="outline"
                        className={`${statusStyles[status as keyof typeof statusStyles]} px-3 py-1 font-medium`}
                    >
                        {statusText[status as keyof typeof statusText]}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'tutor_status',
        header: 'Your Response',
        cell: ({ row }) => {
            const status = row.getValue('tutor_status');

            const statusStyles = {
                pending:
                    'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100',
                accept: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
                decline:
                    'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
                success:
                    'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100',
                failed: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
            };

            const statusIcons = {
                pending: <Clock className="h-4 w-4 text-gray-600" />,
                accept: <CheckCircle className="h-4 w-4 text-green-600" />,
                decline: <XCircle className="h-4 w-4 text-red-600" />,
                success: <CheckCircle className="h-4 w-4 text-blue-600" />,
                failed: <AlertCircle className="h-4 w-4 text-red-600" />,
            };

            const statusText = {
                pending: 'Pending',
                accept: 'Accepted',
                decline: 'Declined',
                success: 'Success',
                failed: 'Failed',
            };

            return (
                <div className="flex items-center gap-2">
                    {statusIcons[status as keyof typeof statusIcons]}
                    <Badge
                        variant="outline"
                        className={`${statusStyles[status as keyof typeof statusStyles]} px-3 py-1 font-medium`}
                    >
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
            return <ActionMenu booking={booking} />;
        },
    },
];

function ActionMenu({ booking }: { booking: Booking }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [viewReceiptOpen, setViewReceiptOpen] = useState(false);
    const { data, setData, patch, processing, reset } = useForm({
        tutor_status: '',
        decline_reason: '',
    });

    const handleOpenDialog = (status: string) => {
        setSelectedStatus(status);
        setData('tutor_status', status);
        // Clear previous reason whenever opening the dialog
        setData('decline_reason', '');
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/tutor/booking/${booking.book_id}/update-status`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    `Your response to booking is updated to ${selectedStatus}.`,
                    {
                        duration: 5000,
                    },
                );
                setIsOpen(false);
                reset();
            },
            onError: () => {
                toast.error(
                    'Failed to update your response. Please try again.',
                    {
                        duration: 5000,
                    },
                );
            },
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        disabled={processing}
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Update Response</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => handleOpenDialog('accept')}
                        disabled={
                            booking.tutor_status === 'accept' || processing
                        }
                        className="cursor-pointer text-green-600 focus:text-green-600"
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                        {booking.tutor_status === 'accept' && (
                            <Badge variant="outline" className="ml-2 text-xs">
                                Current
                            </Badge>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleOpenDialog('success')}
                        disabled={
                            booking.tutor_status === 'success' || processing
                        }
                        className="cursor-pointer text-blue-600 focus:text-blue-600"
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Success
                        {booking.tutor_status === 'success' && (
                            <Badge variant="outline" className="ml-2 text-xs">
                                Current
                            </Badge>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleOpenDialog('decline')}
                        disabled={
                            booking.tutor_status === 'decline' || processing
                        }
                        className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline
                        {booking.tutor_status === 'decline' && (
                            <Badge variant="outline" className="ml-2 text-xs">
                                Current
                            </Badge>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleOpenDialog('failed')}
                        disabled={
                            booking.tutor_status === 'failed' || processing
                        }
                        className="cursor-pointer text-orange-600 focus:text-orange-600"
                    >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Mark as Failed
                        {booking.tutor_status === 'failed' && (
                            <Badge variant="outline" className="ml-2 text-xs">
                                Current
                            </Badge>
                        )}
                    </DropdownMenuItem>

                    {booking.tutor_status === 'pending' && (
                        <div className="px-2 py-1.5 text-xs text-gray-500">
                            Awaiting your response
                        </div>
                    )}

                    <DropdownMenuSeparator />
                    {booking.booking_status === 'paid' ? (
                        <DropdownMenuItem
                            onClick={() => setViewReceiptOpen(true)}
                            className="cursor-pointer"
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Receipt
                        </DropdownMenuItem>
                    ) : (
                        <div className="px-2 py-1.5 text-xs text-gray-500">
                            Receipt available after payment
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Status Update</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to update this booking to{' '}
                            <span className="font-semibold text-foreground">
                                {selectedStatus}
                            </span>
                            ?
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {selectedStatus === 'decline' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Reason for Decline
                                </label>
                                <textarea
                                    value={data.decline_reason}
                                    onChange={(e) =>
                                        setData(
                                            'decline_reason',
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                                    rows={4}
                                    placeholder="Provide a reason for declining this booking"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    processing ||
                                    (selectedStatus === 'decline' &&
                                        !data.decline_reason)
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Updating...' : 'Confirm Update'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* View receipt dialog */}
            <Dialog open={viewReceiptOpen} onOpenChange={setViewReceiptOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Receipt</DialogTitle>
                        <DialogDescription>
                            View receipt details for this booking.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {booking.receipt ? (
                            <>
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        Reference
                                    </div>
                                    <div className="font-medium">
                                        {booking.receipt.reference}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        Amount
                                    </div>
                                    <div className="font-medium">
                                        ₱
                                        {Number(
                                            booking.receipt.amount,
                                        ).toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </div>
                                </div>

                                {booking.receipt.photo ? (
                                    <div>
                                        <div className="text-sm text-muted-foreground">
                                            Photo
                                        </div>
                                        <img
                                            src={booking.receipt.photo}
                                            alt="Receipt"
                                            className="mt-2 max-h-80 w-full rounded-md border object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-600">
                                        No receipt photo uploaded.
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-sm text-gray-600">
                                No receipt found for this booking.
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setViewReceiptOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
