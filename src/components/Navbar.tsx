'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Heart,
	Home,
	LockKeyhole,
	LogOut,
	PackagePlus,
	ShoppingBasket,
	ShoppingCart,
	Trash2,
	User,
} from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from './ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from './ui/sheet'
import Image from 'next/image'
import { formatCurrency } from '@/lib/formatter'
import { Badge } from './ui/badge'
import Loading from './Loading'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchProducts } from '@/actions/products/productsData'

export default function Navbar({ user }: { user: User }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [cartProducts, setCartProducts] = useState<Products[]>([])
	const [total, setTotal] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setIsLoading(true)
		const loadCartItems = async () => {
			const storedCart = localStorage.getItem('cart')
			if (storedCart) {
				const parsedCart = JSON.parse(storedCart)
				setCartItems(parsedCart)

				const productPromises = parsedCart.map((item: CartItem) =>
					fetchProducts(false, item.id)
				)
				const products = await Promise.all(productPromises)
				const productsWithQuantity = products.map((product, index) => ({
					...product,
					stock_quantity: parsedCart[index].stock_quantity,
				}))
				setCartProducts(productsWithQuantity)

				const newTotal = productsWithQuantity.reduce(
					(acc, product) =>
						acc +
						Number(
							product.sale_price || product.price
						) /* * product.stock_quantity */,
					0
				)
				setTotal(newTotal)
			} else {
				setCartItems([])
				setCartProducts([])
				setTotal(0)
			}
		}
		loadCartItems()
		setIsLoading(false)

		const handleCartUpdate = () => {
			loadCartItems()
		}

		window.addEventListener('cartUpdated', handleCartUpdate)
		return () => {
			window.removeEventListener('cartUpdated', handleCartUpdate)
		}
	}, [])

	async function userSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/')
				},
			},
		})
		router.refresh()
		toast.success('Successfully signed out.')
	}

	const removeFromCart = (productId: number) => {
		const updatedCart = cartItems.filter(item => item.id !== productId)
		setCartItems(updatedCart)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
		setCartProducts(cartProducts.filter(product => product.id !== productId))
		window.dispatchEvent(new Event('cartUpdated'))
	}

	const closeCart = () => setIsCartOpen(false)

	return (
		<nav className="flex justify-between items-center py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0 w-full max-w-screen-xl mx-auto md:rounded-b-2xl">
			<div className="flex items-center gap-4">
				<Link href="/" className="flex items-center space-x-2">
					<Home className="size-6" />
					<span className="font-bold text-xl sm:block hidden">Zaptronic</span>
				</Link>
				<Button asChild variant="link" className="rounded-full">
					<Link href="/products" className="bg-transparent rounded-full">
						Products1
					</Link>
				</Button>
			</div>
			{isLoading ? (
				<Loading size={32} />
			) : (
				<div className="flex items-center gap-2">
					<Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full relative">
								{cartProducts.length > 0 && (
									<Badge
										variant={'destructive'}
										className="px-1.5 absolute -top-1.5 left-6"
									>
										{cartProducts.length}
									</Badge>
								)}
								<ShoppingCart className="scale-125" />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle className="text-xl">Cart</SheetTitle>
								<ScrollArea className="h-[468px] w-full rounded-md border">
									{cartProducts.map(item => (
										<div
											key={item.id}
											className="flex items-center justify-between p-4 border-b"
										>
											<div className="flex items-center">
												<Image
													src={item.images[0].src[0]}
													alt={item.name}
													width={50}
													height={50}
													className="mr-4 object-cover"
												/>
												<div>
													<p className="font-semibold">{item.name}</p>
													<p>{formatCurrency(Number(item.sale_price || item.price))}</p>
												</div>
											</div>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => removeFromCart(item.id)}
											>
												<Trash2 className="size-4" />
											</Button>
										</div>
									))}
								</ScrollArea>
								<div className="flex justify-between font-bold text-lg my-4">
									<span>Total:</span>
									<span>{formatCurrency(total)}</span>
								</div>
								{user ? (
									cartProducts.length > 0 ? (
										<SheetClose asChild>
											<Button asChild className="w-full mt-4" onClick={closeCart}>
												<Link href={'/cart'}>Proceed to checkout</Link>
											</Button>
										</SheetClose>
									) : (
										<p className="text-center mt-4">Your cart is empty</p>
									)
								) : (
									<SheetClose asChild>
										<Button asChild className="w-full mt-4" onClick={closeCart}>
											<Link href={'/login'}>Proceed to checkout</Link>
										</Button>
									</SheetClose>
								)}
							</SheetHeader>
						</SheetContent>
					</Sheet>

					{!user ? (
						<Button asChild variant="ghost" className="rounded-full" size="icon">
							<Link href="/login">
								<User className="size-6 scale-150" />
							</Link>
						</Button>
					) : (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar className="cursor-pointer">
									<AvatarImage src={user?.user?.image || ''} />
									<AvatarFallback>{user?.user?.name?.charAt(0) || ''}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel className="truncate max-w-44">
									{!user?.user?.name ? null : <>Hello, {user?.user?.name}</>}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile">
										<User className="size-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/wishlist">
										<Heart className="size-4" />
										<span>Wishlist</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/orders">
										<ShoppingBasket className="size-4" />
										<span>Orders</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								{user?.user?.role === 'admin' && (
									<>
										<DropdownMenuItem asChild>
											<Link href="/admin">
												<LockKeyhole className="size-4 text-blue-400" />
												<span>Admin</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/admin/create">
												<PackagePlus className="size-4 text-blue-400" />
												<span>Create</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
									</>
								)}
								<DropdownMenuItem onClick={userSignOut}>
									<LogOut className="size-4 text-destructive" />
									<span>Sign Out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			)}
		</nav>
	)
}
