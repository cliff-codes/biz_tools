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
import { Download, Eye, Trash } from 'lucide-react';

const InvoicesPreviewTable = ({ invoices }: { invoices: SavedInvoice[] }) => {
    return (
        <Table>
            <TableHeader className="bg-[#6e69ffdc]">
                <TableRow>
                    <TableHead className="text-white/90 font-semibold">Invoice Id</TableHead>
                    <TableHead className="text-white/90 font-semibold">Created At</TableHead>
                    <TableHead className="text-white/90 font-semibold">From</TableHead>
                    <TableHead className="text-white/90 font-semibold">To</TableHead>
                    <TableHead className="text-white/90 font-semibold w-full flex justify-center place-items-center">
                        Actions
                    </TableHead>
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
                        <TableCell className="flex place-items-center justify-center ">
                            {/* Add action buttons here */}
                            <div className="p-2 rounded-lg hover:bg-slate-200">
                                <Eye size={20} className="text-slate-500" />
                            </div>
                            <div className="p-2 rounded-lg hover:bg-slate-200">
                                <Download size={20} className="text-slate-500" />
                            </div>
                            <div className="p-2 rounded-lg hover:bg-slate-200">
                                <Trash size={20} className="text-slate-500" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default InvoicesPreviewTable;
