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
import { X } from 'lucide-react';

export function ProductEntryModal({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductData) => void;
}) {
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState('');
    const [quantity, setQuantity] = useState('');

    // Calculate total amount
    const totalAmount = (() => {
        const rateValue = parseFloat(rate);
        const quantityValue = parseFloat(quantity);
        return isNaN(rateValue) || isNaN(quantityValue) ? 0 : rateValue * quantityValue;
    })();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            description,
            rate: parseFloat(rate),
            quantity: parseInt(quantity),
            amount: totalAmount,
        });
        // Optionally reset form or close modal
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
                        <Button type="submit" className="w-full bg-[#605BFF] hover:bg-[#5050FF]">
                            Add Product
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Usage in a parent component
export function ParentComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (productData: any) => {
        // Handle product submission logic
        console.log(productData);
    };

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>

            <ProductEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

// TypeScript interface for type safety
interface ProductData {
    description: string;
    rate: number;
    quantity: number;
    amount: number;
}
