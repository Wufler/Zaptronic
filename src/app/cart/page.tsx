import { auth } from '@/lib/auth'
import Cart from '@/components/Cart/Cart'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function CartPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		redirect('/')
	}

	return (
		<div className="bg-primary-white dark:bg-primary-black">
			<Cart user={session as unknown as User} />
		</div>
	)
}
