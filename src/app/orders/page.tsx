import { fetchOrders } from '@/actions/orders/ordersData'
import Orders from '@/components/Orders/Orders'

export default async function OrdersPage() {
	const orders = await fetchOrders()

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Orders orders={orders as unknown as Order[]} />
		</div>
	)
}
