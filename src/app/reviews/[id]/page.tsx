import Reviews from '@/components/Reviews/Reviews'
import { fetchProduct } from '@/components/actions/products/productsData'

export default async function ReviewPage({ params }: any) {
	const reviews = await fetchProduct(Number(params.id))

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Reviews product={reviews} />
		</div>
	)
}
