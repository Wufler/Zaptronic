'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Star, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { discountPercentage, formatCurrency } from '@/lib/formatter'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateAverage } from '@/actions/averageRating'
import { unstable_noStore as noStore } from 'next/cache'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import { createWish, deleteWish } from '@/actions/wishlist/Wishlist'

export default function Products({
	products,
	user,
	wishes,
}: {
	products: any
	user: any
	wishes: any
}) {
	noStore()
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [isLoading, setIsLoading] = useState(true)

	// Fake Timer
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 125)
		return () => clearTimeout(timer)
	}, [])

	const filteredProducts = selectedCategory
		? products?.filter((product: Products) =>
				product?.categories.some(
					(category: any) => category?.slug === selectedCategory
				)
		  )
		: products

	const uniqueCategories = Array.from(
		new Map(
			products.map((item: Products) => [item.categories[0]?.slug, item])
		).values()
	)

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 dark:text-white">
				<span className="text-primary-orange">{filteredProducts.length} </span>
				{filteredProducts.length > 1 ? 'products' : 'product'}
			</h1>

			<div className="flex flex-wrap gap-2 mb-8">
				<Button
					onClick={() => setSelectedCategory('')}
					variant={selectedCategory === '' ? 'default' : 'outline'}
				>
					All
				</Button>
				{uniqueCategories.map((product: any) => (
					<Button
						key={product.id}
						onClick={() => {
							if (selectedCategory === product?.categories[0].slug) {
								setSelectedCategory('')
							} else {
								setSelectedCategory(product?.categories[0].slug)
							}
						}}
						variant={
							selectedCategory === product?.categories[0]?.slug ? 'default' : 'outline'
						}
					>
						{selectedCategory === product?.categories[0]?.slug && (
							<X className="mr-1 size-4" />
						)}
						{product?.categories[0]?.name}
					</Button>
				))}
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[...Array(8)].map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				</div>
			) : filteredProducts.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-2xl font-semibold dark:text-white">No products found</p>
					<p className="text-muted-foreground mt-2">
						Try changing your filter or check back later for new products.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredProducts.map((product: Products) => (
						<ProductCard
							key={product.id}
							product={product}
							user={user}
							wishes={wishes}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export function ProductCard({
	product,
	user,
	wishes,
}: {
	product: Products
	user?: any
	wishes: any
}) {
	const [isAddingToCart, setIsAddingToCart] = useState(false)
	const [isInCart, setIsInCart] = useState(false)
	const [isWishing, setIsWishing] = useState(false)
	const [isPurchasing, setIsPurchasing] = useState(false)
	const [isInWishlist, setIsInWishlist] = useState(false)
	const discount = discountPercentage(product)
	const averageRating = calculateAverage(
		product.reviews.map((review: any) => review.rating)
	)
	const router = useRouter()

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('cart') || '[]')
		setIsInCart(cart.some((item: any) => item.id === product.id))
	}, [product])

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
		} finally {
			setTimeout(() => {
				setIsWishing(false)
			}, 2000)
		}
	}
	return (
		<div>
			<div className="group bg-card text-card-foreground rounded-lg shadow-md overflow-hidden flex flex-col">
				<Link
					href={`/products/${product.id}`}
					className="flex items-center justify-center relative"
				>
					<Image
						src={product.images[0].src[0]}
						alt={product.images[0].alt}
						width={500}
						height={500}
						className="size-60 p-4 transition-transform duration-300 group-hover:scale-105"
					/>
					{product.sale_price && (
						<Badge className="absolute left-2 top-2 bg-red-600">
							{discount}% OFF
						</Badge>
					)}
				</Link>
				<div className="p-4 flex-grow flex flex-col">
					<Link href={`/products/${product.id}`}>
						<h2 className="text-lg font-semibold mb-2 line-clamp-2">
							{product.name}
						</h2>
					</Link>
					<div className="flex items-center justify-between mb-2">
						{product.reviews_allowed ? (
							<div className="flex items-center">
								<Star className="fill-yellow-500 text-yellow-500 mr-1 size-4" />
								<span>{averageRating.toFixed(1)}</span>
							</div>
						) : (
							<div className="flex items-center">
								<Star className="fill-gray-500 text-gray-500 mr-1 size-4" />
								<span>-</span>
							</div>
						)}
						<div>
							{product.sale_price ? (
								<div className="flex items-center gap-2">
									<span className="text-red-600 font-bold">
										{formatCurrency(Number(product.sale_price))}
									</span>
									<span className="text-muted-foreground line-through text-sm">
										{formatCurrency(Number(product.price))}
									</span>
								</div>
							) : (
								<span className="font-bold">
									{formatCurrency(Number(product.price))}
								</span>
							)}
						</div>
					</div>
					<p className="text-muted-foreground text-sm">
						{product.stock_quantity === 0
							? 'Currently unavailable'
							: `${product.stock_quantity} in stock`}
					</p>
					<div className="mt-4 flex gap-2">
						{user ? (
							<>
								<Button
									onClick={handleAddToCart}
									variant="outline"
									className="w-full"
									disabled={
										isAddingToCart || product.stock_quantity === 0 || !product.purchasable
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
								<div className="flex gap-2 w-full">
									<Button
										className="w-full"
										onClick={handlePurchase}
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
								</div>
							</>
						) : (
							<div className="flex gap-4 w-full">
								<Button
									onClick={handleAddToCart}
									variant="outline"
									className="w-full"
									disabled={isAddingToCart || product.stock_quantity === 0 || isInCart}
								>
									{isInCart ? 'In Cart' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
								</Button>
								<Button asChild className="w-full">
									<Link href="/login">Buy Now</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

function ProductCardSkeleton() {
	return (
		<div className="bg-card rounded-lg shadow-md overflow-hidden">
			<Skeleton className="w-full h-64 rounded-none" />
			<div className="p-4">
				<Skeleton className="h-6 w-full mb-2" />
				<div className="flex justify-between gap-2 mb-2">
					<Skeleton className="h-4 w-1/5" />
					<Skeleton className="h-4 w-1/2" />
				</div>
				<Skeleton className="h-4 w-2/5 mb-4" />
				<div className="flex gap-2">
					<Skeleton className="h-10 w-1/2" />
					<Skeleton className="h-10 w-1/2" />
					<Skeleton className="h-10 w-1/6" />
				</div>
			</div>
		</div>
	)
}
