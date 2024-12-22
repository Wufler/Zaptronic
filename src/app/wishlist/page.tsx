import React from 'react'
import Wishlist from '@/components/Wishlist/Wishlist'
import { fetchWishlist } from '@/actions/wishlist/Wishlist'

export default async function page() {
	const wishes = await fetchWishlist()

	return (
		<div className="dark:bg-primary-black bg-primary-white">
			<Wishlist wishes={wishes as unknown as WishlistItem[]} />
		</div>
	)
}
