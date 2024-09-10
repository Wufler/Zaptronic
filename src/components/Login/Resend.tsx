'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import resendLogin from '../actions/resendLogin'

export default function Resend() {
	const router = useRouter()
	const handleSubmit = async (formData: FormData) => {
		try {
			await resendLogin(formData)
			const email = formData.get('email')
			router.push(`/login/verify?email=${encodeURIComponent(email as string)}`)
		} catch (error) {
			console.error(error)
			toast.error('An unexpected error occurred.', {
				position: 'bottom-center',
			})
		}
	}
	return (
		<form action={handleSubmit}>
			<Input
				type="email"
				name="email"
				placeholder="Enter your email"
				required
				disabled
				className="mb-4"
			/>
			<Button type="submit" disabled className="w-full">
				Sign in with Magic Link
			</Button>
			<p className="mt-2 text-muted-foreground text-sm">Temporarily Disabled</p>
		</form>
	)
}
