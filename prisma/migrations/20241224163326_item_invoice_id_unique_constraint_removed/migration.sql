/*
  Warnings:

  - You are about to drop the column `companyAddress` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyPhone` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `businessAddress` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessEmail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessPhone` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_invoiceId_fkey";

-- DropIndex
DROP INDEX "Item_invoiceId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "companyAddress",
DROP COLUMN "companyEmail",
DROP COLUMN "companyName",
DROP COLUMN "companyPhone",
ADD COLUMN     "businessAddress" TEXT NOT NULL,
ADD COLUMN     "businessEmail" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessPhone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
