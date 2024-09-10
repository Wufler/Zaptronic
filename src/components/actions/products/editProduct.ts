"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editProduct(data: any, productId: number, imageId: number) {
    await prisma.products.update({
        where: {
            id: productId,
        },
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            sale_price: data.salePrice,
            purchase_note: data.purchaseNote,
            visible: data.visible,
            purchasable: data.purchasable,
            reviews_allowed: data.reviews,
            featured: data.featured,
            stock_quantity: data.stock,
            categories: {
                set: data.categories.map((category_id: string) => ({
                    id: category_id,
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
                update: {
                    where: {
                        id: imageId
                    },
                    data: {
                        alt: data.slug,
                        src: data.images.map((image: { url: string }) => image.url),
                    },
                },
            },
        },
        include: {
            categories: true,
            /*  tags: true,
             specifications: true, */
            images: true,
        },
    });
    revalidatePath("/")
}

export async function deleteProduct(id: number) {
    await prisma.products.delete({
        where: {
            id: id,
        }
    })
    revalidatePath('/')
}