import { NextProvider } from 'fumadocs-core/framework/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Info, ShieldCheck } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import NextLink from 'next/link'
import Script from 'next/script'
import { type ReactNode, Suspense } from 'react'

import { DeferredFonts } from '@/components/deferred-fonts'
import { LanguageSwitcher } from '@/components/language-switcher'
import { type ProjectKey, getContent } from '@/content/site'
import { Link, type Locale } from '@/i18n/routing'

import '@/styles/globals.css'

import ssuLogo from '../../../../docs/images/logo/ssu.webp'
import suuLogo from '../../../../docs/images/logo/suu.webp'

const LayoutProviders = ({ children }: { children: ReactNode }) => (
	<NextIntlClientProvider>
		<RootProvider>
			<NextProvider>{children}</NextProvider>
		</RootProvider>
	</NextIntlClientProvider>
)

const headerButtonClass = 'btn btn-ghost btn-sm hover:bg-primary/12 shrink-0 gap-2 whitespace-nowrap'
const headerButtonLabelClass = 'hidden whitespace-nowrap min-[860px]:inline'

export default function BaseLayout({
	children,
	locale,
	project
}: {
	children: ReactNode
	locale: Locale
	project?: ProjectKey
}) {
	setRequestLocale(locale)
	const { ui } = getContent(locale)

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<DeferredFonts />

				{process.env.NODE_ENV === 'production' && (
					<>
						<Script src='//☁.gal.tf/🍥.js?ms=xf0q5hpejz' strategy='afterInteractive' />
						<Script
							id='ttzz'
							src='//lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?2affdf24df9ee3181a6c354e74e81c488dbaa108802bce516e46bda6ca694db0fd9a9dcb5ced4d7780eb6f3bbd089073c2a6d54440560d63862bbf4ec01bba3a'
							strategy='afterInteractive'
						/>
					</>
				)}
			</head>

			<body className='flex min-h-dvh flex-col'>
				<LayoutProviders>
					<header className='border-base-content/10 bg-base-100/88 sticky top-0 z-40 border-b backdrop-blur'>
						<div className='navbar mx-auto w-full max-w-7xl gap-2 px-5 sm:px-8 lg:px-12 xl:px-14'>
							<div className='navbar-start min-w-0 flex-1'>
								<div className='flex min-w-0 items-center gap-2'>
									<Link className='btn btn-ghost hover:bg-primary/12 gap-3 px-2 text-base' href='/' aria-label='ShiroSU'>
										<Image
											src={project === 'utils' ? suuLogo : ssuLogo}
											width={32}
											height={32}
											alt='ShiroSU Logo'
											className='rounded-md'
										/>
										<span className='font-semibold'>{project === 'utils' ? 'SUU' : 'ShiroSU'}</span>
									</Link>
									<span className='bg-base-content/15 h-6 w-px' aria-hidden />
									<Link className='btn btn-ghost btn-sm hover:bg-primary/12 shrink-0' href='/projects'>
										{ui.nav.projects}
									</Link>
								</div>
							</div>
							<nav className='navbar-end min-w-0 flex-1 gap-1 sm:gap-2' aria-label='ShiroSU links'>
								<Link className={headerButtonClass} href='/about' aria-label={ui.nav.about} title={ui.nav.about}>
									<Info size={16} />
									<span className={headerButtonLabelClass}>{ui.nav.about}</span>
								</Link>
								<Link className={headerButtonClass} href='/security' aria-label={ui.nav.security} title={ui.nav.security}>
									<ShieldCheck size={16} />
									<span className={headerButtonLabelClass}>{ui.nav.security}</span>
								</Link>
								<Suspense fallback={<div className='h-8 w-8' />}>
									<LanguageSwitcher label={ui.nav.language} />
								</Suspense>
							</nav>
						</div>
					</header>
					{children}
					<footer className='border-base-content/10 bg-base-100/70 border-t' data-nosnippet>
						<div className='text-base-content/60 mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-14'>
							<p>
								&copy; {project === 'utils' ? 'SUU' : 'SSU'} Developers (
								<NextLink className='link-hover link' href='https://oom-wg.dev/' target='_blank'>
									OOM WG
								</NextLink>
								)
							</p>
							<p>
								Licensed under the{' '}
								<NextLink className='link-hover link' href='https://license.fileto.download/'>
									File to Downloader License
								</NextLink>
							</p>
						</div>
					</footer>
				</LayoutProviders>
			</body>
		</html>
	)
}