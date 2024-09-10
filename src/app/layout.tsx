import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import { auth } from '@/auth'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/Navbar'
import Dev from '@/components/Dev'
import NextTopLoader from 'nextjs-toploader'
const inter = Inter({ subsets: ['latin'] })

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
	const session = await auth()
	return (
		<ViewTransitions>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider defaultTheme="system" attribute="class">
						<NextTopLoader showSpinner={false} />
						<Navbar user={session} />
						{children}
						<Footer />
						<Toaster />
						<Dev />
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	)
}
