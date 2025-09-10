/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "totalCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "totalPrice" SET DEFAULT 0;
