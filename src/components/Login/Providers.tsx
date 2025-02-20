'use client'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { KeyIcon } from 'lucide-react'
import Github from '../ui/github'
export default function Providers() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const handleSignIn = async () => {
		startTransition(async () => {
			try {
				await authClient.signIn.passkey()
				router.push('/')
			} catch (error) {
				toast.error(`Passkey login failed`)
				console.error('Passkey login failed', error)
			}
		})
	}

	const handleGitHub = async () => {
		startTransition(async () => {
			try {
				await authClient.signIn.social({ provider: 'github', callbackURL: '/' })
				router.refresh()
			} catch (error) {
				toast.error(`GitHub sign-in failed`)
				console.error('GitHub sign-in failed', error)
			}
		})
	}

	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="dark:bg-primary-black bg-primary-white px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="flex gap-4">
				<Button
					variant="outline"
					className="flex gap-2 w-full"
					onClick={handleGitHub}
					disabled={isPending}
				>
					{isPending ? (
						<Loading size={16} />
					) : (
						<Github className="dark:invert-0 invert" />
					)}
					GitHub
				</Button>
			</div>
			<Button
				variant="outline"
				className="flex gap-2 w-full"
				onClick={handleSignIn}
				disabled={isPending}
			>
				{isPending ? <Loading size={16} /> : <KeyIcon className="size-4" />}
				Passkey
			</Button>
		</>
	)
}
