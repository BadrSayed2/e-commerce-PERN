/*
  Warnings:

  - Added the required column `end_date` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "order_number" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
