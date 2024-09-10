import { auth } from '@/auth'
import Passkey from '@/components/Login/Passkey'
import Providers from '@/components/Login/Providers'
import Resend from '@/components/Login/Resend'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
	const session = await auth()

	if (session) {
		redirect('/')
	}

	return (
		<main className="dark:bg-primary-black bg-primary-white flex items-center justify-center py-16 px-6">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Sign in to purchase and track orders
					</p>
				</div>
				<div className="space-y-4">
					<Resend />
					<Providers />
					<Passkey />
				</div>
			</div>
		</main>
	)
}
