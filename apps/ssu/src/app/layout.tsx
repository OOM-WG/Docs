import { SiGithub } from '@icons-pack/react-simple-icons'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Building2, Info } from 'lucide-react'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'

import { baseHost, siteConfigs, siteOrder } from '@/content/site'
import { getCurrentHost, getSiteHref } from '@/lib/routing'

import './globals.css'
import ssuLogo from '../../../../docs/images/logo/ssu.webp'

export const metadata = {
	metadataBase: new URL(`https://${baseHost}`),
	title: {
		default: 'ShiroSU',
		template: '%s | ShiroSU'
	},
	verification: {
		other: {
			'baidu-site-verification': 'codeva-nXvaJYt4E0'
		}
	}
} satisfies Metadata

export default async ({ children }: Readonly<{ children: ReactNode }>) => {
	const host = await getCurrentHost()

	return (
		<html lang='zh-Hans' suppressHydrationWarning>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.cn' />
				<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='' />
			</head>
			<body>
				<RootProvider>
					<div className='flex min-h-dvh flex-col'>
						<header className='border-base-content/10 bg-base-100/88 sticky top-0 z-40 border-b backdrop-blur'>
							<div className='navbar mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-14'>
								<div className='navbar-start'>
									<Link
										className='btn btn-ghost hover:bg-primary/12 gap-3 px-2 text-base'
										href={getSiteHref('main', '/', host)}>
										<Image src={ssuLogo} width={32} height={32} alt='ShiroSU Logo' className='rounded-md' />
										<span className='font-semibold'>ShiroSU</span>
									</Link>
								</div>
								<nav className='navbar-center hidden gap-1 lg:flex'>
									{siteOrder.map(site => (
										<Link className='btn btn-ghost btn-sm hover:bg-primary/12' href={getSiteHref(site, '/', host)} key={site}>
											{siteConfigs[site].shortLabel}
										</Link>
									))}
								</nav>
								<div className='navbar-end gap-2'>
									<Link className='btn btn-ghost btn-sm hover:bg-primary/12 gap-2' href={getSiteHref('main', '/about', host)}>
										<Info size={16} />
										<span className='max-[460px]:hidden'>关于</span>
									</Link>
									<Link className='btn btn-ghost btn-sm hover:bg-primary/12 gap-2' href='https://oom-wg.dev/' target='_blank'>
										<Building2 size={16} />
										<span className='max-[460px]:hidden'>组织</span>
									</Link>
									<Link
										className='btn btn-ghost btn-sm hover:bg-primary/12 gap-2'
										href='https://github.com/OOM-WG'
										rel='noreferrer noopener'
										target='_blank'>
										<SiGithub size={16} />
										<span className='max-[560px]:hidden'>GitHub</span>
									</Link>
								</div>
							</div>
						</header>
						<div className='flex flex-1 flex-col'>{children}</div>
						<footer className='border-base-content/10 bg-base-100/70 border-t'>
							<div className='text-base-content/60 mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-14'>
								<p>&copy; SSU Developers (OOM WG)</p>
								<p>
									Licensed under the{' '}
									<Link className='link-hover link' href='https://license.fileto.download/'>
										File to Downloader License
									</Link>
								</p>
							</div>
						</footer>
					</div>
				</RootProvider>
			</body>
		</html>
	)
}