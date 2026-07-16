import { NextProvider } from 'fumadocs-core/framework/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { ChevronDown, Info, ShieldCheck } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import NextLink from 'next/link'
import { type ReactNode, Suspense } from 'react'

import { DeferredFonts } from '@/components/deferred-fonts'
import { JsonLd } from '@/components/json-ld'
import { LanguageSwitcher } from '@/components/language-switcher'
import { type ProjectKey, getContent, projects } from '@/content/site'
import { Link, type Locale } from '@/i18n/routing'
import { commonJsonLd, getGithubStars, mainJsonLd, projectJsonLd } from '@/lib/structured-data'

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

export default async function BaseLayout({
	children,
	locale,
	common,
	project
}: {
	children: ReactNode
	locale: Locale
	common?: boolean
	project?: ProjectKey
}) {
	setRequestLocale(locale)
	const { projectConfigs, ui } = getContent(locale)

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<JsonLd
					data={
						common
							? commonJsonLd()
							: project
								? projectJsonLd(projectConfigs[project], await getGithubStars(project))
								: mainJsonLd(locale)
					}
				/>
				<DeferredFonts />

				{process.env.NODE_ENV === 'production' && <script defer src='//☁.gal.tf/🍥.js?ms=xf0q5hpejz' />}
			</head>

			<body className='flex min-h-dvh flex-col'>
				<LayoutProviders>
					<header className='border-base-content/10 bg-base-100/88 sticky top-0 z-40 border-b backdrop-blur'>
						<div className='navbar mx-auto w-full max-w-7xl gap-2 px-5 sm:px-8 lg:px-12 xl:px-14'>
							<div className='navbar-start min-w-0 flex-1'>
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
							</div>
							<nav className='navbar-center flex flex-none' aria-label={ui.nav.projects}>
								<div className='bg-base-content/5 flex rounded-lg p-0.5'>
									<Link
										className='btn btn-ghost btn-sm hover:bg-primary/12 hidden h-8 min-h-8 shrink-0 rounded-r-sm px-3 min-[520px]:inline-flex'
										href='/'
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
													<Link href={`/${project}`}>{projectConfigs[project].shortName ?? projectConfigs[project].name}</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							</nav>
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