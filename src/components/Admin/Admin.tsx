'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber } from '@/lib/formatter'
import { BarChart3, Users, ShoppingCart, TrendingUp } from 'lucide-react'
import Categories from './Categories'
import Products from './Products'
import { Separator } from '@/components/ui/separator'

export default function Admin({
	sales,
	user,
	categories,
	products,
}: {
	sales: Sales
	user: User
	categories: Category[]
	products: Products[]
}) {
	return (
		<div className="max-w-7xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<BarChart3 className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(sales.paid)}</div>
						<p className="text-xs text-muted-foreground">
							+{formatNumber(sales.numberOfSales)} sales
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Customers</CardTitle>
						<Users className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(user.userCount ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							Avg. {formatCurrency(user.averageValuePerUser ?? 0)} per user
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Sales</CardTitle>
						<ShoppingCart className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(sales.numberOfSales)}
						</div>
						<p className="text-xs text-muted-foreground">
							Avg. {formatCurrency(sales.paid / sales.numberOfSales)} per sale
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
						<TrendingUp className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{((sales.numberOfSales / (user.userCount ?? 0)) * 100).toFixed(2)}%
						</div>
						<p className="text-xs text-muted-foreground">Sales per customer</p>
					</CardContent>
				</Card>
			</div>
			<Separator className="mb-8" />
			<Categories initialCategories={categories} />
			<Separator className="mt-8" />
			<Products products={products} />
		</div>
	)
}
