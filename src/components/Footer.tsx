'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun, Mail, Phone } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Footer() {
	const { setTheme, resolvedTheme } = useTheme()

	return (
		<footer className="w-full border-t border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Zaptronic</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Products for developers!
						</p>
					</div>
					<div className="flex flex-col space-y-4">
						<h3 className="text-lg font-semibold">Contact Us</h3>
						<div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
							<div className="flex gap-2 items-center">
								<Mail className="text-gray-600 size-5" />
								<p>Email:</p>
							</div>
							<Link href="mailto:wolfey.bus@outlook.com">
								<span className="hover:underline">zaptronic@example.com</span>
							</Link>
						</div>
						<div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
							<div className="flex gap-2 items-center">
								<Phone className="text-gray-600 size-5" />
								<p>Phone:</p>
							</div>
							<Link href="tel:1234567890">
								<span className="hover:underline">+1234567890</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0">
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center space-x-4">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							&copy; 2024 Zaptronic
						</p>
						<Link
							href="/"
							className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
						>
							Terms of Service
						</Link>
						<Button
							variant="outline"
							className="size-10"
							onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
						>
							<Sun className="rotate-0 scale-125 dark:-rotate-90 dark:scale-0 transition-all" />
							<Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-125 transition-all" />
						</Button>
					</div>
				</div>
			</div>
		</footer>
	)
}
