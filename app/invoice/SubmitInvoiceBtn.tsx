'use client';
import { useFormStatus } from 'react-dom';
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

const SubmitInvoiceBtn = ({ disabled }: { disabled: boolean }) => {
    const { pending } = useFormStatus();
    return (
        <div>
            <Button
                type="submit"
                disabled={disabled}
                className={`bg-[#605BFF] hover:bg-[#4b46e0] flex place-items-center justify-center`}
            >
                {pending ? <LoaderCircle className="18" /> : 'Create Invoice'}
            </Button>
        </div>
    );
};

export default SubmitInvoiceBtn;
