import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import NotFound from '@/app/not-found'
import Create from '@/components/Admin/Create'
import { fetchCategories } from '@/actions/products/categories'
import { headers } from 'next/headers'

export default async function CreatePage() {
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
			<Create categories={categories} />
		</div>
	)
}
