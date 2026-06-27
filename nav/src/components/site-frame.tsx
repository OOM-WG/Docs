import { type ReactNode } from 'react'

import { navItems } from '@/data/links'

type SiteFrameProps = {
	children: ReactNode
	logoSrc: string
}

export const SiteFrame = ({ children, logoSrc }: SiteFrameProps) => (
	<div className='flex min-h-dvh flex-col'>
		<header className='border-base-content/10 bg-base-100/88 sticky top-0 z-40 border-b backdrop-blur'>
			<div className='navbar mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-14'>
				<div className='navbar-start'>
					<a className='btn btn-ghost hover:bg-primary/12 gap-3 px-2 text-base' href='/'>
						<img className='h-8 w-8 rounded-md' src={logoSrc} alt='200OK Logo' />
						<span className='font-semibold'>200OK Working</span>
					</a>
				</div>
				<nav className='navbar-end gap-2' data-nosnippet>
					{navItems.map(item => (
						<a className='btn btn-ghost btn-sm hover:bg-primary/12' href={item.url} key={item.url} target='_blank'>
							{item.item}
						</a>
					))}
				</nav>
			</div>
		</header>
		<div className='flex flex-1 flex-col'>{children}</div>
		<footer className='border-base-content/10 bg-base-100/70 border-t' data-nosnippet>
			<div className='text-base-content/60 mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-14'>
				<p>&copy; 回忆溢出工作组</p>
				<p>
					<a
						className='link-hover link'
						href='https://icp.gov.moe/?keyword=20234488'
						rel='noreferrer noopener'
						target='_blank'>
						萌ICP备20234488号
					</a>
				</p>
			</div>
		</footer>
	</div>
)