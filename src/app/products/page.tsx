import { auth } from '@/lib/auth'
import { fetchProducts } from '@/actions/products/productsData'
import { fetchWishlist } from '@/actions/wishlist/Wishlist'
import Products from '@/components/Products/Products'
import { headers } from 'next/headers'

export default async function Home() {
	const products = await fetchProducts(false)
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<main className="min-h-dvh dark:bg-primary-black bg-primary-white">
			<Products
				products={products as unknown as Products[]}
				user={session as unknown as User}
				wishes={wishes as unknown as Wishlist[]}
			/>
		</main>
	)
}
