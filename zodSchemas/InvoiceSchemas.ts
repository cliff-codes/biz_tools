import { z } from 'zod';

export const invoiceFormSchema = z.object({
    invoiceId: z.string().min(1, 'Invoice ID is required'),
    businessName: z.string().min(1, 'Business name is required').max(50),
    businessEmail: z.string().email('Invalid email format'),
    businessAddress: z.string().min(1, 'Business address is required').max(100),
    businessPhone: z.string().min(1, 'Business phone is required'),
    recipientName: z.string().min(1, 'Recipient name is required').max(50),
    recipientEmail: z.string().email('Invalid email format'),
    recipientAddress: z.string().min(1, 'Recipient address is required').max(100),
    recipientPhone: z.string().min(1, 'Recipient phone is required'),
});


    