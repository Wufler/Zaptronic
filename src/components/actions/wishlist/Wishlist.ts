"use server"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma";

export async function fetchWishlist(id: string) {
    return await prisma.wishlist.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            productsId: true,
            createdAt: true,
            updatedAt: true,
            products: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    reviews: true,
                    categories: true,
                    price: true,
                    sale_price: true,
                    purchase_note: true,
                    stock_quantity: true,
                }
            }
        },
    });
}

export async function deleteWish(id: number) {
    await prisma.wishlist.delete({
        where: {
            id: id,
        }
    })
    revalidatePath('/')
}

export async function createWish(id: string, data: any) {
    await prisma.wishlist.create({
        data: {
            userId: id,
            productsId: data.id,
        },
    })
    revalidatePath('/')
}