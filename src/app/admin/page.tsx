import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import NotFound from '../not-found'
import { getOrders, getUserData } from '@/actions/admin/salesData'
import Admin from '@/components/Admin/Admin'
import { fetchCategories } from '@/actions/products/categories'
import { fetchProducts } from '@/actions/products/productsData'
import { headers } from 'next/headers'

export default async function Component() {
	const [salesData, userData] = await Promise.all([getOrders(), getUserData()])
	const categories = await fetchCategories()
	const products = await fetchProducts(true)
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
		<div className="min-h-screen bg-background p-6">
			<Admin
				sales={salesData}
				user={userData}
				categories={categories}
				products={products}
			/>
		</div>
	)
}
