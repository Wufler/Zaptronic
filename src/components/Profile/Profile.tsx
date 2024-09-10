'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'next-view-transitions'
import {
	CalendarDays,
	CreditCard,
	Heart,
	Package,
	ShoppingBag,
} from 'lucide-react'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/formatter'
import Settings from './Settings'

export default function Profile({ user, orders }: { user: any; orders: any }) {
	return (
		<Card className="max-w-4xl mx-auto">
			<CardHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="size-20">
						<AvatarImage src={user?.user?.image} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{user?.user?.name?.charAt(0) ?? ''}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-2xl font-bold max-w-72 truncate">
							{user?.user?.name}
						</CardTitle>
						<CardDescription className="max-w-72 truncate">
							{user?.user?.email}
						</CardDescription>
						<div className="flex items-center mt-2">
							<CalendarDays className="size-4 mr-2" />
							<span className="text-sm text-muted-foreground">
								Customer since {new Date(user?.user?.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-4 grid-cols-2">
					<StatCard icon={ShoppingBag} title="Total Orders" value={orders.length} />
					<StatCard
						icon={CreditCard}
						title="Total Spent"
						value={formatCurrency(
							orders.reduce(
								(sum: number, order: { price_paid: number }) => sum + order.price_paid,
								0
							)
						)}
					/>
				</div>

				<div className="flex flex-col">
					{orders.length > 0 ? (
						<div>
							<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
								<h1 className="font-semibold text-xl">Recent Orders</h1>
								<Button
									asChild
									size="sm"
									variant="ghost"
									className="md:w-auto w-full md:mt-0 mt-2"
								>
									<Link href="/orders">View All Orders</Link>
								</Button>
							</div>
							<div className="flex flex-col gap-4">
								{orders.slice(0, 2).map((order: any) => (
									<Card key={order.orderId}>
										<CardHeader className="pt-4 pb-2 space-y-0 px-6">
											<div className="flex justify-between items-center">
												<CardTitle className="text-sm font-medium flex sm:flex-row flex-col sm:items-center items-start sm:gap-2">
													<Package className="size-5 text-primary sm:block hidden" />
													Order #{order.orderId}
													<div className="text-muted-foreground">
														<time
															title={new Date(order.createdAt).toLocaleString()}
															dateTime={new Date(order.createdAt).toISOString()}
														>
															{format(order.createdAt, 'MMMM dd, yyyy')}
														</time>
													</div>
												</CardTitle>
												<Badge
													variant={
														order.order_status === 'Cancelled' ? 'destructive' : 'default'
													}
													className="text-xs font-medium"
												>
													{order.order_status}
												</Badge>
											</div>
										</CardHeader>
										<CardContent className="pt-0 pb-4 space-y-0 px-6">
											<div>{order.products.name}</div>
											<p className="text-muted-foreground text-sm">
												{formatCurrency(order.price_paid)}
											</p>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					) : null}
				</div>
			</CardContent>
			<CardFooter className="flex flex-wrap justify-end gap-4">
				<Button asChild>
					<Link href="/wishlist">
						<Heart className="mr-2 size-4" />
						Wishlist
					</Link>
				</Button>
				<Settings user={user} />
				{/* <Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">
							<MapPin className="mr-2 size-4" />
							Address
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Address</DialogTitle>
							<DialogDescription>
								<Button>Address</Button>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog> */}
			</CardFooter>
		</Card>
	)
}

function StatCard({
	icon: Icon,
	title,
	value,
}: {
	icon: any
	title: string
	value: string | number
}) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
			</CardContent>
		</Card>
	)
}
