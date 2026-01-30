import { Badge } from '@/components/ui/badge';
import { formatDate, formatTimeRange } from '@/lib/dateTimeFormat';
import { ColumnDef } from '@tanstack/react-table';
import {
    Calendar,
    CheckCircle,
    Clock,
    MoreHorizontal,
    Wallet,
    XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
        subject: string;
        photo?: string;
        mop: string;
        number: string;
    };
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100';
        case 'paid':
            return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100';
        case 'canceled':
            return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100';
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
            return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100';
        case 'decline':
            return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100';
        case 'success':
            return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100';
        case 'failed':
            return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100';
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

const getImageSrc = (photo?: string) => {
    if (photo) {
        // If photo already contains a full URL or path
        if (photo.startsWith('http') || photo.startsWith('/storage/')) {
            return photo;
        }
        // Otherwise, prepend /storage/
        return `/storage/${photo}`;
    }
    return '/assets/default.webp';
};

export const learnerBookingColumns: ColumnDef<BookingColumn>[] = [
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
        accessorKey: 'tutor.user.name',
        header: 'Tutor',
        cell: ({ row }) => {
            const tutor = row.original.tutor;
            const tutorName = tutor?.user?.name || 'Unknown Tutor';
            const photoUrl = getImageSrc(tutor?.photo);

            return (
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                        <img
                            src={photoUrl}
                            alt={tutorName}
                            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    '/assets/default.webp';
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                            {tutorName}
                        </span>
                        <span className="text-sm text-gray-500">
                            {tutor?.subject || 'N/A'}
                        </span>
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
        accessorKey: 'session_duration',
        header: 'Duration',
        cell: ({ row }) => {
            const duration = row.getValue('session_duration');
            const numericDuration =
                typeof duration === 'string' ? parseFloat(duration) : duration;
            return (
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">
                        {duration
                            ? `${numericDuration} hr${numericDuration !== 1 ? 's' : ''}`
                            : 'N/A'}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = row.getValue('amount') as string;
            const numericAmount = parseFloat(amount) || 0;
            return (
                <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">
                        ₱{' '}
                        {numericAmount.toLocaleString('en-PH', {
                            minimumFractionDigits: 2,
                        })}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'booking_status',
        header: 'Booking Status',
        cell: ({ row }) => {
            const status = row.getValue('booking_status') as string;
            const formattedStatus =
                status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';

            return (
                <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <Badge
                        variant="outline"
                        className={`${getStatusColor(status)} px-3 py-1 font-medium`}
                    >
                        {formattedStatus}
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
            const formattedStatus =
                tutorStatus?.charAt(0).toUpperCase() + tutorStatus?.slice(1) ||
                'Pending';

            return (
                <div className="flex items-center gap-2">
                    {getTutorStatusIcon(tutorStatus)}
                    <Badge
                        variant="outline"
                        className={`${getTutorStatusColor(tutorStatus)} px-3 py-1 font-medium`}
                    >
                        {formattedStatus}
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
            return <Actions booking={booking} />;
        },
    },
];

// Actions component for a booking row
function Actions({ booking }: { booking: any }) {
    const [declineOpen, setDeclineOpen] = useState(false);
    const [payOpen, setPayOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        reference: '',
        amount: booking.amount || '',
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    useEffect(() => {
        // cleanup object URL when component unmounts or preview changes
        return () => {
            if (photoPreview && photoPreview.startsWith('blob:')) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    function handleFile(file: File | null) {
        if (!file) return;

        // basic client-side validation
        if (!file.type.startsWith('image/')) {
            setPhotoError('Please upload an image file.');
            setData('photo', null);
            return;
        }

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            setPhotoError('File is too large. Max size is 2 MB.');
            setData('photo', null);
            return;
        }

        setPhotoError(null);
        setData('photo', file);
        setPhotoName(file.name);

        try {
            const url = URL.createObjectURL(file);
            setPhotoPreview(url);
        } catch (err) {
            setPhotoPreview(null);
        }
    }

    function removeFile() {
        setData('photo', null);
        setPhotoPreview(null);
        setPhotoName(null);
        setPhotoError(null);
    }

    const isPending = booking.booking_status === 'pending';
    const canPay = isPending && booking.tutor_status === 'accept';
    const isDeclined = booking.tutor_status === 'decline';

    function submitPayment(e: any) {
        e.preventDefault();

        post(`/learner/bookings/${booking.book_id}/receipt`, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Payment submitted');
                removeFile();
                reset();
                setPayOpen(false);
            },
            onError: () => {
                // errors will be available via `errors`
            },
        });
    }

    function confirmCancel() {
        router.patch(
            `/learner/bookings/${booking.book_id}/cancel`,
            {
                onSuccess: () => {
                    toast.success('Booking canceled');
                    setCancelOpen(false);
                },
                onError: () => {
                    toast.error('Unable to cancel booking');
                },
            },
        );
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="font-semibold">
                        Booking Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Show decline reason viewer */}
                    {isDeclined && (
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setDeclineOpen(true)}
                        >
                            <XCircle className="mr-2 h-4 w-4 text-red-600" />
                            View Decline Reason
                        </DropdownMenuItem>
                    )}

                    {/* Show pay & cancel ONLY when tutor accepted and booking is pending */}
                    {canPay && (
                        <>
                            <DropdownMenuItem
                                className="cursor-pointer text-green-600 focus:text-green-600"
                                onClick={() => setPayOpen(true)}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Pay Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-red-600 focus:text-red-600"
                                onClick={() => setCancelOpen(true)}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Booking
                            </DropdownMenuItem>
                        </>
                    )}

                    {/* Fallback: show view cancellation if canceled */}
                    {booking.booking_status === 'canceled' && (
                        <DropdownMenuItem className="cursor-pointer text-gray-600">
                            <Clock className="mr-2 h-4 w-4" />
                            View Cancellation
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Decline reason dialog */}
            <AlertDialog open={declineOpen} onOpenChange={setDeclineOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Decline Reason</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="pt-2">
                        <p className="text-sm text-gray-700">
                            {booking.decline_reason || 'No reason provided.'}
                        </p>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Payment dialog */}
            <AlertDialog open={payOpen} onOpenChange={setPayOpen}>
                <AlertDialogContent className="w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Submit Payment</AlertDialogTitle>
                    </AlertDialogHeader>

                    <form onSubmit={submitPayment} className="grid gap-3 py-2">
                        <div>
                            <Label>Mode of Payment </Label>
                            <Input
                                value={booking.tutor.mop}
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Numbe</Label>
                            <Input
                                value={booking.tutor.number}
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Amount (₱)</Label>
                            <Input
                                value={data.amount}
                                onChange={(e: any) =>
                                    setData('amount', e.target.value)
                                }
                                disabled
                                required
                            />
                            {errors.amount && (
                                <p className="text-xs text-red-600">
                                    {errors.amount}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Reference/Transaction ID</Label>
                            <Input
                                value={data.reference}
                                onChange={(e: any) =>
                                    setData('reference', e.target.value)
                                }
                                required
                            />
                            {errors.reference && (
                                <p className="text-xs text-red-600">
                                    {errors.reference}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Upload Receipt Photo</Label>

                            {/* File upload dropzone / preview */}
                            <div
                                className="mt-2 flex items-center gap-4"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e: any) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer?.files?.[0];
                                    if (file) handleFile(file);
                                }}
                            >
                                {photoPreview ? (
                                    <div className="relative">
                                        <img
                                            src={photoPreview}
                                            alt="Receipt preview"
                                            className="h-24 w-32 rounded-md border object-cover"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Remove file"
                                            onClick={() => removeFile()}
                                            className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white shadow"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor={`receipt-${booking.book_id}`}
                                        className="inline-flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414a2 2 0 00-.586-1.414L13 1.586A2 2 0 0011.586 1H4zM7 8a1 1 0 112 0v2h2V8a1 1 0 112 0v2h1a1 1 0 110 2h-1v2a1 1 0 11-2 0v-2H9v2a1 1 0 11-2 0v-2H6a1 1 0 110-2h1V8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm text-gray-600">
                                            Choose image
                                        </span>
                                        <input
                                            id={`receipt-${booking.book_id}`}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e: any) =>
                                                handleFile(e.target.files?.[0])
                                            }
                                        />
                                    </label>
                                )}

                                <div className="flex-1 text-sm text-gray-500">
                                    <div>
                                        Accepted: PNG, JPG. Max size: 2 MB.
                                    </div>
                                    {photoName && (
                                        <div className="mt-1 text-xs text-gray-600">
                                            {photoName}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {photoError && (
                                <p className="mt-2 text-xs text-red-600">
                                    {photoError}
                                </p>
                            )}
                            {errors.photo && (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.photo}
                                </p>
                            )}
                        </div>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={processing}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                type="submit"
                                disabled={processing}
                            >
                                Submit Payment
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            {/* Cancel confirmation */}
            <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="pt-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to cancel this booking? This
                            action cannot be undone.
                        </p>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={false}>
                            No
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCancel}>
                            Yes, Cancel
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
