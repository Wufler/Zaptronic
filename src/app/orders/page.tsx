import { auth } from '@/lib/auth'
import { fetchOrders } from '@/actions/orders/ordersData'
import Orders from '@/components/Orders/Orders'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function OrdersPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	const orders = await fetchOrders(session?.user.id || '')
	console.log(orders)
	if (!session) {
		redirect('/login')
	}

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Orders orders={orders} />
		</div>
	)
}
