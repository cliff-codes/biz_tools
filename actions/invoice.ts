"use server";

import prisma from "@/lib/db";
import { InvoiceProduct } from "@/types";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { invoiceFormSchema } from "@/zodSchemas/InvoiceSchemas";


// Function to create invoice
export const createInvoice = async (data: FieldValues, items: InvoiceProduct[]) => {
  try {
    console.log("Validating invoice data...");

    // Validate data using Zod schema
    const validatedData = invoiceFormSchema.parse(data);

    console.log("Validation successful. Creating invoice...");
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
      throw new Error("Failed to create invoice.");
    }

    console.log(`Invoice ${invoiceId} created successfully. Adding items...`);

    // Create related items
    await Promise.all(
      items.map(async (item) => {
        if (!item.description || !item.rate || !item.quantity || !item.amount) {
          throw new Error("Invalid item data.");
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

    revalidatePath("/"); 

    return invoice.id;
  } catch (error) {
    console.error("Error creating invoice:", error);

    // Handle specific Zod errors or generic errors
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation failed: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }

    throw new Error("An unexpected error occurred while creating the invoice.");
  }
};


export const generateInvoiceNumber = async() => {
    const year = new Date().getFullYear();
    const prefix = 'INV';

    const count = await prisma.invoice.count({
        where: {
            invoiceId: {    
                startsWith: prefix,
                contains: year.toString(),
            }
        }
    })
    console.log("count: " + count)
    // format number with padding (INV-year-00001)
    const sequence = String(count + 1).padStart(4,'0')
    return `${prefix}-${year}-${sequence}`;
}
