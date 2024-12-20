'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { KeyIcon } from 'lucide-react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
export default function Passkey() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSignIn = async () => {
		setIsLoading(true)
		try {
			await authClient.signIn.passkey()
			router.push('/')
		} catch (error) {
			toast.error(`Passkey login failed`)
			console.error('Passkey login failed', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			variant="outline"
			className="flex gap-2 w-full"
			onClick={handleSignIn}
			disabled={isLoading}
		>
			{isLoading ? <Loading size={16} /> : <KeyIcon className="size-4" />}
			Passkey
		</Button>
	)
}
