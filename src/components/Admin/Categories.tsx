'use client'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import {
	createCategory,
	deleteCategory,
	editCategory,
} from '@/actions/products/categories'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Loading from '../Loading'

const CategorySchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, 'Name is required').max(50),
	slug: z.string(),
})

type Category = z.infer<typeof CategorySchema>

const FormSchema = z.object({
	categories: z.array(CategorySchema),
})

type FormValues = z.infer<typeof FormSchema>

export default function Categories({
	initialCategories,
}: {
	initialCategories: Category[]
}) {
	const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [categories, setCategories] = useState<Category[]>(initialCategories)

	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			categories: categories,
		},
	})

	const newCategoryForm = useForm<Omit<Category, 'id'>>({
		resolver: zodResolver(CategorySchema.omit({ id: true })),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	useEffect(() => {
		form.reset({ categories })
	}, [categories, form])

	async function onSubmit(data: FormValues) {
		setIsLoading(true)
		try {
			await Promise.all(
				data.categories.map(async category => {
					const categoryId = category.id ?? 0
					await editCategory({ ...category, id: categoryId })
				})
			)
			toast.success('Categories updated successfully')
			setCategories(data.categories)
		} catch (error) {
			toast.error(`Failed to update categories ${error}`)
		}
		setIsLoading(false)
	}

	async function onDelete(id: number) {
		try {
			await deleteCategory(id)
			toast.success('Category deleted successfully')
			const updatedCategories = categories.filter(cat => cat.id !== id)
			setCategories(updatedCategories)
		} catch (error) {
			toast.error(`Failed to delete category ${error}`)
		}
	}

	async function onCreateCategory(data: Omit<Category, 'id'>) {
		setIsLoading(true)
		try {
			const newCategory = await createCategory(data)
			toast.success('Category created successfully')
			setCategories(prevCategories => [...prevCategories, newCategory])
			setShowNewCategoryForm(false)
			newCategoryForm.reset()
		} catch (error) {
			toast.error(`Failed to create category ${error}`)
		}
		setIsLoading(false)
	}

	function generateSlug(name: string) {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '')
	}

	useEffect(() => {
		const subscription = form.watch((value, { name, type }) => {
			if (
				name?.startsWith('categories') &&
				name.endsWith('name') &&
				type === 'change'
			) {
				const index = parseInt(name.split('.')[1])
				const newSlug = generateSlug(value.categories?.[index]?.name || '')
				form.setValue(`categories.${index}.slug`, newSlug)
			}
		})
		return () => subscription.unsubscribe()
	}, [form])

	useEffect(() => {
		const subscription = newCategoryForm.watch((value, { name, type }) => {
			if (name === 'name' && type === 'change') {
				const newSlug = generateSlug(value.name || '')
				newCategoryForm.setValue('slug', newSlug)
			}
		})
		return () => subscription.unsubscribe()
	}, [newCategoryForm])

	return (
		<div className="space-y-6">
			<div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center">
				<h1 className="text-2xl font-bold">Categories</h1>
				<Button
					variant="outline"
					className="px-2"
					onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
				>
					{showNewCategoryForm ? (
						<div className="flex items-center px-2">
							<Minus className="mr-2 size-5" /> Hide Category
						</div>
					) : (
						<div className="flex items-center px-2">
							<Plus className="mr-2 size-5" /> Create Category
						</div>
					)}
				</Button>
			</div>

			{showNewCategoryForm && (
				<Form {...newCategoryForm}>
					<form
						onSubmit={newCategoryForm.handleSubmit(onCreateCategory)}
						className="space-y-4 p-4 border rounded-lg"
					>
						<h1 className="text-xl font-semibold">New Category</h1>
						<div className="flex gap-4">
							<FormField
								control={newCategoryForm.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} maxLength={50} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={newCategoryForm.control}
								name="slug"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input {...field} disabled />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="w-full" type="submit" disabled={isLoading}>
							{isLoading ? <Loading size={16} /> : <p>Create Category</p>}
						</Button>
					</form>
				</Form>
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 flex flex-col"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{categories.map((category, index) => (
							<div key={category.id} className="space-y-4 p-4 border rounded-lg">
								<div className="flex items-center justify-between gap-2 [overflow-wrap:anywhere]">
									<h1 className="text-xl font-semibold">{category.name}</h1>
									<div className="flex justify-end">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="destructive" className="px-2">
													<Trash2 className="size-6" />
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently delete the
														category and remove its data from our servers.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => category.id !== undefined && onDelete(category.id)}
													>
														Delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
								<div className="flex gap-4">
									<FormField
										control={form.control}
										name={`categories.${index}.name`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input {...field} maxLength={50} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`categories.${index}.slug`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Slug</FormLabel>
												<FormControl>
													<Input {...field} disabled />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						))}
					</div>
					<Button
						type="submit"
						className="w-full sm:w-auto self-end"
						disabled={isLoading}
					>
						{isLoading ? <Loading size={16} /> : <p>Update Categories</p>}
					</Button>
				</form>
			</Form>
		</div>
	)
}
