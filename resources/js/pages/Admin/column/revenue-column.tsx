'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface RevenueTransaction {
    id: number;
    date: string;
    tutor: string;
    learner: string;
    amount: number;
    receipt_image?: string | null;
}

export const columns: ColumnDef<RevenueTransaction>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'tutor',
        header: 'Tutor',
    },
    {
        accessorKey: 'learner',
        header: 'Learner',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => `₱${row.original.amount.toLocaleString()}`,
    },
    {
        accessorKey: 'receipt_image',
        header: 'Receipt',
        cell: ({ row }) => {
            const image = row.original.receipt_image;
            if (!image) {
                return <Badge variant="secondary">No Receipt</Badge>;
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            View
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <img
                            src={image}
                            alt="Receipt"
                            className="h-auto w-full rounded-md"
                        />
                    </DialogContent>
                </Dialog>
            );
        },
    },
];
