'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { KeyIcon, SettingsIcon, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Loading from '@/components/Loading'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export default function Settings() {
	const { data: session } = authClient.useSession()
	const [isLoading, setIsLoading] = useState(false)
	const [name, setName] = useState('')
	const [picture, setPicture] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setName(session?.user?.name || '')
		setPicture(session?.user?.image || '')
	}, [session])

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			await authClient.updateUser({ image: picture, name: name })
			toast.success('Profile updated successfully')
			setIsOpen(false)
		} catch (error) {
			toast.error('Failed to update profile')
			console.error('Error updating profile:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<SettingsIcon className="size-4" />
					Account Settings
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>
						Update your account information here.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="size-16">
						<AvatarImage src={picture} alt={name} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{name?.charAt(0) ?? ''}
						</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<p className="text-sm font-medium max-w-72 truncate">{name}</p>
						<p className="text-sm text-muted-foreground max-w-72 truncate">
							{session?.user?.email}
						</p>
					</div>
				</div>
				{session?.user?.role === 'admin' && (
					<Button size="sm" asChild>
						<Link href="/admin">
							<LockKeyhole className="size-4" />
							Admin dashboard
						</Link>
					</Button>
				)}
				<form onSubmit={handleSave} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							value={name}
							disabled={isLoading}
							onChange={e => setName(e.target.value)}
							maxLength={64}
							required
							placeholder="Your name"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="picture">Image URL</Label>
						<Input
							id="picture"
							value={picture}
							disabled={isLoading}
							onChange={e => setPicture(e.target.value)}
							placeholder="https://example.com/avatar.jpg"
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? <Loading size={16} /> : 'Save Changes'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
