'use client';
import React, { useState } from 'react';
import ImageFileInput from './ImageFileInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceValidationSchema } from '@/zodSchemas/InvoiceSchemas';
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/custom/DatePicker';
import ProductsTable from './ProductsTable';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { ProductEntryModal } from './ProductEntryForm';
import { useRouter } from 'next/navigation';
const CreateInvoice = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof invoiceValidationSchema>>({
        resolver: zodResolver(invoiceValidationSchema),
        mode: 'onBlur',
    });

    const [showProductEntryForm, setShowProductEntryForm] = useState(false);
    const handleShowForm = () => {
        setShowProductEntryForm(!showProductEntryForm);
        console.log(showProductEntryForm);
    };

    const generateInvoiceId = (lastInvoiceId: string | null = null) => {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
        const prefix = 'INV';

        let newNumber = 1;

        if (lastInvoiceId) {
            const lastNumber = parseInt(lastInvoiceId.split('-')[2], 10);
            if (!isNaN(lastNumber)) {
                newNumber = lastNumber + 1;
            }
        }

        const formattedNumber = newNumber.toString().padStart(3, '0');
        return `${prefix}-${formattedDate}-${formattedNumber}`;
    };

    // Usage:
    const lastInvoiceId = 'INV-20241213-045';
    const newInvoiceId = generateInvoiceId(lastInvoiceId);

    return (
        <div className="w-full h-full bg-white rounded-md p-4">
            <h1 className="font-semibold text-lg text-center sm:text-2xl sm:text-left">
                Create New Invoice
            </h1>
            <div className="flex flex-col gap-4 mt-8">
                <ImageFileInput />
                <form className="w-full flex flex-col gap-5">
                    {/* invoice id and date */}
                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Invoice id</label>
                            <Input
                                className="w-full max-w-[280px]"
                                value={generateInvoiceId()}
                                readOnly
                                placeholder="#000001"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold">
                                Date of issueing invoice
                            </label>
                            <DatePickerWithPresets />
                        </div>
                    </div>

                    {/* conpany/ bussiness details */}
                    <h3 className="font-semibold text-[15px] text-center sm:text-left">From:</h3>
                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row ">
                        <div>
                            <label className="text-sm font-semibold">Company Name</label>
                            <Input className="w-full max-w-[280px]" placeholder="company name" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <Input
                                type="email"
                                className="w-full max-w-[280px]"
                                placeholder="name@business.com"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row ">
                        <div>
                            <label className="text-sm font-semibold">Address</label>
                            <Input className="w-full max-w-[280px]" placeholder="street" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Phone</label>
                            <Input
                                type="text"
                                className="w-full max-w-[280px]"
                                placeholder="+233 123 456 7890"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-2 place-items-center "></div>

                    {/* to: the receipient of the invoice */}
                    <h3 className="font-semibold text-[15px] text-center sm:text-left">To:</h3>
                    <div className="w-full flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Full Name</label>
                            <Input className="w-full max-w-[280px]" placeholder="John Doe" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <Input
                                type="email"
                                className="w-full max-w-[280px]"
                                placeholder="john.doe@example.com"
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Address</label>
                            <Input className="w-full max-w-[280px]" placeholder="street" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Phone</label>
                            <Input
                                type="text"
                                className="w-full max-w-[280px]"
                                placeholder="+233 123 456 7890"
                            />
                        </div>
                    </div>

                    {/* products table displaying products the reciepient acquired */}
                    <div>
                        <div className="w-full flex place-items-center justify-between py-1">
                            <h3 className="font-semibold text-[15px] ">Product(s) Description</h3>
                            <Button
                                type="button"
                                className="bg-[#605BFF] hover:bg-[#4b46e0]"
                                onClick={() => {
                                    router.push('?modal=add');
                                    handleShowForm();
                                }}
                            >
                                <PlusIcon />
                            </Button>
                        </div>

                        {/* products table */}
                        {/* add product form */}
                        {/* <div className="w-full bg-slate-100 h-[100px] flex place-items-center justify-center">
                            <h4 className="text-gray-500 text-sm">No products</h4>
                        </div> */}
                        <div className="overflow-x-auto w-full min-w-[300px] border">
                            <ProductsTable handleShowForm={handleShowForm} />
                        </div>
                    </div>
                    {showProductEntryForm && (
                        <ProductEntryModal
                            isOpen={showProductEntryForm}
                            onClose={() => {
                                //replace the query parameters
                                router.replace('/invoice', undefined);
                                setShowProductEntryForm(false);
                                handleShowForm();
                            }}
                            onSubmit={() => console.log('submit form')}
                        />
                    )}

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="bg-[#605BFF] hover:bg-[#4b46e0]"
                            disabled={Object.keys(errors).length > 0}
                        >
                            Create Invoice
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvoice;
