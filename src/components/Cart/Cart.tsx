'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Loading from '@/components/Loading'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { formatCurrency, convertToSubcurrency } from '@/lib/formatter'
import { fetchProducts } from '@/actions/products/productsData'
import { CheckoutForm } from './Checkout'
import Link from 'next/link'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
	throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function CheckoutPage({ user }: { user: any }) {
	const [cartItems, setCartItems] = useState<any[]>([])
	const [cartProducts, setCartProducts] = useState<any[]>([])
	const [total, setTotal] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		setIsLoading(true)
		const loadCartItems = async () => {
			const storedCart = localStorage.getItem('cart')
			if (storedCart) {
				const parsedCart = JSON.parse(storedCart)
				setCartItems(parsedCart)

				const productPromises = parsedCart.map((item: any) =>
					fetchProducts(false, item.id)
				)
				const products = await Promise.all(productPromises)
				const productsWithQuantity = products.map((product, index) => ({
					...product,
					quantity: parsedCart[index].quantity,
				}))
				setCartProducts(productsWithQuantity)

				const newTotal = productsWithQuantity.reduce(
					(acc: number, product: any) =>
						acc + Number(product.price) * product.quantity,
					0
				)
				setTotal(newTotal)
			} else {
				setCartItems([])
				setCartProducts([])
				setTotal(0)
			}
		}
		loadCartItems()
		setIsLoading(false)

		const handleCartUpdate = () => {
			loadCartItems()
		}

		window.addEventListener('cartUpdated', handleCartUpdate)
		return () => {
			window.removeEventListener('cartUpdated', handleCartUpdate)
		}
	}, [])

	useEffect(() => {
		const fetchClientSecret = async () => {
			try {
				const response = await fetch('/api/create-payment-intent', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ amount: convertToSubcurrency(total) }),
				})
				if (!response.ok) {
					throw new Error('Failed to create payment intent')
				}
				const data = await response.json()
				setClientSecret(data.clientSecret)
			} catch (error) {
				console.error('Error fetching client secret:', error)
				toast.error('Failed to initialize payment. Please try again.')
			}
		}

		if (total > 0) {
			fetchClientSecret()
		}
	}, [total])

	const removeFromCart = (productId: number) => {
		const updatedCart = cartItems.filter(item => item.id !== productId)
		setCartItems(updatedCart)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
		const updatedProducts = cartProducts.filter(
			product => product.id !== productId
		)
		setCartProducts(updatedProducts)
		const newTotal = updatedProducts.reduce(
			(acc: number, product: any) =>
				acc + Number(product.price) * product.quantity,
			0
		)
		setTotal(newTotal)
		window.dispatchEvent(new Event('cartUpdated'))
	}

	if (isLoading) {
		return (
			<div className="py-20">
				<Loading size={64} />
			</div>
		)
	}

	if (cartProducts.length === 0) {
		return (
			<div className="max-w-4xl mx-auto p-6 py-20 text-center">
				<ShoppingBag className="mx-auto size-24 text-gray-400 mb-4" />
				<h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
				<p className="text-xl mb-8">
					{`Looks like you haven't added any items to your cart yet.`}
				</p>
				<Button asChild size="lg">
					<Link href="/products">Start Shopping</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Checkout</h1>
			<div className="flex flex-col lg:flex-row gap-6">
				<div className="lg:w-1/2">
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-[300px] pr-4">
								{cartProducts.map(item => (
									<div
										key={item.id}
										className="flex items-center justify-between py-4 border-b"
									>
										<div className="flex items-center">
											<Image
												src={item.images[0].src[0]}
												alt={item.name}
												width={60}
												height={60}
												className="mr-4 object-cover rounded"
											/>
											<div>
												<h3 className="font-semibold">{item.name}</h3>
												<p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
											</div>
										</div>
										<div className="flex items-center">
											<p className="mr-4">{formatCurrency(item.price * item.quantity)}</p>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => removeFromCart(item.id)}
												className="text-red-500 hover:text-red-700"
											>
												<Trash2 className="h-5 w-5" />
											</Button>
										</div>
									</div>
								))}
							</ScrollArea>
						</CardContent>
						<CardFooter className="flex justify-between">
							<span className="font-bold text-lg">Total:</span>
							<span className="font-bold text-lg">{formatCurrency(total)}</span>
						</CardFooter>
					</Card>
				</div>
				<div className="lg:w-1/2">
					<Card>
						<CardHeader>
							<CardTitle>Payment Details</CardTitle>
						</CardHeader>
						<CardContent>
							{clientSecret && stripePromise && (
								<Elements
									stripe={stripePromise}
									options={{
										clientSecret,
										appearance: {
											rules: {
												'.Label': {
													fontSize: '0',
												},
											},
										},
									}}
								>
									<CheckoutForm
										amount={total}
										cartItems={cartProducts}
										session={user}
										clientSecret={clientSecret}
									/>
								</Elements>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
