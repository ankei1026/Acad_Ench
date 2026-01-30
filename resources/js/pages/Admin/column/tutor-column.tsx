'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    BookOpen,
    CheckCircle,
    DollarSign,
    MoreHorizontal,
    XCircle,
} from 'lucide-react';

export type Tutor = {
    tutor_id: string;
    user: {
        name: string;
        email: string;
    };
    status: 'active' | 'inactive';
    rate_per_hour: string;
    photo: string;
    subject: string;
    total_sessions?: number;
    location?: string;
    created_at?: string;
};

export const columns: ColumnDef<Tutor>[] = [
    {
        accessorKey: 'tutor_id',
        header: 'Tutor ID',
        cell: ({ row }) => {
            return (
                <div className="font-mono text-sm text-gray-600">
                    {row.original.tutor_id}
                </div>
            );
        },
    },
    {
        accessorFn: (row) => row.user.name,
        id: 'name',
        header: 'Tutor',
        cell: ({ row }) => {
            const tutor = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                        <img
                            src={tutor.photo || '/assets/default.webp'}
                            alt={tutor.user.name}
                            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    '/assets/default.webp';
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                            {tutor.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            {tutor.user.email}
                        </span>
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
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{row.original.subject}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const isActive = status === 'active';

            return (
                <Badge
                    variant={isActive ? 'default' : 'secondary'}
                    className={` ${
                        isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } `}
                >
                    {isActive ? (
                        <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                        </>
                    ) : (
                        <>
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactive
                        </>
                    )}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const tutor = row.original;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [isLoading, setIsLoading] = useState(false);
            const [action, setAction] = useState<'activate' | 'deactivate'>('deactivate');

            const handleOpenDialog = (act: 'activate' | 'deactivate') => {
                setAction(act);
                setDialogOpen(true);
            };

            const handleConfirm = () => {
                setIsLoading(true);

                router.patch(
                    `/admin/tutors/${tutor.tutor_id}/update-status`,
                    {},
                    {
                        onSuccess: () => {
                            const pastTense = action === 'activate' ? 'activated' : 'deactivated';
                            toast.success(`Tutor ${tutor.user.name} has been ${pastTense} successfully!`);
                            setDialogOpen(false);
                        },
                        onError: () => {
                            toast.error('Failed to update tutor status');
                        },
                        onFinish: () => {
                            setIsLoading(false);
                        },
                    }
                );
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {tutor.status === 'active' ? (
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleOpenDialog('deactivate')}
                                >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Deactivate Tutor
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() => handleOpenDialog('activate')}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate Tutor
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Confirmation Dialog */}
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {action === 'activate' ? 'Activate Tutor' : 'Deactivate Tutor'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to {action === 'activate' ? 'activate' : 'deactivate'}{' '}
                                    <span className="font-semibold text-gray-900">{tutor.user.name}</span>?
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="flex gap-3 justify-end">
                                <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                    className={action === 'activate' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                                >
                                    {isLoading ? (action === 'activate' ? 'Activating...' : 'Deactivating...') : (action === 'activate' ? 'Activate' : 'Deactivate')}
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
];
