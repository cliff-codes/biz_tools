import React, { useReducer } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';
import { useInvoiceStore } from '@/store/Invoice';
import { useRouter } from 'next/navigation';

const ProductsTable = ({ handleShowForm }: { handleShowForm: () => void }) => {
    const router = useRouter();
    const products = useInvoiceStore((state) => state.products);
    const removeProduct = useInvoiceStore((state) => state.removeProduct);

    const openEditModal = (productId: number) => {
        router.push(`?modal=edit&id=${productId}`);
    };

    return (
        <Table className="w-full">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-[#4e49e49c]">
                <TableRow>
                    <TableHead className="w-[100px] text-white/90 font-semibold">
                        Descirption
                    </TableHead>
                    <TableHead className="text-white/90 font-semibold">Rate</TableHead>
                    <TableHead className="text-white/90 font-semibold">QTY</TableHead>
                    <TableHead className="text-right text-white/90 font-semibold">Amount</TableHead>
                    <TableHead className="text-white/90 font-semibold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.rate}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell className="text-right">{product.amount}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger>
                                    <Ellipsis />
                                </PopoverTrigger>
                                <PopoverContent className="border-2 border-slate-200 bg-white rounded-md w-auto h-auto flex gap-2">
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        onClick={() => {
                                            openEditModal(product.id);
                                            handleShowForm();
                                        }}
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        onClick={() => {
                                            removeProduct(index);
                                        }}
                                    >
                                        remove
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductsTable;
