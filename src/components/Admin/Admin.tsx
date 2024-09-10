'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { formatCurrency, formatNumber } from '@/lib/formatter'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'
import {
	BarChart3,
	Users,
	ShoppingCart,
	TrendingUp,
	PackagePlus,
} from 'lucide-react'
import Categories from './Categories'
import Products from './Products'
import { Separator } from '@/components/ui/separator'

export default function Admin({
	sales,
	user,
	categories,
	products,
}: {
	sales: any
	user: any
	categories: any
	products: any
}) {
	const chartConfig = {
		sales: {
			label: `${sales.numberOfSales}`,
			color: '#098637',
		},
		users: {
			label: `${user.userCount}`,
			color: '#125427',
		},
	}
	const chartData = [
		{
			month: 'August',
			paid: `${sales.paid}`,
			average: `${user.averageValuePerUser}`,
		},
	]
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
						<div className="text-2xl font-bold">{formatNumber(user.userCount)}</div>
						<p className="text-xs text-muted-foreground">
							Avg. {formatCurrency(user.averageValuePerUser)} per user
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
							{((sales.numberOfSales / user.userCount) * 100).toFixed(2)}%
						</div>
						<p className="text-xs text-muted-foreground">Sales per customer</p>
					</CardContent>
				</Card>
			</div>
			{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<Card className="col-span-1 lg:col-span-2">
					<CardHeader>
						<CardTitle>Sales Overview</CardTitle>
						<CardDescription>Monthly sales and customer acquisition</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<ChartContainer config={chartConfig} className="w-full">
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={value => value.slice(0, 3)}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Bar dataKey="paid" fill="var(--color-sales)" radius={4} />
								<Bar dataKey="average" fill="var(--color-users)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div> */}
			<Separator className="mb-8" />
			<Categories initialCategories={categories} />
			<Separator className="mt-8" />
			<Products products={products} />
		</div>
	)
}
