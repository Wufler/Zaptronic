"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addOrder(id: string, cartItems: { id: number }[], amount: number) {
    await prisma.orders.create({
        data: {
            userId: id,
            price_paid: amount,
            payment_method: 'Credit Card',
            products: {
                connect: cartItems.map((item) => ({
                    id: item.id,
                })),
            },
        },
    });

    revalidatePath('/')
}