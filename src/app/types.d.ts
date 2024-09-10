export interface Products {
	id: number
	name: string
	slug: string
	description: string
	tags: {
		id: number
		name: string
		slug: string
	}[]
	categories: {
		id: number
		name: string
		slug: string
	}[]
	specifications: {
		id: number
		info: string[]
		spec: string[]
	}[]
	images: {
		id: number
		alt: string
		name: string
		src: string[]
	}[]
	reviews: {
		id: number
		title: string
		description: string
		rating: number
	}[]
	orders: {
		orderId: number
		price_paid: string
		payment_method: string
		order_status: string
	}
	wishlist: {
		id: number
	}
	price: string
	sale_price?: string | null
	purchase_note?: string | null
	visible: boolean
	purchasable: boolean
	reviews_allowed: boolean
	featured: boolean
	stock_quantity: number
	createdAt: Date
	updatedAt: Date
}

declare module "next-auth" {
	interface Session {
		user: {
			id: string
			role: string
		} & DefaultSession["user"]
	}
}