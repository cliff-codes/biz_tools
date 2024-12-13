'use client';
import React from 'react';
import ImageFileInput from './ImageFileInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceValidationSchema } from '@/zodSchemas/InvoiceSchemas';
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/custom/DatePicker';
const CreateInvoice = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof invoiceValidationSchema>>({
        resolver: zodResolver(invoiceValidationSchema),
        mode: 'onBlur',
    });

    return (
        <div className="w-full h-full bg-white rounded-md p-4">
            <h1 className="font-semibold text-3xl">Create New Invoice</h1>
            <div className="flex flex-col gap-4 mt-8">
                <ImageFileInput />
                <form className="w-full flex flex-col gap-5">
                    {/* invoice id and date */}
                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Invoice id</label>
                            <Input className="w-full max-w-[280px]" placeholder="#000001" />
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
                        <h3 className="font-semibold text-[15px] ">Product(s) Description</h3>

                        {/* products table */}
                        {/* add product form */}
                        <div className="w-full bg-slate-100 h-[100px]"></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvoice;
