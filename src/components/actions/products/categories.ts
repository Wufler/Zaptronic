'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Define types for your category
type Category = {
    id: number;
    name: string;
    slug: string;
};

type CategoryInput = Omit<Category, 'id'>;

export async function fetchCategories(): Promise<Category[]> {
    try {
        const categories = await prisma.categories.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
}

export async function createCategory(data: CategoryInput): Promise<Category> {
    try {
        const newCategory = await prisma.categories.create({
            data: {
                name: data.name,
                slug: data.slug,
            },
        });
        revalidatePath("/");
        return newCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Failed to create category');
    }
}

export async function editCategory(data: Category): Promise<Category> {
    try {
        const updatedCategory = await prisma.categories.update({
            where: { id: data.id },
            data: { name: data.name, slug: data.slug }
        });
        revalidatePath("/");
        return updatedCategory;
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Failed to update category');
    }
}

export async function deleteCategory(categoryId: number): Promise<void> {
    try {
        await prisma.categories.delete({
            where: {
                id: categoryId,
            }
        });
        revalidatePath('/');
    } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Failed to delete category');
    }
}