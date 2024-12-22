type Products = {
	id: number
	name: string
	slug: string
	description: string
	tags: {
		id: number
		name: string
		slug: string
		createdAt: Date
		updatedAt: Date
	}[]
	categories: Category[]
	specifications: {
		id: number
		info: string[]
		spec: string[]
	}[]
	images: {
		id: number
		alt: string
		src: string[]
		createdAt: Date
		updatedAt: Date
		productsId: number
	}[]
	reviews: {
		id: number
		title: string
		description: string
		rating: number
		createdAt: Date
		user: {
			name: string
		}
	}[]
	orders: {
		orderId: number
		price_paid: string
		payment_method: string
		order_status: string
	}[]
	wishlist: {
		id: number
	}[]
	price: string
	sale_price: string | null
	purchase_note: string | null
	visible: boolean
	purchasable: boolean
	reviews_allowed: boolean
	featured: boolean
	stock_quantity: number
	createdAt: Date
	updatedAt: Date
}

type Category = {
	id: number
	name: string
	slug: string
	createdAt: Date
	updatedAt: Date
}

type Sales = {
	paid: number
	numberOfSales: number
}

type User = {
	user: {
		id: string
		role: string
		name?: string
		email: string;
		createdAt: string;
		image: string;
	}
	userCount?: number
	averageValuePerUser?: number
}

type Reviews = {
	user: {
		name: string
	}
	id: number
	title: string
	description: string
	rating: number
	createdAt: Date
}[]

type Wishlist = {
	id: number
	productsId: string
	createdAt: Date
	updatedAt: Date
	products: Products[]
}

type ReviewValues = {
	title: string;
	description: string;
	rating: number;
}

type Order = {
	orderId: string
	createdAt: string
	order_status: string
	price_paid: number
	products: Products[]
	payment_method: string
}

type WishlistItem = {
	id: number
	products: {
		id: number
		name: string
		images: { src: string[]; alt: string }[]
		price: number
		stock_quantity: number
		description: string
	}
}

type CartItem = {
	id: number
	products: Products
}

