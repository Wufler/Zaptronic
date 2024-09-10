import { auth } from '@/auth'
import { fetchProduct } from '@/components/actions/products/productsData'
import Review from '@/components/Reviews/Review'
import { redirect } from 'next/navigation'

export default async function ReviewPage({ params }: any) {
	const product = await fetchProduct(Number(params.id))
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Review product={product} user={session} />
		</div>
	)
}
