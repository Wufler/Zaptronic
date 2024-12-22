"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function fetchOrders() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return await prisma.orders.findMany({
        where: {
            userId: session?.user?.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            products: {
                include: {
                    images: true
                }
            }
        },
    });
}

export async function cancelOrder(id: number) {
    await prisma.orders.update({
        where: {
            orderId: id,
        },
        data: {
            order_status: "Cancelled",
        }
    })
    revalidatePath('/')
}