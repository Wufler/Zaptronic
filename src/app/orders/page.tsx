import { auth } from '@/auth'
import { fetchOrders } from '@/components/actions/orders/ordersData'
import Orders from '@/components/Orders/Orders'
import { redirect } from 'next/navigation'

export default async function OrdersPage() {
	const session = await auth()
	const orders = await fetchOrders(session?.user.id || '')

	if (!session) {
		redirect('/login')
	}

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Orders user={orders} />
		</div>
	)
}
