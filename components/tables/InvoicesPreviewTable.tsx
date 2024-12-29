'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { SavedInvoice } from '@/types';
import { Download, Eye, Loader, Trash } from 'lucide-react';
import { deleteInvoice } from '@/actions/invoice';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'react-toastify';

const InvoicesPreviewTable = ({ invoices }: { invoices: SavedInvoice[] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpenInvoiceId, setDialogOpenInvoiceId] = useState<string | null>(null);

    const handleDeleteInvoice = async (invoiceId: string) => {
        console.log('Invoice Id: ' + invoiceId);
        setIsLoading(true);
        try {
            const res = await deleteInvoice(invoiceId);
            if (res.success) {
                console.log('Invoice deleted successfully');
                toast.success('Invoice deleted successfully!', {
                    position: 'top-center',
                });
            } else {
                console.error('Failed to delete invoice');
                toast.error('Failed to delete invoice', {
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
            toast.error('Failed to delete invoice', { position: 'top-center' });
        } finally {
            setIsLoading(false);
            setDialogOpenInvoiceId(null);
        }
    };

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
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoiceId}</TableCell>
                        <TableCell>{invoice.createdAt.toLocaleString()}</TableCell>
                        <TableCell>{invoice.businessName}</TableCell>
                        <TableCell>{invoice.recipientName}</TableCell>
                        <TableCell className="flex place-items-center justify-center ">
                            <div className="p-2 rounded-lg hover:bg-slate-200">
                                <Eye size={20} className="text-slate-500" />
                            </div>
                            <div className="p-2 rounded-lg hover:bg-slate-200">
                                <Download size={20} className="text-slate-500" />
                            </div>
                            <AlertDialog
                                open={dialogOpenInvoiceId === invoice.id}
                                onOpenChange={(open) =>
                                    setDialogOpenInvoiceId(open ? invoice.id : null)
                                }
                            >
                                <AlertDialogTrigger>
                                    <div className="p-2 rounded-lg hover:bg-slate-200">
                                        <Trash size={20} className="text-slate-500" />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete Invoice with id {invoice.invoiceId}
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>

                                    <AlertDialogDescription>
                                        Are you sure you want to delete this invoice? This action
                                        cannot be undone.
                                    </AlertDialogDescription>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteInvoice(invoice.id)}
                                        >
                                            {isLoading ? <Loader /> : 'Delete'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default InvoicesPreviewTable;
