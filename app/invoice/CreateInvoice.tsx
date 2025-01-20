'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DatePickerWithPresets } from '@/components/custom/DatePicker';
import { ProductEntryModal } from './ProductEntryForm';
import ProductsTable from './ProductsTable';
import ImageFileInput from './ImageFileInput';
import SubmitInvoiceBtn from './SubmitInvoiceBtn';
import { useInvoiceStore } from '@/store/Invoice';
import { createInvoice, generateInvoiceNumber, saveInvoicePdf } from '@/actions/invoice';
import { invoiceFormSchema } from '@/zodSchemas/InvoiceSchemas';
import CreatingInvoiceLoader from '@/components/custom/Loaders/CreatingInvoiceLoader';

// Form schema
type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

const CreateInvoice = () => {
    const router = useRouter();
    const {
        products,
        setBuzinessInfo: setBizInfo,
        setRecipientInfo,
        setInvoiceId,
        generateInvoicePdf,
        recipientInfo,
    } = useInvoiceStore();

    // Form initialization with Zod resolver
    const form = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: {
            invoiceId: '0000000',
            businessName: '',
            businessEmail: '',
            businessAddress: '',
            businessPhone: '',
            recipientName: '',
            recipientEmail: '',
            recipientAddress: '',
            recipientPhone: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = form;

    // State management
    const [showProductEntryForm, setShowProductEntryForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch invoice number on component mount
    useEffect(() => {
        let isMounted = true; // Prevent state updates after unmount
        const fetchInvoiceNumber = async () => {
            try {
                const id = await generateInvoiceNumber();
                if (isMounted && id) {
                    setValue('invoiceId', id);
                    setInvoiceId(id);
                }
            } catch (error) {
                console.error('Failed to generate invoice number:', error);
            }
        };

        fetchInvoiceNumber();
        return () => {
            isMounted = false;
        };
    }, [setValue]);

    // Update global state when form values change
    const businessName = watch('businessName');
    const businessEmail = watch('businessEmail');
    const businessAddress = watch('businessAddress');
    const businessPhone = watch('businessPhone');
    const recipientName = watch('recipientName');
    const recipientEmail = watch('recipientEmail');
    const recipientAddress = watch('recipientAddress');
    const recipientPhone = watch('recipientPhone');

    useEffect(() => {
        setBizInfo({
            name: businessName,
            email: businessEmail,
            address: businessAddress,
            phone: businessPhone,
        });

        setRecipientInfo({
            name: recipientName,
            email: recipientEmail,
            address: recipientAddress,
            phone: recipientPhone,
        });
    }, [
        businessName,
        businessEmail,
        businessAddress,
        businessPhone,
        recipientName,
        recipientEmail,
        recipientAddress,
        recipientPhone,
        setBizInfo,
        setRecipientInfo,
    ]);

    // Form submission handler
    const onSubmit = async (data: InvoiceFormData) => {
        try {
            setIsSubmitting(true);
            if (products.length === 0) {
                throw new Error('At least one product is required');
            }

            const result = await createInvoice(data, products);
            const pdfBlob = await generateInvoicePdf();
            if (!pdfBlob) {
                throw new Error('Error generating invoice pdf to save');
            }
            const savedInvoicePdf = await saveInvoicePdf(pdfBlob, data.invoiceId);
            console.log(result);
            if (result) {
                router.push(`/`); // Redirect to home, todo: later redirect to view invoice page
            }
        } catch (error) {
            console.error('Failed to create invoice:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modal handlers
    const handleShowForm = () => {
        setShowProductEntryForm((prev) => !prev);
    };

    const handleCloseModal = () => {
        if (window.location.search.includes('modal=add')) {
            router.replace('/invoice');
        }
        setShowProductEntryForm(false);
    };

    const hanldeGeneratePdfAndUpload = async () => {
        const pdfBlob = await generateInvoicePdf();
    };

    // Render form fields helper
    const renderFormField = (
        label: string,
        name: keyof InvoiceFormData,
        type: string = 'text',
        placeholder: string
    ) => (
        <div>
            <label className="text-sm font-semibold">{label}</label>
            <Input
                type={type}
                className="w-full max-w-[280px]"
                placeholder={placeholder}
                {...register(name)}
                disabled={isSubmitting}
            />
            {errors[name]?.message && (
                <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
            )}
        </div>
    );

    return (
        <div className="w-full h-full bg-white rounded-md p-4">
            <CreatingInvoiceLoader showLoader={isSubmitting} />
            <h1 className="font-semibold text-lg text-center sm:text-2xl sm:text-left">
                Create New Invoice
            </h1>

            <div className="flex flex-col gap-4 mt-8">
                <ImageFileInput />
                <form
                    className="w-full flex flex-col place-items-center gap-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Invoice ID and Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {renderFormField('Invoice ID', 'invoiceId', 'text', '#000001')}
                        <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-semibold">Date of issuing invoice</label>
                            <DatePickerWithPresets />
                        </div>
                    </div>

                    {/* Business Details */}
                    <h3 className="font-semibold text-[15px] text-center sm:text-left">From</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {renderFormField('Business Name', 'businessName', 'text', 'Business name')}
                        {renderFormField('Email', 'businessEmail', 'email', 'name@business.com')}
                        {renderFormField('Address', 'businessAddress', 'text', 'Street address')}
                        {renderFormField('Phone', 'businessPhone', 'tel', '+233 123 456 7890')}
                    </div>

                    {/* Recipient Details */}
                    <h3 className="font-semibold text-[15px] text-center sm:text-left">To</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {renderFormField('Full Name', 'recipientName', 'text', 'John Doe')}
                        {renderFormField(
                            'Email',
                            'recipientEmail',
                            'email',
                            'john.doe@example.com'
                        )}
                        {renderFormField('Address', 'recipientAddress', 'text', 'Street address')}
                        {renderFormField('Phone', 'recipientPhone', 'tel', '+233 123 456 7890')}
                    </div>

                    {/* Products Section */}
                    <div>
                        <div className="w-full flex place-items-center justify-between py-1">
                            <h3 className="font-semibold text-[15px]">Product(s) Description</h3>
                            <Button
                                type="button"
                                className="bg-[#605BFF] hover:bg-[#4b46e0]"
                                onClick={() => {
                                    router.push('?modal=add', undefined);
                                    handleShowForm();
                                }}
                                disabled={isSubmitting}
                            >
                                <PlusIcon />
                            </Button>
                        </div>

                        <div className="overflow-x-auto w-full min-w-[300px] border">
                            <ProductsTable handleShowForm={handleShowForm} />
                        </div>
                    </div>

                    {/* Product Entry Modal */}
                    {showProductEntryForm && (
                        <ProductEntryModal
                            isOpen={showProductEntryForm}
                            onClose={handleCloseModal}
                            onSubmit={() => console.log('submit form')}
                        />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <SubmitInvoiceBtn disabled={isSubmitting || products.length === 0} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvoice;
