"use server"
import prisma from "@/lib/prisma";

export async function fetchProducts() {
    return await prisma.products.findMany({
        where: {
            visible: true
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            slug: true,
            categories: true,
            wishlist: true,
            specifications: true,
            tags: true,
            images: true,
            reviews: true,
            description: true,
            price: true,
            sale_price: true,
            purchase_note: true,
            visible: true,
            purchasable: true,
            reviews_allowed: true,
            featured: true,
            stock_quantity: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function fetchAdminProducts() {
    return await prisma.products.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            slug: true,
            categories: true,
            wishlist: true,
            specifications: true,
            tags: true,
            images: true,
            reviews: true,
            description: true,
            price: true,
            sale_price: true,
            purchase_note: true,
            visible: true,
            purchasable: true,
            reviews_allowed: true,
            featured: true,
            stock_quantity: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

export async function fetchProduct(id: number) {
    return await prisma.products.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            categories: true,
            specifications: true,
            wishlist: true,
            tags: true,
            images: true,
            reviews: { select: { id: true, user: true, title: true, description: true, rating: true, createdAt: true, updatedAt: true } },
            description: true,
            price: true,
            sale_price: true,
            purchase_note: true,
            visible: true,
            purchasable: true,
            reviews_allowed: true,
            featured: true,
            stock_quantity: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}