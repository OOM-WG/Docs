import { SiGithub } from '@icons-pack/react-simple-icons'
import { NextProvider } from 'fumadocs-core/framework/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Building2, ChevronDown, Info } from 'lucide-react'
import { type Metadata, type Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { type ReactNode } from 'react'

import { LanguageSwitcher } from '@/components/language-switcher'
import { baseHost, getContent, projects } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/locale'
import { routing } from '@/i18n/routing'
import { getSiteFromHost, getSiteHref } from '@/lib/routing'

import '../globals.css'

import ssuLogo from '../../../../../docs/images/logo/ssu.webp'
import suuLogo from '../../../../../docs/images/logo/suu.webp'

export const metadata = {
	metadataBase: new URL(`https://${baseHost}`),
	verification: {
		other: {
			'baidu-site-verification': 'codeva-nXvaJYt4E0'
		}
	}
} satisfies Metadata

export const viewport = {
	themeColor: '#e6be8a'
} satisfies Viewport

export const generateStaticParams = () => routing.locales.map(locale => ({ locale }))

const LayoutProviders = ({ children }: { children: ReactNode }) => (
	<NextIntlClientProvider>
		<RootProvider>
			<NextProvider>{children}</NextProvider>
		</RootProvider>
	</NextIntlClientProvider>
)

const headerButtonClass = 'btn btn-ghost btn-sm hover:bg-primary/12 shrink-0 gap-2 whitespace-nowrap'
const headerButtonLabelClass = 'hidden whitespace-nowrap min-[860px]:inline'

export default async ({ children, params }: LayoutProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)
	setRequestLocale(locale)

	const host = (await headers()).get('host')
	const site = getSiteFromHost(host)
	const { siteConfigs, ui } = getContent(locale)

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.cn' />
				<link rel='preconnect' href='https://fonts.gstatic.cn' crossOrigin='' />
			</head>
			<body>
				{process.env.NODE_ENV === 'production' && (
					<Script src='//☁️.ja7.top/🍥.js?ms=xf0q5hpejz' strategy='afterInteractive' />
				)}

				<LayoutProviders>
					<div className='flex min-h-dvh flex-col'>
						<header className='border-base-content/10 bg-base-100/88 sticky top-0 z-40 border-b backdrop-blur'>
							<div className='navbar mx-auto w-full max-w-7xl gap-2 px-5 sm:px-8 lg:px-12 xl:px-14'>
								<div className='navbar-start min-w-0 flex-1'>
									<Link
										className='btn btn-ghost hover:bg-primary/12 gap-3 px-2 text-base'
										href={getSiteHref('main', locale, '/', host)}
										aria-label='ShiroSU'>
										<Image
											src={site === 'utils' ? suuLogo : ssuLogo}
											width={32}
											height={32}
											alt='ShiroSU Logo'
											className='rounded-md'
										/>
										<span className='font-semibold'>ShiroSU</span>
									</Link>
								</div>
								<nav className='navbar-center flex flex-none' aria-label={ui.nav.projects}>
									<div className='bg-base-content/5 flex rounded-lg p-0.5'>
										<Link
											className='btn btn-ghost btn-sm hover:bg-primary/12 hidden h-8 min-h-8 shrink-0 rounded-r-sm px-3 min-[520px]:inline-flex'
											href={getSiteHref('main', locale, '/', host)}
											aria-label='SSU'>
											SSU
										</Link>
										<div className='dropdown dropdown-bottom border-base-content/10 min-[520px]:border-l'>
											<button
												type='button'
												tabIndex={0}
												className='btn btn-ghost btn-sm btn-square hover:bg-primary/12 h-8 min-h-8 rounded-l-sm'
												aria-label={ui.nav.projects}
												aria-haspopup='menu'
												title={ui.nav.projects}>
												<ChevronDown size={16} />
											</button>
											<ul
												tabIndex={0}
												aria-label={ui.nav.projects}
												className='menu dropdown-content bg-base-100 border-base-content/10 z-50 mt-3 w-52 rounded-lg border p-2 shadow-xl'>
												{projects.map(project => (
													<li key={project}>
														<Link href={getSiteHref(project, locale, '/', host)}>
															{siteConfigs[project].shortName ?? siteConfigs[project].name}
														</Link>
													</li>
												))}
											</ul>
										</div>
									</div>
								</nav>
								<nav className='navbar-end min-w-0 flex-1 gap-1 sm:gap-2' aria-label='ShiroSU links' data-nosnippet>
									<Link
										className={headerButtonClass}
										href={getSiteHref('main', locale, '/about', host)}
										aria-label={ui.nav.about}
										title={ui.nav.about}>
										<Info size={16} />
										<span className={headerButtonLabelClass}>{ui.nav.about}</span>
									</Link>
									<Link
										className={headerButtonClass}
										href='https://oom-wg.dev/'
										target='_blank'
										rel='noreferrer noopener'
										aria-label={ui.nav.organization}
										title={ui.nav.organization}>
										<Building2 size={16} />
										<span className={headerButtonLabelClass}>{ui.nav.organization}</span>
									</Link>
									<Link
										className={headerButtonClass}
										href='https://github.com/OOM-WG'
										rel='noreferrer noopener'
										target='_blank'
										aria-label='GitHub'
										title='GitHub'>
										<SiGithub size={16} />
										<span className={headerButtonLabelClass}>GitHub</span>
									</Link>
									<LanguageSwitcher label={ui.nav.language} />
								</nav>
							</div>
						</header>
						<div className='flex flex-1 flex-col'>{children}</div>
						<footer className='border-base-content/10 bg-base-100/70 border-t' data-nosnippet>
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
				</LayoutProviders>
			</body>
		</html>
	)
}