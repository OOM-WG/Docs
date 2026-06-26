import { ExternalLink } from 'lucide-react'

import { type NavLink } from '@/data/links'

export const LinkCard = ({ link }: { link: NavLink }) => (
	<a
		className='group border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 flex min-h-32 gap-4 rounded-xl border p-4 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]'
		href={link.url}
		rel='noreferrer noopener'
		target='_blank'>
		<div className='avatar shrink-0'>
			<div className='rounded-box bg-base-200 ring-base-content/8 h-12 w-12 ring-1'>
				<img src={link.icon} loading='lazy' referrerPolicy='no-referrer' />
			</div>
		</div>
		<div className='min-w-0 flex-1'>
			<div className='flex items-start justify-between gap-2'>
				<h3 className='truncate font-bold'>{link.title}</h3>
				<ExternalLink className='text-base-content/45 group-hover:text-primary mt-0.5 shrink-0 transition' size={16} />
			</div>
			{link.description ? (
				<p className='text-base-content/68 mt-2 line-clamp-2 text-sm leading-6'>{link.description}</p>
			) : null}
			<p className='text-base-content/45 mt-3 truncate text-xs'>{new URL(link.url).hostname}</p>
		</div>
	</a>
)