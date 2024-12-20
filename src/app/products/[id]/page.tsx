import { auth } from '@/lib/auth'
import Product from '@/components/Products/Product'
import { headers } from 'next/headers'
import { fetchProducts } from '@/actions/products/productsData'
import { fetchWishlist } from '@/actions/wishlist/Wishlist'

export default async function ProductDetails({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const product = await fetchProducts(false, Number(id))
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<div className="dark:bg-primary-black bg-primary-white min-h-dvh">
			<Product product={product} user={session} wishes={wishes} />
		</div>
	)
}
