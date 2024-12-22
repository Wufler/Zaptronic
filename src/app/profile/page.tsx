import { fetchOrders } from '@/actions/orders/ordersData'
import Profile from '@/components/Profile/Profile'

export default async function ProfilePage() {
	const orders = await fetchOrders()

	return (
		<div className="dark:bg-primary-black bg-primary-white py-0 md:py-12">
			<Profile orders={orders as unknown as Order[]} />
		</div>
	)
}
