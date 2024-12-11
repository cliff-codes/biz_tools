import React from 'react';
import CreateInvoice from './CreateInvoice';

const InvoicePage = () => {
    return (
        <main className="w-full flex gap-4 p-5">
            {/* invoice form */}
            {/* invoice preview */}
            {/* invoice actions */}
            {/* generate invoice button */}
            {/* invoice history */}
            {/* invoice settings */}
            {/* invoice download */}
            {/* invoice export */}
            {/* invoice delete */}
            {/* invoice notes */}
            {/* invoice attachments */}
            {/* invoice payment history */}
            {/* invoice payment methods */}
            {/* invoice payment gateways */}
            {/* invoice payment refunds */}
            {/* invoice payment gateway settings */}
            {/* invoice payment gateway logs */}
            {/* invoice payment gateway test mode */}
            {/* invoice payment gateway test mode settings */}
            {/* invoice payment gateway test mode logs */}
            {/* invoice payment gateway test mode results */}
            {/* invoice payment gateway test mode results export */}
            {/* invoice payment gateway test mode results import */}
            {/* invoice payment gateway test mode results download */}
            {/* invoice payment gateway test mode results delete */}
            {/* invoice payment gatewCreateInvoiceay test mode results settings */}
            <div className=" h-full flex-1 ">
                <CreateInvoice />
            </div>

            {/* preview */}
            <div className="hidden lg:flex">
                <h1>Invoice Preview</h1>
            </div>
        </main>
    );
};

export default InvoicePage;
