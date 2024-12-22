"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function createReview(product: number, values: ReviewValues) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    await prisma.reviews.create({
        data: {
            userId: session?.user?.id || '',
            title: values.title,
            description: values.description,
            rating: values.rating,
            productsId: product
        }
    })
    revalidatePath('/')
}