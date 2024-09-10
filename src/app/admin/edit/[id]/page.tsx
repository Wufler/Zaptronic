import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import NotFound from '@/app/not-found'
import Edit from '@/components/Admin/Edit'
import { fetchProduct } from '@/components/actions/products/productsData'
import { fetchCategories } from '@/components/actions/products/categories'

export default async function CreatePage({ params }: any) {
	const product = await fetchProduct(Number(params.id))
	const categories = await fetchCategories()
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	if (session.user.role !== 'admin') {
		return <NotFound h1="Not allowed!" p="You are not an admin!" />
	}
	return (
		<div className="min-h-dvh dark:bg-primary-black bg-primary-white">
			<Edit product={product} categories={categories} />
		</div>
	)
}
