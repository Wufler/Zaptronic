import { auth } from '@/lib/auth'
import Passkey from '@/components/Login/Passkey'
import Providers from '@/components/Login/Providers'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Email from '@/components/Login/Email'

export default async function LoginPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

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
					<Email />
					<Providers />
					<Passkey />
				</div>
			</div>
		</main>
	)
}
