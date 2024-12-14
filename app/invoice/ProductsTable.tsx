import React from 'react';
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

const ProductsTable = () => {
    const products = useInvoiceStore((state) => state.products);

    return (
        <Table className="w-full">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-[#605BFF]">
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
                                    <Button type="button" variant={'outline'}>
                                        edit
                                    </Button>
                                    <Button type="button" variant={'outline'}>
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
