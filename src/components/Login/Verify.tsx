'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Mail } from 'lucide-react'
import resendLogin from '../actions/resendLogin'

export default function Verify() {
	const searchParams = useSearchParams()
	const [email, setEmail] = useState('')
	const [cooldown, setCooldown] = useState(false)

	useEffect(() => {
		const emailParam = searchParams.get('email')
		if (emailParam) {
			setEmail(emailParam)
		}
	}, [searchParams])

	const handleResend = async (formData: FormData) => {
		try {
			await resendLogin(formData)
			toast.success('Magic Link resent successfully.', {
				position: 'bottom-center',
			})
			setCooldown(true)
			setTimeout(() => setCooldown(false), 15000)
		} catch (error) {
			console.error(error)
			toast.error('Failed to resend Magic Link.', {
				position: 'bottom-center',
			})
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Magic Link Sent!
				</CardTitle>
				<CardDescription className="text-center">
					{`We've sent a Magic Link to your email address. Please check your inbox.`}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-center text-muted-foreground">
					<Mail className="mr-2 h-6 w-6" />
					<span>{email || ''}</span>
				</div>
				<p className="text-center text-sm text-muted-foreground">
					{`Didn't receive the email? Check your spam folder or try resending.`}
				</p>
			</CardContent>
			<CardFooter>
				<form action={handleResend} className="w-full space-y-4">
					<Input
						type="email"
						name="email"
						placeholder="Confirm your email"
						required
						defaultValue={email}
						className="w-full"
					/>
					<Button disabled={cooldown} type="submit" className="w-full">
						<p>Resend Magic Link</p>
					</Button>
				</form>
			</CardFooter>
		</Card>
	)
}
