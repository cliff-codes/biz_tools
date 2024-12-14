import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { InvoiceProduct } from '@/types';
import { useInvoiceStore } from '@/store/Invoice';
import { useSearchParams, useRouter } from 'next/navigation';

export function ProductEntryModal({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: InvoiceProduct) => void;
}) {
    const params = useSearchParams();
    const router = useRouter();
    console.log(params.get('modal'));
    const mode = params.get('modal');

    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [quantity, setQuantity] = useState('');

    const addProduct = useInvoiceStore((state) => state.addProduct);
    const totalProducts = useInvoiceStore((state) => state.totalProducts);

    // Calculate total amount
    const totalAmount = (() => {
        const rateValue = parseFloat(rate);
        const quantityValue = parseFloat(quantity);
        return isNaN(rateValue) || isNaN(quantityValue) ? 0 : rateValue * quantityValue;
    })();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: totalProducts + 1, // increment the product id by 1
            description,
            rate: parseFloat(rate),
            quantity: parseInt(quantity),
            amount: totalAmount,
        });
        // close modal
        onClose();
    };

    const handleReset = () => {
        setDescription('');
        setRate('');
        setQuantity('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the product you want to add to the invoice
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="e.g., iPod 2020"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="rate">Rate ($)</Label>
                            <Input
                                id="rate"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                placeholder="1000"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="10"
                                min="1"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Total Amount</Label>
                            <Input
                                id="amount"
                                type="text"
                                value={`$${totalAmount.toLocaleString()}`}
                                readOnly
                                className="bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="w-full"
                        >
                            Clear
                        </Button>
                        <Button
                            type="submit"
                            className="w-full bg-[#605BFF] hover:bg-[#5050FF]"
                            onClick={() => {
                                if (mode === 'add') {
                                    addProduct({
                                        id: totalProducts + 1, // increment the product id by 1
                                        description,
                                        rate: parseFloat(rate),
                                        quantity: parseInt(quantity),
                                        amount: totalAmount,
                                    });
                                    router.replace('/invoice', undefined);
                                } else if (mode === 'edit') {
                                    //edit invoice
                                }
                            }}
                        >
                            {mode === 'add' ? 'Add Product' : 'Update Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
