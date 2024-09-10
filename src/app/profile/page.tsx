import { auth } from '@/auth'
import { fetchOrders } from '@/components/actions/orders/ordersData'
import Profile from '@/components/Profile/Profile'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const session = await auth()
	const orders = await fetchOrders(session?.user.id || '')

	if (!session) {
		redirect('/login')
	}
	return (
		<div className="dark:bg-primary-black bg-primary-white py-0 md:py-12">
			<Profile user={session} orders={orders} />
		</div>
	)
}
