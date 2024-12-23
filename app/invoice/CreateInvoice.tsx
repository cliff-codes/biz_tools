'use client';
import React, { useState } from 'react';
import ImageFileInput from './ImageFileInput';
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/custom/DatePicker';
import ProductsTable from './ProductsTable';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { ProductEntryModal } from './ProductEntryForm';
import { useRouter } from 'next/navigation';
import { useInvoiceStore } from '@/store/Invoice';
import { useForm } from 'react-hook-form';
const CreateInvoice = () => {
    const router = useRouter();
    const setBizInfo = useInvoiceStore((state) => state.setBuzinessInfo);
    const setRecipientInfo = useInvoiceStore((state) => state.setRecipientInfo);
    const generateInvoiceId = useInvoiceStore((state) => state.generateInvoiceNumber);

    const [showProductEntryForm, setShowProductEntryForm] = useState(false);
    const [bizInputInfo, setBizInputInfo] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
    });
    const [recipientInputInfo, setRecipientInputInfo] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
    });
    const handleShowForm = () => {
        setShowProductEntryForm(!showProductEntryForm);
        console.log(showProductEntryForm);
    };

    setBizInfo(bizInputInfo);
    setRecipientInfo(recipientInputInfo);

    // ensure all the feilds have been populated before making the create button active, usign react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const watchValues = watch();
    console.log({ ...watchValues });

    return (
        <div className="w-full h-full bg-white rounded-md p-4">
            <h1 className="font-semibold text-lg text-center sm:text-2xl sm:text-left">
                Create New Invoice
            </h1>
            <div className="flex flex-col gap-4 mt-8">
                <ImageFileInput />
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* invoice id and date */}
                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Invoice id</label>
                            <Input
                                className="w-full max-w-[280px]"
                                value={generateInvoiceId()}
                                readOnly
                                placeholder="#000001"
                                {...register('invoiceId', {
                                    required: 'Invoice id is required',
                                })}
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
                            <Input
                                className="w-full max-w-[280px]"
                                placeholder="company name"
                                {...register('companyName', {
                                    required: 'Company name is required',
                                    maxLength: 50,
                                })}
                                onChange={(e) =>
                                    setBizInputInfo({
                                        ...bizInputInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            {errors.companyName?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.companyName.message)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <Input
                                type="email"
                                className="w-full max-w-[280px]"
                                placeholder="name@business.com"
                                {...register('businessEmail', {
                                    required: 'company/business is required',
                                    pattern: {
                                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                onChange={(e) =>
                                    setBizInputInfo({
                                        ...bizInputInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {errors.businessEmail?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.businessEmail.message)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between place-items-center gap-1 flex-col sm:flex-row ">
                        <div>
                            <label className="text-sm font-semibold">Address</label>
                            <Input
                                className="w-full max-w-[280px]"
                                placeholder="street"
                                {...register('businessAddress', {
                                    required: 'business address is required',
                                    maxLength: 100,
                                })}
                                onChange={(e) =>
                                    setBizInputInfo({
                                        ...bizInputInfo,
                                        address: e.target.value,
                                    })
                                }
                            />
                            {errors.businessAddress?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.businessAddress.message)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Phone</label>
                            <Input
                                type="text"
                                className="w-full max-w-[280px]"
                                placeholder="+233 123 456 7890"
                                {...register('businessPhone', {
                                    required: 'business phone is required',
                                    // pattern: {
                                    //     value: /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/,
                                    //     message: 'Invalid phone number format',
                                    // },
                                })}
                                onChange={(e) =>
                                    setBizInputInfo({
                                        ...bizInputInfo,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* to: the receipient of the invoice */}
                    <h3 className="font-semibold text-[15px] text-center sm:text-left">To:</h3>
                    <div className="w-full flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Full Name</label>
                            <Input
                                className="w-full max-w-[280px]"
                                placeholder="John Doe"
                                {...register('recipientName', {
                                    required: 'Recipient name is required',
                                    maxLength: 50,
                                })}
                                onChange={(e) =>
                                    setRecipientInputInfo({
                                        ...recipientInputInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            {errors.recipientName?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.recipientName.message)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <Input
                                type="email"
                                className="w-full max-w-[280px]"
                                placeholder="john.doe@example.com"
                                {...register('recipientEmail', {
                                    required: 'Recipient email is required',
                                    pattern: {
                                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                onChange={(e) =>
                                    setRecipientInputInfo({
                                        ...recipientInputInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            {errors.recipientEmail?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.recipientEmail.message)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-between place-items-center gap-1 flex-col sm:flex-row">
                        <div>
                            <label className="text-sm font-semibold">Address</label>
                            <Input
                                className="w-full max-w-[280px]"
                                placeholder="street"
                                {...register('recipientAddress', {
                                    required: 'Recipient address is required',
                                    maxLength: 100,
                                })}
                                onChange={(e) =>
                                    setRecipientInputInfo({
                                        ...recipientInputInfo,
                                        address: e.target.value,
                                    })
                                }
                            />
                            {errors.recipientAddress?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.recipientAddress.message)}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Phone</label>
                            <Input
                                type="text"
                                className="w-full max-w-[280px]"
                                placeholder="+233 123 456 7890"
                                {...register('recipientPhone', {
                                    required: 'Recipient phone is required',
                                    // pattern: {
                                    //     value: /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/,
                                    //     message: 'Invalid phone number format',
                                    // },
                                })}
                                onChange={(e) =>
                                    setRecipientInputInfo({
                                        ...recipientInputInfo,
                                        phone: e.target.value,
                                    })
                                }
                            />
                            {errors.recipientPhone?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {String(errors.recipientPhone.message)}
                                </p>
                            )}
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
                        <Button type="submit" className="bg-[#605BFF] hover:bg-[#4b46e0]">
                            Create Invoice
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvoice;
