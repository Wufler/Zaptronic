'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Loading from '@/components/Loading'
import { formatCurrency } from '@/lib/formatter'
import { addOrder } from '../actions/orders/createOrder'

export function CheckoutForm({
	amount,
	cartItems,
	session,
	clientSecret,
}: {
	amount: number
	cartItems: any[]
	session: any
	clientSecret: string
}) {
	const stripe = useStripe()
	const elements = useElements()
	const [errorMessage, setErrorMessage] = useState<string>()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if (!stripe || !elements) {
			setLoading(false)
			return
		}

		try {
			const { error: submitError } = await elements.submit()
			if (submitError) {
				throw submitError
			}

			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `${window.location.origin}/payment-success`,
				},
				redirect: 'if_required',
			})

			if (error) {
				throw error
			} else if (paymentIntent && paymentIntent.status === 'succeeded') {
				if (session?.user?.id) {
					await addOrder(session.user.id, cartItems, amount)
					localStorage.removeItem('cart')
					toast.success('Payment successful and order placed!', {
						position: 'bottom-center',
					})
					window.dispatchEvent(new Event('cartUpdated'))
					router.push('/payment-success')
				} else {
					throw new Error('User not authenticated')
				}
			} else {
				throw new Error('Payment failed')
			}
		} catch (error: any) {
			console.error('Payment error:', error)
			toast.error(error.message || 'Payment failed. Please try again.', {
				position: 'bottom-center',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div className="flex flex-col gap-3">
					<Label htmlFor="name">Full Name</Label>
					<Input id="name" placeholder="Test" required />
				</div>
				<div className="flex flex-col gap-3">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="test@example.com" required />
				</div>
				<div className="flex flex-col gap-3">
					<Label htmlFor="address">Shipping Address</Label>
					<Input id="address" placeholder="Test 123" required />
				</div>
			</div>
			<Separator />
			<div className="flex flex-col gap-3">
				<Label>Card Details</Label>
				<PaymentElement className={'text-white'} />
			</div>
			{errorMessage && (
				<div className="text-destructive mt-4 text-sm">{errorMessage}</div>
			)}
			<Button type="submit" disabled={!stripe || loading} className="w-full">
				{loading ? (
					<div className="flex items-center justify-center gap-2">
						<Loading size={16} />
						Processing...
					</div>
				) : (
					`Pay ${formatCurrency(amount)}`
				)}
			</Button>
		</form>
	)
}
