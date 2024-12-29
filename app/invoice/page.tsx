'use client';
import React, { useState } from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicePreview from './InvoicePreview';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const InvoicePage = () => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className="flex-1 flex gap-4 px-5 relative">
            <div className=" h-full flex-1 ">
                <CreateInvoice />
            </div>

            {/* preview for larger screens*/}
            <div className="hidden xl:flex flex-1">
                <InvoicePreview />
            </div>

            {/* preview drawer for smaller screens */}
            <div
                className={`fixed top-0 right-0 w-full h-full flex-1 ${
                    showPreview ? 'block' : 'hidden'
                } box-border`}
            >
                <div className="w-full h-full flex justify-center place-items-center">
                    {/* shadow overlay */}
                    <div className="fixed top-0 left-0 w-full h-full z-40 bg-black opacity-40"></div>
                    <div className="z-50">
                        <InvoicePreview />
                    </div>
                </div>
            </div>

            {/* preview button on smaller screens. This button draws in invoice Preview from the right side of the screen */}
            <div className={`xl:hidden fixed top-1 right-0 z-50 transition-all .2 ease-linear`}>
                <Button
                    className="bg-[#6e69ff] font-semibold hover:bg-[#433df3]"
                    onClick={() => setShowPreview(!showPreview)}
                >
                    {showPreview ? <X /> : 'Preview Invoice'}
                </Button>
            </div>
        </div>
    );
};

export default InvoicePage;
