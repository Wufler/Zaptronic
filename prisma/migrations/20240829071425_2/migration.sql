/*
  Warnings:

  - You are about to drop the column `productsId` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `Specifications` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `productIds` on the `Wishlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_productsId_fkey";

-- DropForeignKey
ALTER TABLE "Specifications" DROP CONSTRAINT "Specifications_productsId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_productsId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Specifications" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "productIds";

-- CreateTable
CREATE TABLE "_CategoriesToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductsToSpecifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductsToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToProducts_AB_unique" ON "_CategoriesToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToProducts_B_index" ON "_CategoriesToProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToSpecifications_AB_unique" ON "_ProductsToSpecifications"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToSpecifications_B_index" ON "_ProductsToSpecifications"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToTags_AB_unique" ON "_ProductsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToTags_B_index" ON "_ProductsToTags"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToProducts" ADD CONSTRAINT "_CategoriesToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToProducts" ADD CONSTRAINT "_CategoriesToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSpecifications" ADD CONSTRAINT "_ProductsToSpecifications_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSpecifications" ADD CONSTRAINT "_ProductsToSpecifications_B_fkey" FOREIGN KEY ("B") REFERENCES "Specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToTags" ADD CONSTRAINT "_ProductsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToTags" ADD CONSTRAINT "_ProductsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
