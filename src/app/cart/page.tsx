import { auth } from '@/auth'
import Cart from '@/components/Cart/Cart'
import { redirect } from 'next/navigation'

export default async function CartPage() {
	const session = await auth()

	if (!session) {
		redirect('/')
	}

	return (
		<div className="bg-primary-white dark:bg-primary-black">
			<Cart user={session} />
		</div>
	)
}
