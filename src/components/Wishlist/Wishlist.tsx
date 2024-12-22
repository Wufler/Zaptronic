'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { formatCurrency } from '@/lib/formatter'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Heart, CircleCheck, CircleX } from 'lucide-react'
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
import { createWish } from '@/actions/wishlist/Wishlist'
import { useTransition } from 'react'

export default function Wishlist({ wishes }: { wishes: WishlistItem[] }) {
	const [isPending, startTransition] = useTransition()

	async function handleDelete(id: number) {
		startTransition(async () => {
			await createWish(id.toString())
		})
	}

	return (
		<div className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Button variant="ghost" asChild className="mb-4 px-0 hover:bg-transparent">
						<Link href="/profile" className="flex items-center text-primary">
							<ChevronLeft className="mr-2 size-4" />
							Back to Profile
						</Link>
					</Button>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Your Wishlist
					</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Keep track of your favorite products
					</p>
				</div>

				{wishes.length === 0 ? (
					<Card className="text-center p-6">
						<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
							Your wishlist is empty.
						</p>
						<Button asChild>
							<Link href="/products">Explore Products</Link>
						</Button>
					</Card>
				) : (
					wishes.map(wish => (
						<Card key={wish.products.id} className="mb-4 shadow-lg overflow-hidden">
							<CardContent className="p-0">
								<Accordion type="single" collapsible>
									<AccordionItem value="details">
										<AccordionTrigger className="px-6 py-4 hover:no-underline">
											<div className="flex items-center sm:space-x-4 w-full">
												<Heart className="h-6 w-6 text-primary hidden sm:block" />
												<div className="flex flex-col items-start justify-start flex-grow">
													<p className="text-sm font-medium text-gray-900 dark:text-white text-left">
														{wish.products.name}
													</p>
													{wish.products.stock_quantity === 0 ? (
														<div className="text-gray-500 flex items-center text-sm">
															<CircleX className="mr-1 size-4" />
															Currently unavailable
														</div>
													) : wish.products.stock_quantity < 6 ? (
														<div className="text-orange-500 flex items-center text-sm">
															<CircleCheck className="mr-1 size-4" />
															In stock
														</div>
													) : (
														<div className="text-green-500 flex items-center text-sm">
															<CircleCheck className="mr-1 size-4" />
															In stock
														</div>
													)}
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="px-6 py-4 space-y-4">
												<div className="flex sm:items-center sm:flex-row flex-col sm:space-x-4">
													<Link
														href={`products/${wish.products.id}`}
														className="flex-shrink-0 self-center"
													>
														<Image
															className="size-32 rounded-md object-cover"
															src={wish.products.images[0].src[0]}
															alt={wish.products.images[0].alt}
															width={128}
															height={128}
														/>
													</Link>
													<div className="flex-1 min-w-0">
														<p className="text-base font-semibold text-gray-900 dark:text-white">
															{wish.products.name}
														</p>
														<dl className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
															<div className="flex justify-between">
																<dt>Price:</dt>
																<dd className="font-medium text-gray-900 dark:text-white">
																	{formatCurrency(wish.products.price)}
																</dd>
															</div>
															<div className="flex justify-between">
																<dt>Availability:</dt>
																<dd>
																	{wish.products.stock_quantity > 0
																		? `${wish.products.stock_quantity} In stock`
																		: 'Currently unavailable'}
																</dd>
															</div>
														</dl>
													</div>
												</div>
												<div className="flex sm:flex-row flex-col sm:gap-0 gap-2 sm:space-x-2">
													<Button asChild className="flex-1">
														<Link href={`/products/${wish.products.id}`}>View Product</Link>
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant="outline"
																className="flex-1"
																disabled={isPending}
															>
																Remove from Wishlist
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>Remove from Wishlist?</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure you want to remove this item from your wishlist?
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction asChild>
																	<Button
																		onClick={() => handleDelete(wish.products.id)}
																		variant="destructive"
																	>
																		Remove
																	</Button>
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
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
