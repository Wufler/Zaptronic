import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import NotFound from '@/app/not-found'
import Create from '@/components/Admin/Create'
import { fetchCategories } from '@/components/actions/products/categories'

export default async function CreatePage() {
	const categories = await fetchCategories()
	const session = await auth()

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
