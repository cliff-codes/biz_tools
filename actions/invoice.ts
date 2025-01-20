'use server';

import prisma from '@/lib/db';
import { DeleteInvoiceResponse, InvoiceProduct } from '@/types';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { invoiceFormSchema, deleteInvoiceSchema } from '@/zodSchemas/InvoiceSchemas';

export const createInvoice = async (data: FieldValues, items: InvoiceProduct[]) => {
    try {
        console.log('Validating invoice data...');

        // Validate data using Zod schema
        const validatedData = invoiceFormSchema.parse(data);

        console.log('Validation successful. Creating invoice...');
        const {
            invoiceId,
            businessName,
            businessEmail,
            businessAddress,
            businessPhone,
            recipientName,
            recipientEmail,
            recipientAddress,
            recipientPhone,
        } = validatedData;

        // Create the invoice
        const invoice = await prisma.invoice.create({
            data: {
                invoiceId,
                businessName,
                businessEmail,
                businessAddress,
                businessPhone,
                recipientName,
                recipientEmail,
                recipientAddress,
                recipientPhone,
            },
        });

        if (!invoice) {
            throw new Error('Failed to create invoice.');
        }

        console.log(`Invoice ${invoiceId} created successfully. Adding items...`);

        // Create related items
        await Promise.all(
            items.map(async (item) => {
                if (!item.description || !item.rate || !item.quantity || !item.amount) {
                    throw new Error('Invalid item data.');
                }

                await prisma.item.create({
                    data: {
                        invoiceId: invoice.id,
                        description: item.description,
                        rate: item.rate,
                        quantity: item.quantity,
                        totalAmount: item.amount,
                    },
                });
            })
        );

        console.log(`Items for Invoice ${invoiceId} created successfully.`);

        revalidatePath('/');

        return invoice.id;
    } catch (error) {
        console.error('Error creating invoice:', error);

        // Handle specific Zod errors or generic errors
        if (error instanceof z.ZodError) {
            throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
        }

        throw new Error('An unexpected error occurred while creating the invoice.');
    }
};

export const deleteInvoice = async (id: string): Promise<DeleteInvoiceResponse> => {
    try {
        console.log('Deleting invoice with id ' + id);
        // Validate input
        const validatedInput = deleteInvoiceSchema.safeParse({ id });

        if (!validatedInput.success) {
            console.log('validated input : ' + validatedInput.error);
            return {
                success: false,
                message: 'Invalid invoice ID format',
                error: validatedInput.error.errors[0].message,
            };
        }

        const existingInvoice = await prisma.invoice.findUnique({
            where: { id },
        });

        console.log('existingInvoice :' + existingInvoice);

        if (!existingInvoice) {
            return {
                success: false,
                message: `Invoice not found`,
                error: `Invoice with id ${id} not found`,
            };
        }

        const deletedInvoice = await prisma.invoice.delete({
            where: { id },
        })
        console.log('Deleted invoice: ', deletedInvoice);
        revalidatePath('/');

        return {
            success: true,
            message: 'Invoice deleted successfully',
        };
    } catch (error) {
        console.log('Error deleting invoice: ', error);
        return {
            success: false,
            message: 'Failed to delete invoice',
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    } finally{
        await prisma.$disconnect();
    }
};

export const generateInvoiceNumber = async () => {
    const year = new Date().getFullYear();
    const prefix = 'INV';

    const count = await prisma.invoice.count({
        where: {
            invoiceId: {
                startsWith: prefix,
                contains: year.toString(),
            },
        },
    });
    console.log('count: ' + count);
    // format number with padding (INV-year-00001)
    const sequence = String(count + 1).padStart(4, '0');
    return `${prefix}-${year}-${sequence}`;
};

export const saveInvoicePdf = async(pdfBlob: Blob, invoiceId: string) => {
    try {
        const arrayBuffer = await pdfBlob.arrayBuffer();
        const pdfBuffer = Buffer.from(arrayBuffer);
        const savedPdf = await prisma.pdfDocument.create({
            data: {
                invoiceId,
                content: pdfBuffer
            },
        });
        console.log('savedPdf: ', savedPdf);
        return savedPdf;
    } catch (error) {
        console.error("Error Saving PDF: ", error);
        throw error;
    }
}
