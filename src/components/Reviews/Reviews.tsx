'use client'
import { calculateAverage } from '@/actions/averageRating'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { discountPercentage, formatCurrency } from '@/lib/formatter'
import { format } from 'date-fns'
import { CircleCheck, CircleX, Star, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Reviews({ product }: any) {
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
				<CardHeader className="w-full flex flex-row items-center gap-6 space-y-0">
					<Button asChild variant="default">
						<Link href={`/products/${product.id}`}>Back</Link>
					</Button>
					<CardTitle className="text-3xl">Reviews</CardTitle>
				</CardHeader>
				<div className="flex mx-8 mb-8 border"></div>
				<CardContent className="flex flex-col md:flex-row items-start gap-8">
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
					<Button
						size={'sm'}
						variant={'default'}
						asChild
						className="mt-auto ml-auto"
					>
						<Link href={`/review/${product.id}`}>Write a Review</Link>
					</Button>
				</CardContent>
			</Card>
			<div className="flex gap-4 items-center justify-between mb-4"></div>
			{product.reviews.map((review: any) => (
				<div key={review.id}>
					<Card className="h-full my-8">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-lg font-medium truncate mr-4">
								{review.title}
							</CardTitle>
							<div className="flex items-center gap-2">
								{calculateStars(review.rating, 4)}
								{review.rating.toFixed(1)}
							</div>
						</CardHeader>
						<CardContent>
							<p>{review.description}</p>
							<div className="flex items-center gap-2 mt-2">
								<div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
									<User className="size-4" /> {review.user?.name}
								</div>
								<div>
									<time
										title={new Date(review.createdAt).toLocaleString()}
										dateTime={new Date(review.createdAt).toISOString()}
										className="text-xs"
									>
										{format(review.createdAt, 'dd.MM.yyyy')}
									</time>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			))}
		</div>
	)
}
