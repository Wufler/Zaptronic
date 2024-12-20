import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import NotFound from '@/app/not-found'
import Edit from '@/components/Admin/Edit'
import { fetchProducts } from '@/actions/products/productsData'
import { fetchCategories } from '@/actions/products/categories'
import { headers } from 'next/headers'

export default async function CreatePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const product = await fetchProducts(false, Number(id))
	const categories = await fetchCategories()
	const session = await auth.api.getSession({
		headers: await headers(),
	})

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
