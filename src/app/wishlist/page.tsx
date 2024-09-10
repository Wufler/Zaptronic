import React from 'react'
import Wishlist from '@/components/Wishlist/Wishlist'
import { auth } from '@/auth'
import { fetchWishlist } from '@/components/actions/wishlist/Wishlist'

export default async function page() {
	const session = await auth()
	const wishes = await fetchWishlist(session?.user.id || '')

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Wishlist wishes={wishes} />
		</div>
	)
}
