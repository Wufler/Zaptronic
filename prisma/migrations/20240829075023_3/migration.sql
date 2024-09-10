/*
  Warnings:

  - You are about to drop the `_ProductsToSpecifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductsToSpecifications" DROP CONSTRAINT "_ProductsToSpecifications_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToSpecifications" DROP CONSTRAINT "_ProductsToSpecifications_B_fkey";

-- AlterTable
ALTER TABLE "Specifications" ADD COLUMN     "productsId" INTEGER;

-- DropTable
DROP TABLE "_ProductsToSpecifications";

-- AddForeignKey
ALTER TABLE "Specifications" ADD CONSTRAINT "Specifications_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
