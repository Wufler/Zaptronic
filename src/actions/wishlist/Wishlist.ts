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
        include: {
            user: true,
            products: {
                include: {
                    images: true,
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

export async function createWish(id: string, data: string) {
    await prisma.wishlist.create({
        data: {
            userId: id,
            productsId: Number(data),
        },
    })
    revalidatePath('/')
}