import React from 'react'
import Wishlist from '@/components/Wishlist/Wishlist'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { fetchWishlist } from '@/actions/wishlist/Wishlist'

export default async function page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Wishlist wishes={wishes} />
		</div>
	)
}
