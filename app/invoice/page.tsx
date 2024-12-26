import React from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicePreview from './InvoicePreview';

const InvoicePage = () => {
    return (
        <div className="flex-1 flex gap-4 px-5">
            <div className=" h-full flex-1 ">
                <CreateInvoice />
            </div>

            {/* preview */}
            <div className="hidden xl:flex flex-1">
                <InvoicePreview />
            </div>
        </div>
    );
};

export default InvoicePage;
