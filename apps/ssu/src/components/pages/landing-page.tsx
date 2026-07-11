import { GithubInfo } from 'fumadocs-ui/components/github-info'
import { ArrowRight, BookOpen, House } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { type ComponentType, type ReactNode } from 'react'

import EnCompatBody from '@/content/en/compat.mdx'
import EnFetcherBody from '@/content/en/fetcher.mdx'
import EnFlasherBody from '@/content/en/flasher.mdx'
import EnLibraryBody from '@/content/en/library.mdx'
import EnMainBody from '@/content/en/main.mdx'
import EnNewTechBody from '@/content/en/newtech.mdx'
import EnUtilsBody from '@/content/en/utils.mdx'
import { docsLinks, getContent, githubRepos, type SiteKey } from '@/content/site'
import ZhHansCompatBody from '@/content/zh-Hans/compat.mdx'
import ZhHansFetcherBody from '@/content/zh-Hans/fetcher.mdx'
import ZhHansFlasherBody from '@/content/zh-Hans/flasher.mdx'
import ZhHansLibraryBody from '@/content/zh-Hans/library.mdx'
import ZhHansMainBody from '@/content/zh-Hans/main.mdx'
import ZhHansNewTechBody from '@/content/zh-Hans/newtech.mdx'
import ZhHansUtilsBody from '@/content/zh-Hans/utils.mdx'
import ZhHantCompatBody from '@/content/zh-Hant/compat.mdx'
import ZhHantFetcherBody from '@/content/zh-Hant/fetcher.mdx'
import ZhHantFlasherBody from '@/content/zh-Hant/flasher.mdx'
import ZhHantLibraryBody from '@/content/zh-Hant/library.mdx'
import ZhHantMainBody from '@/content/zh-Hant/main.mdx'
import ZhHantNewTechBody from '@/content/zh-Hant/newtech.mdx'
import ZhHantUtilsBody from '@/content/zh-Hant/utils.mdx'
import { type Locale } from '@/i18n/routing'
import { getSiteHref } from '@/lib/routing'

const bodyByLocale = {
	'zh-Hans': {
		main: ZhHansMainBody,
		compat: ZhHansCompatBody,
		newtech: ZhHansNewTechBody,
		flasher: ZhHansFlasherBody,
		fetcher: ZhHansFetcherBody,
		library: ZhHansLibraryBody,
		utils: ZhHansUtilsBody
	},
	'zh-Hant': {
		main: ZhHantMainBody,
		compat: ZhHantCompatBody,
		newtech: ZhHantNewTechBody,
		flasher: ZhHantFlasherBody,
		fetcher: ZhHantFetcherBody,
		library: ZhHantLibraryBody,
		utils: ZhHantUtilsBody
	},
	en: {
		main: EnMainBody,
		compat: EnCompatBody,
		newtech: EnNewTechBody,
		flasher: EnFlasherBody,
		fetcher: EnFetcherBody,
		library: EnLibraryBody,
		utils: EnUtilsBody
	}
} satisfies Record<Locale, Record<SiteKey, ComponentType>>

export const LandingPage = async ({ locale, site }: { locale: Locale; site: SiteKey }) => {
	const host = (await headers()).get('host')
	const Body = bodyByLocale[locale][site]
	const content = getContent(locale)

	return (
		<main className='flex flex-1 flex-col'>
			{site === 'main' ? <MainHero host={host} locale={locale} /> : <ProjectHero site={site} host={host} locale={locale} />}
			<MoreSection moreTitle={content.ui.landing.moreTitle}>
				<Body />
			</MoreSection>
		</main>
	)
}

const MainHero = ({ host, locale }: { host: string | null; locale: Locale }) => {
	const { projectCards, siteConfigs, ui } = getContent(locale)
	const config = siteConfigs.main

	return (
		<section className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center gap-10 px-7 py-16 sm:px-10 lg:px-16 xl:px-20'>
			<div className='max-w-4xl'>
				<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
					{config.summary}
				</p>
				<h1 className='text-5xl leading-tight font-black sm:text-6xl'>{config.hero.title ?? config.name}</h1>
				<p className='text-base-content/72 mt-6 max-w-3xl text-lg leading-8'>{config.hero.description}</p>
			</div>
			<ul className='m-0 grid list-none gap-4 p-0 md:grid-cols-3'>
				{projectCards.map(project => (
					<li key={project.site}>
						<Link
							className='group border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 flex min-h-64 flex-col rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]'
							href={getSiteHref(project.site, locale, '/', host)}>
							<div className='bg-primary/12 text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-lg'>
								<project.icon size={24} />
							</div>
							<h2 className='text-xl font-black'>{project.title}</h2>
							<p className='text-base-content/70 mt-3 leading-7'>{project.description}</p>
							<div className='text-primary mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold' data-nosnippet>
								{ui.landing.enterPage}
								<ArrowRight size={16} className='transition group-hover:translate-x-1' />
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}

const ProjectHero = ({ site, host, locale }: { site: Exclude<SiteKey, 'main'>; host: string | null; locale: Locale }) => {
	const { siteConfigs, ui } = getContent(locale)
	const config = siteConfigs[site]
	const githubRepo = githubRepos[site]

	return (
		<section className='mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl content-center gap-10 px-7 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 xl:px-20'>
			<div>
				<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
					{config.summary}
				</p>
				<h1 className='max-w-4xl text-5xl leading-tight font-black sm:text-6xl'>
					{config.hero.title ?? `ShiroSU ${config.name}`}
				</h1>
				<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>{config.hero.description}</p>
				<nav className='mt-8 flex flex-wrap items-center gap-3' aria-label={config.name} data-nosnippet>
					<Link className='btn btn-primary gap-2' href={docsLinks[site]} target='_blank'>
						<BookOpen size={18} />
						{ui.landing.viewDocs}
					</Link>
					<Link className='btn btn-outline hover:bg-primary/10 gap-2' href={getSiteHref('main', locale, '/', host)}>
						<House size={18} />
						{ui.landing.backHome}
					</Link>
					<GithubInfo owner={githubRepo.owner} repo={githubRepo.repo} />
				</nav>
			</div>
			<ul className='m-0 grid list-none gap-4 p-0'>
				{config.features.map(feature => (
					<li key={feature.title}>
						<article className='border-base-content/10 bg-base-100/72 hover:border-primary/40 hover:bg-primary/10 rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]'>
							<div className='flex items-start gap-4'>
								<div className='bg-primary/12 text-primary rounded-lg p-3'>
									<feature.icon size={24} />
								</div>
								<div>
									<h2 className='text-lg font-bold'>{feature.title}</h2>
									<p className='text-base-content/70 mt-2 leading-7'>{feature.description}</p>
								</div>
							</div>
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}

const MoreSection = ({ children, moreTitle }: { children: ReactNode; moreTitle: string }) => (
	<section className='border-base-content/10 bg-base-100/50 border-t'>
		<div className='mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:px-12'>
			<div className='mb-8'>
				<p className='text-primary text-sm font-semibold tracking-[0.18em] uppercase' data-nosnippet>
					More
				</p>
				<h2 className='mt-2 text-3xl font-black'>{moreTitle}</h2>
			</div>
			<div className='prose prose-lg max-w-none'>{children}</div>
		</div>
	</section>
)