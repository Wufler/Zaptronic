"use server"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma";
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'


export async function fetchWishlist() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    return await prisma.wishlist.findMany({
        where: {
            userId: session?.user?.id || '',
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

export async function createWish(data: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const existingWish = await prisma.wishlist.findFirst({
        where: {
            userId: session?.user?.id || '',
            productsId: Number(data),
        },
    });

    if (existingWish) {
        await prisma.wishlist.delete({
            where: {
                id: existingWish.id,
            },
        });
    } else {
        await prisma.wishlist.create({
            data: {
                userId: session?.user?.id || '',
                productsId: Number(data),
            },
        });
    }
    revalidatePath('/');
}

