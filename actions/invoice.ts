"use server"
import prisma from "@/lib/db"
import { InvoiceProduct } from "@/types"
import { FieldValues } from "react-hook-form"



export const createInvoice = async(data: FieldValues, items: InvoiceProduct[]) => {
    console.log("creating invoice...")
    console.log(data)
    const {invoiceId, businessName, businessEmail, businessAddress, businessPhone, recipientName, recipientEmail, recipientAddress, recipientPhone} = data
    const invoice = await prisma.invoice.create({ 
        data: {
            businessAddress,
            businessEmail,
            businessName,
            businessPhone,
            recipientAddress,
            recipientEmail,
            recipientName,
            recipientPhone,
            invoiceId
        }
    })
    
    if(invoice) {
        await Promise.all(items.map(async (item) => {
            await prisma.item.create({
                data: {
                    invoiceId: invoice.id,
                    description: item.description,
                    rate: item.rate,
                    quantity: item.quantity,
                    totalAmount: item.amount
                }
            })
        }))
        console.log("invoice created successfully")
        return invoice.id
    }
    
}
