"use server"
import prisma from "@/lib/prisma";

export async function fetchProducts(isAdmin?: boolean, id?: number) {
    if (id) {
        return await prisma.products.findUnique({
            where: {
                id,
                ...(!isAdmin && { visible: true })
            },
            include: {
                specifications: true,
                categories: true,
                tags: true,
                images: true,
                reviews: true,
                orders: true,
                wishlist: true,
            }
        });
    }
    return await prisma.products.findMany({
        where: {
            ...(!isAdmin && { visible: true })
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            specifications: true,
            categories: true,
            tags: true,
            images: true,
            reviews: true,
            orders: true,
            wishlist: true,
        },
    });
}