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
import { ColumnDef } from '@tanstack/react-table';
import {
    BookOpen,
    CheckCircle,
    Eye,
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
        accessorKey: 'user',
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
                        {tutor.status === 'active' && (
                            <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        )}
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
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{row.original.subject}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'rate_per_hour',
        header: 'Rate',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        ₱
                        {parseFloat(row.original.rate_per_hour).toLocaleString(
                            'en-PH',
                        )}
                        /hr
                    </span>
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
            return (
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
                            <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate Tutor
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate Tutor
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
