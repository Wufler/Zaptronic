import { fetchProducts } from '@/actions/products/productsData'
import Reviews from '@/components/Reviews/Reviews'

export default async function ReviewPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const reviews = await fetchProducts(false, Number(id))

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Reviews product={reviews} />
		</div>
	)
}
