'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import {
	CheckCircle2,
	Star,
	CircleX,
	CircleCheck,
	Home,
	User,
	Heart,
	Pencil,
	X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	type CarouselApi,
} from '@/components/ui/carousel'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import NotFound from '@/app/not-found'
import { formatCurrency } from '@/lib/formatter'
import { discountPercentage } from '@/lib/formatter'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { createWish, deleteWish } from '@/actions/wishlist/Wishlist'
import { calculateAverage } from '@/actions/averageRating'

export default function Product({
	product,
	user,
	wishes,
}: {
	product: any
	user: any
	wishes: any
}) {
	const [isAddingToCart, setIsAddingToCart] = useState(false)
	const [isPurchasing, setIsPurchasing] = useState(false)
	const [isWishing, setIsWishing] = useState(false)
	const [isInCart, setIsInCart] = useState(false)
	const [reviewDescriptionClasses, setReviewDescriptionClasses] = useState(
		'text-sm hover:cursor-pointer truncate'
	)
	const [isInWishlist, setIsInWishlist] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi>()
	const router = useRouter()

	useEffect(() => {
		if (!api) {
			return
		}

		api.on('select', () => {
			setActiveIndex(api.selectedScrollSnap())
		})
	}, [api])

	const scrollTo = useCallback(
		(index: number) => {
			api?.scrollTo(index)
		},
		[api]
	)

	const flattenedImages =
		product.images?.flatMap((image: any, i: number) =>
			image.src.map((src: string, j: number) => ({
				src,
				alt: image.alt,
				index: i * image.src.length + j,
			}))
		) || []

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('cart') || '[]')
		setIsInCart(cart.some((item: any) => item.id === product.id))
		setIsInWishlist(wishes.some((wish: any) => wish.productsId === product.id))
	}, [product, wishes])

	if (!product) {
		return (
			<NotFound h1="Product not found" p="The requested product doesn't exist." />
		)
	}

	if (user?.user?.role !== 'admin' && product.visible === false) {
		return (
			<NotFound
				h1="This product is currently hidden."
				p="Please check back later."
			/>
		)
	}

	async function handleAddToCart() {
		setIsAddingToCart(true)
		try {
			const cart = JSON.parse(localStorage.getItem('cart') || '[]')
			const existingItemIndex = cart.findIndex(
				(item: any) => item.id === product.id
			)

			if (existingItemIndex !== -1) {
				cart.splice(existingItemIndex, 1)
				localStorage.setItem('cart', JSON.stringify(cart))
				setIsInCart(false)
				toast.success(
					<div className="flex gap-2">
						<X className="size-5" />
						<span>Product removed from cart.</span>
					</div>
				)
			} else {
				cart.push({ id: product.id, quantity: 1 })
				localStorage.setItem('cart', JSON.stringify(cart))
				setIsInCart(true)
				toast.success(
					<div className="flex gap-2">
						<CheckCircle2 className="size-5" />
						<span>Product successfully added to cart.</span>
					</div>
				)
			}
			window.dispatchEvent(new Event('cartUpdated'))
		} catch (error) {
			toast.error('Failed to update cart. Please try again.')
			console.error('Error adding to cart:', error)
		} finally {
			setIsAddingToCart(false)
		}
	}

	async function handlePurchase() {
		setIsPurchasing(true)
		try {
			localStorage.removeItem('cart')
			const cart = JSON.parse(localStorage.getItem('cart') || '[]')
			cart.push({ id: product.id, quantity: 1 })
			localStorage.setItem('cart', JSON.stringify(cart))
			setIsInCart(true)
			window.dispatchEvent(new Event('cartUpdated'))
			router.push('/cart')
		} catch (error) {
			toast.error('Failed to purchase product. Please try again.')
			console.error('Error purchasing product:', error)
		} finally {
			setIsPurchasing(false)
		}
	}

	async function handleWish() {
		setIsWishing(true)
		try {
			const wishlistItem = wishes.find(
				(item: any) => item.productsId === product.id
			)
			if (wishlistItem) {
				await deleteWish(wishlistItem.id)
				setIsInWishlist(false)
			} else {
				await createWish(user?.user.id, product)
				setIsInWishlist(true)
			}
		} catch (error) {
			toast.error(`Failed to wishlist product: ${error}`)
			console.error('Error wishing product:', error)
		} finally {
			setTimeout(() => {
				setIsWishing(false)
			}, 2000)
		}
	}
	const discount = discountPercentage(product)

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

	const averageRating = calculateAverage(
		product.reviews?.map((review: any) => review.rating) || []
	)

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			{!product.visible ? (
				<Alert className="mb-6">
					<AlertTitle>⚠️ This product is currently hidden.</AlertTitle>
					<AlertDescription>
						Only admins can currently view this product.
					</AlertDescription>
				</Alert>
			) : null}

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={'/'}>
								<Home className="size-5" />
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={'/products'}>Products</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="max-w-48 truncate">
							{product?.categories?.[0]?.name || ''}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="grid md:grid-cols-2 gap-8 mt-10">
				<div>
					<Carousel setApi={setApi} className="w-full">
						<CarouselContent>
							{flattenedImages.map((image: any, index: number) => (
								<CarouselItem key={index} className="flex justify-center">
									<div className="relative aspect-square w-full max-w-[300px] md:max-w-full">
										<Image
											src={image.src}
											alt={image.alt}
											fill
											className="object-contain"
											priority={index === 0}
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<ScrollArea className="w-full whitespace-nowrap rounded-md mt-4">
							<div className="flex max-w-sm space-x-2 p-2">
								{flattenedImages.map((image: any, index: number) => (
									<button
										key={index}
										onClick={() => scrollTo(index)}
										className={`relative flex-shrink-0 overflow-hidden rounded-md ${
											index === activeIndex ? 'ring-2 ring-primary' : ''
										}`}
									>
										<div className="relative size-16 sm:size-20">
											<Image
												src={image.src}
												alt={image.alt}
												fill
												className="object-cover"
											/>
										</div>
									</button>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
						<div className="flex items-center justify-between gap-4 mt-6">
							<CarouselPrevious className="relative left-0 right-auto" />
							<CarouselNext className="relative left-0 right-auto" />
						</div>
					</Carousel>
				</div>

				<div className="flex flex-col justify-between">
					<div>
						<div className="flex flex-col gap-2">
							<h1 className="text-2xl font-bold">{product.name}</h1>
							{product.reviews_allowed ? (
								<div className="flex items-center">
									{calculateStars(averageRating, 5)}
									<span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
								</div>
							) : null}
						</div>

						<div className="text-2xl font-bold mb-2 mt-4 flex flex-col items-start">
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

						<div className="mb-4">
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
					</div>

					<div className="flex flex-col gap-4 mt-6">
						{product.purchase_note && (
							<p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
								{product.purchase_note}
							</p>
						)}
						<div>
							{user ? (
								<div className="flex flex-col lg:flex-row gap-4">
									<Button
										onClick={handleAddToCart}
										variant="outline"
										className="w-full"
										disabled={
											isAddingToCart ||
											product.stock_quantity === 0 ||
											!product.purchasable
										}
									>
										{isInCart
											? isAddingToCart
												? 'Removing...'
												: 'In Cart'
											: isAddingToCart
											? 'Adding...'
											: 'Add to Cart'}
									</Button>
									<div className="flex gap-4 w-full">
										<Button
											onClick={handlePurchase}
											className="w-full"
											disabled={
												isPurchasing || product.stock_quantity === 0 || !product.purchasable
											}
										>
											{isPurchasing ? 'Processing...' : 'Buy Now'}
										</Button>
										<Button className="px-2" onClick={handleWish} disabled={isWishing}>
											{isWishing ? (
												<Loading size={24} />
											) : isInWishlist ? (
												<Heart className="fill-white dark:fill-black" />
											) : (
												<Heart />
											)}
										</Button>
										{user?.user?.role === 'admin' && (
											<Button variant="secondary" className="px-2" asChild>
												<Link href={`/admin/edit/${product.id}`}>
													<Pencil />
												</Link>
											</Button>
										)}
									</div>
								</div>
							) : (
								<div className="flex flex-col lg:flex-row gap-4">
									<Button
										onClick={handleAddToCart}
										variant="outline"
										className="w-full"
										disabled={isAddingToCart || product.stock_quantity === 0 || isInCart}
									>
										{isInCart ? 'In Cart' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
									</Button>
									<Button
										asChild
										className="w-full"
										disabled={product.stock_quantity === 0}
									>
										<Link href="/login">Buy Now</Link>
									</Button>
								</div>
							)}
						</div>
						{product.purchasable ? null : (
							<p className="text-sm text-gray-700 dark:text-gray-300">
								⚠️ Currently not purchasable.
							</p>
						)}
					</div>
				</div>
			</div>

			<Accordion
				type="single"
				defaultValue="description"
				collapsible
				className="mt-8"
			>
				<AccordionItem value="description">
					<AccordionTrigger>
						<h1 className="text-xl font-bold">Description</h1>
					</AccordionTrigger>
					<AccordionContent>
						<div
							className="prose dark:prose-invert max-w-none [overflow-wrap:anywhere]"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{product.reviews_allowed ? (
				<Accordion
					type="single"
					defaultValue="reviews"
					collapsible
					className="mt-8"
				>
					<AccordionItem value="reviews">
						<AccordionTrigger>
							<h1 className="text-xl font-bold">Reviews</h1>
						</AccordionTrigger>
						<AccordionContent className="w-full">
							<div className="flex gap-4 items-center justify-between mb-4">
								<div className="flex items-center gap-4">
									<div className="flex items-center">
										{calculateStars(averageRating, 5)}
										<span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
									</div>
									{product.reviews.length > 0 && (
										<Link
											className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
											href={`/reviews/${product.id}`}
										>
											View all {product.reviews.length} reviews
										</Link>
									)}
								</div>
								<Button size={'sm'} variant={'outline'} asChild>
									<Link href={`/review/${product.id}`}>Write a Review</Link>
								</Button>
							</div>

							<Carousel className="w-full">
								<CarouselContent>
									{product.reviews?.slice(0, 5).map((review: any) => (
										<CarouselItem
											key={review.id}
											className="pl-4 sm:basis-1/2 lg:basis-1/3"
										>
											<Card className="h-full">
												<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
													<CardTitle className="text-lg font-medium truncate mr-4">
														{review.title}
													</CardTitle>
													{calculateStars(review.rating, 4)}
												</CardHeader>
												<CardContent>
													<p
														className={reviewDescriptionClasses}
														onClick={() => {
															if (
																reviewDescriptionClasses ==
																'text-sm hover:cursor-pointer truncate'
															) {
																setReviewDescriptionClasses('text-sm hover:cursor-pointer')
															} else {
																setReviewDescriptionClasses(
																	'text-sm hover:cursor-pointer truncate'
																)
															}
														}}
													>
														{review.description}
													</p>
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
										</CarouselItem>
									))}
								</CarouselContent>
								{product.reviews.length > 0 ? (
									<div className="flex items-center justify-between gap-4 mt-8">
										<CarouselPrevious className="relative left-0 size-10" />
										<CarouselNext className="relative left-0 size-10" />
									</div>
								) : (
									<div>There are currently no reviews on this product yet.</div>
								)}
							</Carousel>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			) : (
				<Accordion
					type="single"
					defaultValue="reviews"
					collapsible
					className="mt-8"
				>
					<AccordionItem value="reviews">
						<AccordionTrigger>
							<h1 className="text-xl font-bold">Reviews</h1>
						</AccordionTrigger>
						<AccordionContent>
							<Carousel className="w-full">
								<CarouselContent className="pl-4">
									⚠️ Reviews are currently not allowed on this product.
								</CarouselContent>
							</Carousel>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</div>
	)
}
