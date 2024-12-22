"use server"
import prisma from "@/lib/prisma";

export async function createProduct(data: Products) {
    return await prisma.products.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            sale_price: data.sale_price,
            purchase_note: data.purchase_note,
            visible: data.visible,
            purchasable: data.purchasable,
            reviews_allowed: data.reviews_allowed,
            featured: data.featured,
            stock_quantity: data.stock_quantity,
            categories: {
                connect: data.categories.map((category: Category) => ({
                    id: category.id,
                })),
            },
            /* tags: {
                connectOrCreate: data.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag, slug: tag.toLowerCase().replace(/ /g, '-') },
                })),
            },
           specifications: {
               create: data.specifications.map((spec: { info: string; spec: string }) => ({
                   info: spec.info,
                   spec: spec.spec,
               })),
           }, */
            images: {
                create: data.images.map((image: { id: number; alt: string; src: string[]; createdAt: Date; updatedAt: Date; productsId: number }) => ({
                    alt: image.alt,
                    src: image.src,
                })),
            },
        },
        include: {
            categories: true,
            /* tags: true,
            specifications: true, */
            images: true,
        },
    });
}