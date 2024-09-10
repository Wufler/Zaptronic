import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'
import { CheckCircle } from 'lucide-react'

export default function PaymentSuccess() {
	return (
		<div className="bg-primary-white dark:bg-primary-black py-20">
			<div className="max-w-3xl mx-auto p-6 text-center">
				<div className="mb-8">
					<CheckCircle className="mx-auto size-24 text-green-500" />
				</div>
				<h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
				<p className="text-xl mb-8">
					Thank you for your purchase. Your order has been processed successfully.
				</p>
				<div className="flex justify-center gap-2">
					<Button asChild variant="outline" size="lg">
						<Link href="/products">Continue Shopping</Link>
					</Button>
					<Button asChild size="lg">
						<Link href="/orders">View all orders</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
