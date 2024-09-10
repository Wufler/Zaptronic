/*
  Warnings:

  - You are about to drop the column `productsId` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_productsId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "productsId";

-- CreateTable
CREATE TABLE "_OrdersToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrdersToProducts_AB_unique" ON "_OrdersToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_OrdersToProducts_B_index" ON "_OrdersToProducts"("B");

-- AddForeignKey
ALTER TABLE "_OrdersToProducts" ADD CONSTRAINT "_OrdersToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdersToProducts" ADD CONSTRAINT "_OrdersToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
