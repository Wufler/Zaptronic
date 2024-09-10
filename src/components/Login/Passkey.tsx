'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/webauthn'
import { Button } from '@/components/ui/button'
import { KeyIcon } from 'lucide-react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'

export default function Passkey() {
	const [isLoading, setIsLoading] = useState(false)

	const handleSignIn = async () => {
		setIsLoading(true)
		try {
			await signIn('passkey', { callbackUrl: '/' })
		} catch (error) {
			toast.error(`Passkey login failed`, {
				position: 'bottom-center',
			})
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
