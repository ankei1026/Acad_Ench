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
import { ColumnDef } from '@tanstack/react-table';
import {
    Calendar,
    Mail,
    MoreHorizontal,
    User2,
    XCircle,
} from 'lucide-react';
import { formatDateTime } from '@/lib/dateTimeFormat';

export type Learner = {
    id: string;
    name: string;
    email: string;
    created_at: string;
};

export const columns: ColumnDef<Learner>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <User2 />
                    <div>
                        <p className="font-medium text-gray-900">
                            {row.original.name}
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {row.original.email}
                </div>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Joined Date',
        cell: ({ row }) => {
            const { date, time } = formatDateTime(row.original.created_at);
            return (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{date}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const learner = row.original;
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
                        <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
