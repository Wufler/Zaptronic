"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchOrders(id: string) {
    return await prisma.orders.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            orderId: true,
            price_paid: true,
            payment_method: true,
            order_status: true,
            createdAt: true,
            updatedAt: true,
            products: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    reviews: true,
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