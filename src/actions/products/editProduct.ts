"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editProduct(data: Products, productId: number, imageId: number) {
    await prisma.products.update({
        where: {
            id: productId,
        },
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
                set: data.categories.map((category: Category) => ({
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
                update: {
                    where: {
                        id: imageId
                    },
                    data: {
                        alt: data.slug,
                        src: data.images.flatMap((image: { id: number; alt: string; src: string[]; createdAt: Date; updatedAt: Date; productsId: number }) => image.src),
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