import { OctagonAlert } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Link } from 'next-view-transitions'

export default function Dev() {
	return (
		<>
			{process.env.DEV === 'true' && (
				<TooltipProvider delayDuration={100}>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="fixed bottom-0 bg-slate-950 p-2 rounded-tr-md">
								<OctagonAlert className="size-6 text-yellow-400 cursor-pointer" />
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<div className="text-black dark:text-white">
								<p>You are currently in a development build.</p>
								<div className="text-slate-700 dark:text-slate-300 text-xs">
									<p>All of the data here is not in production.</p>
									<div className="flex gap-1">
										<p>Get into the production build</p>
										<Link
											href={'https://zaptronic.vercel.app/'}
											className="text-blue-500 underline"
										>
											here
										</Link>
									</div>
								</div>
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</>
	)
}
