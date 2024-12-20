import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/Navbar'
import NextTopLoader from 'nextjs-toploader'
const inter = Inter({ subsets: ['latin'] })
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const metadata: Metadata = {
	title: 'Zaptronic',
	description: 'Discover tools and gear that power your development.',
	openGraph: {
		title: 'Zaptronic',
		description: 'Discover tools and gear that power your development.',
		url: 'https://zaptronic.vercel.app',
		images: [
			{
				url: 'https://wolfey.s-ul.eu/KGpeKVd2',
				width: 1280,
				height: 720,
				alt: 'Thumbnail',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextTopLoader showSpinner={false} />
					<Navbar user={session} />
					{children}
					<Footer />
					<Toaster position="bottom-center" />
				</ThemeProvider>
			</body>
		</html>
	)
}
