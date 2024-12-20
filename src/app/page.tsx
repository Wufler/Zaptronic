import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ShoppingBagIcon } from 'lucide-react'
import { discountPercentage, formatCurrency } from '@/lib/formatter'
import { Badge } from '@/components/ui/badge'
import HomeProducts from '@/components/Products/HomeProducts'
import { fetchWishlist } from '@/actions/wishlist/Wishlist'
import { fetchProducts } from '@/actions/products/productsData'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function Component() {
	const products = await fetchProducts(false)
	const featured = products[0]
	const discount = discountPercentage(featured)
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<main className="flex flex-col min-h-dvh dark:bg-primary-black bg-primary-white">
			<section className="relative min-h-[70vh] flex items-center justify-center">
				<div className="absolute inset-0 z-0">
					<Image
						src="/bg.png"
						alt="background"
						width={1280}
						height={720}
						priority
						className="w-full h-full object-cover object-center"
					/>
					<div className="absolute inset-0 bg-black/50" />
				</div>
				<div className="relative z-10 text-center text-white space-y-4">
					<h1 className="text-4xl md:text-6xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_80%)]">
						Zaptronic
					</h1>
					<p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">
						Discover tools and gear that power your development
					</p>
					<Button asChild size="lg">
						<Link href="#products">
							Shop Now <ShoppingBagIcon className="ml-2 size-5" />
						</Link>
					</Button>
				</div>
			</section>

			<section className="py-16 px-4 md:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold mb-8">Featured Product</h2>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="aspect-square relative md:w-auto max-w-96">
							<Image
								src={featured?.images[0].src[0]}
								alt={featured?.images[0].alt}
								width={400}
								height={400}
								className="object-cover rounded-lg"
							/>
						</div>
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold">{featured?.name}</h3>
							<div
								className="prose dark:prose-invert max-h-20 truncate whitespace-normal"
								dangerouslySetInnerHTML={{ __html: featured?.description || '' }}
							/>
							{featured?.sale_price && (
								<Badge className="bg-red-600">{discount}% OFF</Badge>
							)}
							{featured?.sale_price ? (
								<div className="flex items-baseline gap-2">
									<span className="text-lg font-bold text-primary">
										{formatCurrency(Number(featured?.sale_price))}
									</span>
									<span className="text-sm text-muted-foreground line-through">
										{formatCurrency(Number(featured?.price))}
									</span>
								</div>
							) : (
								<div className="flex items-baseline gap-2">
									<span className="text-lg font-bold text-primary">
										{formatCurrency(Number(featured?.price))}
									</span>
								</div>
							)}
							<Button asChild>
								<Link href={`/products/${featured?.id}`}>
									View Details <ArrowRightIcon className="ml-2 size-5" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section id="products" className="pt-12 pb-16 px-4 md:px-6 lg:px-8 bg-muted">
				<div className="max-w-6xl mx-auto">
					<HomeProducts products={products} user={session} wishes={wishes} />
				</div>
			</section>
		</main>
	)
}
