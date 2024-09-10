import { auth } from '@/auth'
import { fetchProducts } from '@/components/actions/products/productsData'
import { fetchWishlist } from '@/components/actions/wishlist/Wishlist'
import Products from '@/components/Products/Products'

export default async function Home() {
	const products = await fetchProducts()
	const session = await auth()
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<main className="min-h-dvh dark:bg-primary-black bg-primary-white">
			<Products products={products} user={session} wishes={wishes} />
		</main>
	)
}
