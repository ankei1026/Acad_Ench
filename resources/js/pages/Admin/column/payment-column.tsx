'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AlertCircle, CheckCircle, Clock, CreditCard, Smartphone, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
                    <Badge className={statusStyles[status as keyof typeof statusStyles]}>
                        {isPaid ? 'Paid' : 'Pending'}
                    </Badge>
                </div>
            );
        },
    },
];
