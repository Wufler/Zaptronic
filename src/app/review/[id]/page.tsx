import { fetchProducts } from '@/actions/products/productsData'
import Review from '@/components/Reviews/Review'

export default async function ReviewPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const product = await fetchProducts(false, Number(id))

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Review product={product as unknown as Products} />
		</div>
	)
}
