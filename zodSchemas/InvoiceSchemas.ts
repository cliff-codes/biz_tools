import { z } from 'zod';

export const invoiceValidationSchema = z.object({
    //business logo url
    logoUrl: z.string().optional(),
    // invoice details
    customerName: z.string().min(3).max(50),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(10).max(15),
    invoiceDate: z.date(),

    // invoice items
    items: z.array(
        z.object({
            itemName: z.string().min(3).max(50),
            itemQuantity: z.number(),
            itemPrice: z.number().min(0.01),
        })
    ),

    // invoice totals
    subtotal: z.number().min(0.01),
    taxRate: z.number().min(0).max(1),
    discount: z.number().min(0).optional(),
    total: z.number().min(0.01),

    // payment details
    paymentMethod: z.enum(['cash', 'card', 'online']),
});
