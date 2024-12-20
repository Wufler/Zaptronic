import { auth } from '@/lib/auth'
import { fetchProducts } from '@/actions/products/productsData'
import Review from '@/components/Reviews/Review'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function ReviewPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const product = await fetchProducts(false, Number(id))
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		redirect('/login')
	}

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Review product={product} user={session} />
		</div>
	)
}
