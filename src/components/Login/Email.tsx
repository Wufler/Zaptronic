'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useTransition } from 'react'

export default function Email() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			try {
				await authClient.signIn.magicLink({
					email: formData.get('email') as string,
					callbackURL: '/',
				})
				router.push(
					`/login/verify?email=${encodeURIComponent(
						formData.get('email') as string
					)}`
				)
			} catch (error) {
				console.error(error)
				toast.error('An unexpected error occurred.')
			}
		})
	}
	return (
		<form action={handleSubmit}>
			<Input
				type="email"
				name="email"
				placeholder="Enter your email"
				required
				className="mb-4"
			/>
			<Button type="submit" className="w-full" disabled={isPending}>
				Sign in with Magic Link
			</Button>
		</form>
	)
}
