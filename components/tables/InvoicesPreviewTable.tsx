import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { SavedInvoice } from '@/types';
import { Button } from '../ui/button';

const InvoicesPreviewTable = ({ invoices }: { invoices: SavedInvoice[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Invoice rows */}
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoiceId}</TableCell>
                        <TableCell>{invoice.createdAt.toLocaleString()}</TableCell>
                        <TableCell>{invoice.businessName}</TableCell>
                        <TableCell>{invoice.recipientName}</TableCell>
                        <TableCell className="flex place-items-center gap-2 ">
                            {/* Add action buttons here */}
                            <Button>View</Button>
                            <Button>Download</Button>
                            <Button>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <tfoot>
                <TableRow>
                    <TableCell colSpan={5}>
                        {/* Add pagination or infinite scroll here */}
                    </TableCell>
                </TableRow>
            </tfoot>
        </Table>
    );
};

export default InvoicesPreviewTable;
