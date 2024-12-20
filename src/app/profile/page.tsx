import { auth } from '@/lib/auth'
import { fetchOrders } from '@/actions/orders/ordersData'
import Profile from '@/components/Profile/Profile'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
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
