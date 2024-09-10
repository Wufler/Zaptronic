import { auth } from '@/auth'
import { fetchProduct } from '@/components/actions/products/productsData'
import { fetchWishlist } from '@/components/actions/wishlist/Wishlist'
import Product from '@/components/Products/Product'

export default async function ProductDetails({ params }: any) {
	const product = await fetchProduct(Number(params.id))
	const session = await auth()
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<div className="dark:bg-primary-black bg-primary-white min-h-dvh">
			<Product product={product} user={session} wishes={wishes} />
		</div>
	)
}
