"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createReview(id: string, product: number, values: any) {
    await prisma.reviews.create({
        data: {
            userId: id,
            title: values.title,
            description: values.description,
            rating: values.rating,
            productsId: product
        }
    })
    revalidatePath('/')
}