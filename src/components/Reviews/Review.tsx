'use client'
import { CheckCircle2, CircleCheck, CircleX, Star } from 'lucide-react'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import NotFound from '@/app/not-found'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createReview } from '../actions/reviews/createReview'
import { calculateAverage } from '../actions/averageRating'
import { discountPercentage, formatCurrency } from '@/lib/formatter'
import { Badge } from '../ui/badge'

const formSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(100, 'Title must be 100 characters or less'),
	rating: z.number().min(1, 'Please select a rating').max(5),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters')
		.max(1000, 'Description must be 1000 characters or less'),
})

export default function Review({ product, user }: { product: any; user: any }) {
	const [isReviewing, setIsReviewing] = useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			rating: 0,
			description: '',
		},
	})

	if (!product) {
		return <NotFound h1="Something happened!" p="This product doesn't exist." />
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsReviewing(true)
			await createReview(user?.user.id, product.id, values)
			toast.success(
				<div className="flex items-center gap-2">
					<CheckCircle2 className="size-5" />
					<span>Product successfully reviewed.</span>
				</div>,
				{ position: 'bottom-center' }
			)
			router.push(`/products/${product.id}`)
		} catch (error) {
			toast.error(`Failed to submit review. Please try again.: ${error}`, {
				position: 'bottom-center',
			})
		}
	}

	function calculateStars(rating: number, size: number) {
		return (
			<div className="flex">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`size-${size} ${
							i < Number(rating.toFixed(0))
								? 'text-yellow-500 fill-yellow-500'
								: 'text-gray-400'
						}`}
					/>
				))}
			</div>
		)
	}
	const discount = discountPercentage(product)
	const averageRating = calculateAverage(
		product.reviews.map((review: any) => review.rating)
	)

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-2xl">Review Product</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col md:flex-row items-center gap-8">
					<Image
						src={product.images[0].src[0]}
						alt={product.images[0].alt}
						width={240}
						height={240}
						className="rounded-lg"
					/>
					<div>
						<h2 className="text-xl font-semibold mb-auto">{product.name}</h2>
						<div className="flex gap-1 items-center mb-auto">
							{calculateStars(averageRating, 5)}
							<span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
						</div>
						<div className="mt-4">
							{product.stock_quantity === 0 ? (
								<div className="text-gray-500 flex items-center">
									<CircleX className="mr-1 p-1" />
									Currently unavailable
								</div>
							) : product.stock_quantity < 6 ? (
								<div className="text-orange-600 flex items-center">
									<CircleCheck className="mr-1 p-1" />
									{product.stock_quantity} in stock
								</div>
							) : (
								<div className="text-green-600 flex items-center">
									<CircleCheck className="mr-1 p-1" />
									{product.stock_quantity} In stock
								</div>
							)}
						</div>
						<div className="text-xl font-bold mt-4">
							{discount > 0 && (
								<Badge className="mb-2 bg-red-600">{discount}% OFF</Badge>
							)}
							{product.sale_price ? (
								<div>
									<span className="text-red-700 mr-2">
										{formatCurrency(Number(product.sale_price))}
									</span>
									<span className="text-gray-500 line-through text-lg">
										{formatCurrency(Number(product.price))}
									</span>
								</div>
							) : (
								formatCurrency(Number(product.price))
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<Card>
						<CardContent className="pt-6 space-y-6">
							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder="Write a title for your review" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="rating"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Rating</FormLabel>
											<FormControl>
												<div className="flex">
													{[1, 2, 3, 4, 5].map(star => (
														<Star
															key={star}
															className={`size-6 cursor-pointer ${
																star <= field.value
																	? 'text-yellow-500 fill-yellow-500'
																	: 'text-gray-300'
															}`}
															onClick={() => field.onChange(star)}
														/>
													))}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Write your review here"
												className="resize-none"
												rows={6}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter className="flex justify-end space-x-4">
							<Button variant="outline" asChild>
								<Link href={`/products/${product.id}`}>Cancel</Link>
							</Button>
							<Button type="submit" disabled={isReviewing}>
								Submit Review
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	)
}
