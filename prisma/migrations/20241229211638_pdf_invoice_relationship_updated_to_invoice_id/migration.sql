-- DropForeignKey
ALTER TABLE "PdfDocument" DROP CONSTRAINT "PdfDocument_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "PdfDocument" ADD CONSTRAINT "PdfDocument_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceId") ON DELETE CASCADE ON UPDATE CASCADE;
