'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { formatCurrency } from '@/lib/formatter'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { format, formatISO } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Package } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cancelOrder } from '@/actions/orders/ordersData'

export default function Orders({ orders }: { orders: any }) {
	async function handleCancel(id: number) {
		await cancelOrder(id)
	}

	return (
		<div className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Button variant="ghost" asChild className="mb-4 px-0">
						<Link href="/profile" className="flex items-center hover:bg-transparent">
							<ChevronLeft className="mr-2 size-4" />
							Back to Profile
						</Link>
					</Button>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Your Orders
					</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						View and manage your order history
					</p>
				</div>

				{orders.length === 0 ? (
					<Card className="text-center p-6">
						<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
							You currently have no orders.
						</p>
						<Button asChild>
							<Link href="/products">Explore Products</Link>
						</Button>
					</Card>
				) : (
					orders.map((order: any) => (
						<Card key={order.orderId} className="mb-4 shadow-lg">
							<CardHeader className="bg-gray-100 dark:bg-gray-900 py-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg font-semibold text-primary-900 dark:text-primary-100">
										Order #{order.orderId}
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
								<time
									className="text-xs text-gray-500 dark:text-gray-400"
									title={format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}
									dateTime={formatISO(new Date(order.createdAt))}
								>
									{format(new Date(order.createdAt), 'MMMM dd, yyyy')}
								</time>
							</CardHeader>
							<CardContent className="p-0">
								<Accordion type="single" collapsible>
									<AccordionItem value="details">
										<AccordionTrigger className="px-6 py-4">
											<div className="flex items-center sm:space-x-4">
												<Package className="size-6 text-primary sm:block hidden" />
												<div className="flex flex-col items-start justify-start">
													<p className="text-sm font-medium text-gray-900 dark:text-white text-left">
														{order.products.length}{' '}
														{order.products.length === 1 ? 'item' : 'items'}
													</p>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														{formatCurrency(order.price_paid)}
													</p>
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="px-6 py-2 space-y-6">
												{order.products.map((product: any) => (
													<div
														key={product.id}
														className="flex sm:items-center sm:flex-row flex-col sm:space-x-4"
													>
														<Link
															href={`/products/${product.id}`}
															className="flex-shrink-0 self-center"
														>
															<div className="size-32 rounded-md flex items-center justify-center">
																{product.images?.[0] ? (
																	<Image
																		className="size-32 rounded-md object-cover"
																		src={product.images[0].src[0]}
																		alt={product.images[0].alt}
																		width={128}
																		height={128}
																	/>
																) : (
																	<Package className="size-8 text-gray-400" />
																)}
															</div>
														</Link>
														<div className="flex-1 pt-4 sm:pt-0">
															<p className="text-base font-semibold text-gray-900 dark:text-white">
																{product.name}
															</p>
														</div>
													</div>
												))}
												<dl className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
													<div className="flex justify-between">
														<dt>Total price paid:</dt>
														<dd className="font-medium text-gray-900 dark:text-white">
															{formatCurrency(order.price_paid)}
														</dd>
													</div>
													<div className="flex justify-between">
														<dt>Payment method:</dt>
														<dd>{order.payment_method}</dd>
													</div>
												</dl>
												{order.order_status !== 'Cancelled' && (
													<div className="flex sm:flex-row flex-col sm:gap-0 gap-2 sm:space-x-2">
														<AlertDialog>
															<AlertDialogTrigger asChild>
																<Button variant="destructive" className="flex-1">
																	Cancel Order
																</Button>
															</AlertDialogTrigger>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
																	<AlertDialogDescription>
																		You will be fully refunded and the order will not be shipped.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Nevermind...</AlertDialogCancel>
																	<AlertDialogAction asChild>
																		<Button
																			onClick={() => handleCancel(order.orderId)}
																			variant="destructive"
																		>
																			Confirm
																		</Button>
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														</AlertDialog>
													</div>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	)
}
