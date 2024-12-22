import Link from 'next/link'
import { Button } from '../ui/button'
import { PackagePlus, Pencil, Star } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatter'
import { calculateAverage } from '@/actions/averageRating'

export default function Products({ products }: { products: Products[] }) {
	return (
		<div className="my-8">
			<div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center mb-4 text-2xl font-bold">
				<h1>Products</h1>
				<Button variant="outline" asChild className="mb-4 sm:mb-0">
					<Link href="/admin/create">
						<PackagePlus className="mr-2 size-4" /> Create Product
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{products.map(product => (
					<div key={product.id}>
						<Card>
							<CardHeader>
								<CardTitle className="flex justify-between items-center gap-2 text-xl">
									<Link href={`/products/${product.id}`}>
										<h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>
									</Link>
									<Button size="icon" className="px-2" asChild>
										<Link href={`/admin/edit/${product.id}`}>
											<Pencil />
										</Link>
									</Button>
								</CardTitle>
								<CardDescription className="flex gap-1">
									ID: {product.id} {product.visible ? null : <span>👻</span>}
									{product.reviews_allowed ? null : <span>😶</span>}
									{product.purchasable ? null : <span>🚫</span>}
									{product.featured ? <span>🏠</span> : null}
								</CardDescription>
								<CardContent className="p-0">
									<div className="flex items-center justify-between mb-2">
										{product.reviews_allowed ? (
											<div className="flex items-center">
												<Star className="fill-yellow-500 text-yellow-500 mr-1 size-4" />
												<span>
													{calculateAverage(
														product.reviews.map(review => review.rating)
													).toFixed(1)}
												</span>
											</div>
										) : (
											<div className="flex items-center">
												<Star className="fill-gray-500 text-gray-500 mr-1 size-4" />
												<span>-</span>
											</div>
										)}
										<div>
											{product.sale_price ? (
												<div className="flex items-center gap-2">
													<span className="text-red-600 font-bold">
														{formatCurrency(Number(product.sale_price))}
													</span>
													<span className="text-muted-foreground line-through text-sm">
														{formatCurrency(Number(product.price))}
													</span>
												</div>
											) : (
												<span className="font-bold">
													{formatCurrency(Number(product.price))}
												</span>
											)}
										</div>
									</div>
									<p className="text-muted-foreground text-sm">
										{product.stock_quantity === 0
											? 'Currently unavailable'
											: `${product.stock_quantity} in stock`}
									</p>
								</CardContent>
							</CardHeader>
						</Card>
					</div>
				))}
			</div>
		</div>
	)
}
