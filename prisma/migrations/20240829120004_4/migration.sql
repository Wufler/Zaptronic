-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productsId_fkey";

-- DropForeignKey
ALTER TABLE "Specifications" DROP CONSTRAINT "Specifications_productsId_fkey";

-- AddForeignKey
ALTER TABLE "Specifications" ADD CONSTRAINT "Specifications_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
