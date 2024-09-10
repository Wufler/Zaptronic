'use client'
import { Link } from 'next-view-transitions'
import { Button } from '@/components/ui/button'
import { ProductCard } from './Products'

export default function HomeProducts({ products, user, wishes }: any) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold">Products</h2>
				<Button variant="ghost" asChild>
					<Link href="/products">View all products</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.slice(0, 3).map((product: any, i: number) => (
					<ProductCard key={i} user={user} product={product} wishes={wishes} />
				))}
			</div>
		</div>
	)
}
