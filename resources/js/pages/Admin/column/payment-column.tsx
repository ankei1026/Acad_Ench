'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export type Payment = {
    id: string;
    photo: string;
    amount: number;
    status: 'paid' | 'pending';
    mop: 'gcash' | 'paymaya';
    name: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'photo',
        header: 'Photo',
        cell: ({ row }) => (
            <img
                src={row.getValue('photo')}
                alt="Profile"
                className="h-16 w-16"
            />
        ),
    },
    {
        accessorKey: 'name',
        header: 'Name',
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

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'mop',
        header: 'Method of Payment',
        cell: ({ row }) => {
            const mop = row.getValue('mop');
            return (
                <div className="capitalize">
                    {mop === 'gcash' ? 'GCash' : 'PayMaya'}
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

            return (
                <div className="flex items-center gap-2">
                    {isPaid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={`font-medium ${isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                        {isPaid ? 'Paid' : 'Pending'}
                    </span>
                </div>
            );
        },
    },
];
