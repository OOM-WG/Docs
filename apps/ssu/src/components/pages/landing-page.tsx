import { GithubInfo } from 'fumadocs-ui/components/github-info'
import { ArrowRight, BookOpen, House } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { type ComponentType, type ReactNode } from 'react'

import CompatBody from '@/content/body/compat.mdx'
import MainBody from '@/content/body/main.mdx'
import NewTechBody from '@/content/body/newtech.mdx'
import UtilsBody from '@/content/body/utils.mdx'
import { docsLinks, githubRepos, projectCards, siteConfigs, type SiteKey } from '@/content/site'
import { getSiteHref } from '@/lib/routing'

type LandingPageProps = {
	site: SiteKey
}

const bodyBySite = {
	main: MainBody,
	compat: CompatBody,
	newtech: NewTechBody,
	utils: UtilsBody
} satisfies Record<SiteKey, ComponentType>

export const LandingPage = async ({ site }: LandingPageProps) => {
	const host = (await headers()).get('host')
	const Body = bodyBySite[site]

	return (
		<main className='flex flex-1 flex-col'>
			{site === 'main' ? <MainHero host={host} /> : <ProjectHero site={site as Exclude<SiteKey, 'main'>} host={host} />}
			<MoreSection>
				<Body />
			</MoreSection>
		</main>
	)
}

const MainHero = ({ host }: { host: string | null }) => {
	const config = siteConfigs.main

	return (
		<section className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center gap-10 px-7 py-16 sm:px-10 lg:px-16 xl:px-20'>
			<div className='max-w-4xl'>
				<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase'>{config.summary}</p>
				<h1 className='text-5xl leading-tight font-black sm:text-6xl'>{config.hero.title ?? config.name}</h1>
				<p className='text-base-content/72 mt-6 max-w-3xl text-lg leading-8'>{config.hero.description}</p>
			</div>
			<div className='grid gap-4 md:grid-cols-3'>
				{projectCards.map(project => {
					const Icon = project.icon

					return (
						<Link
							key={project.site}
							className='group border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 flex min-h-64 flex-col rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]'
							href={getSiteHref(project.site, '/', host)}>
							<div className='bg-primary/12 text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-lg'>
								<Icon size={24} />
							</div>
							<h2 className='text-xl font-black'>{project.title}</h2>
							<p className='text-base-content/70 mt-3 leading-7'>{project.description}</p>
							<div className='text-primary mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold' data-nosnippet>
								进入页面
								<ArrowRight size={16} className='transition group-hover:translate-x-1' />
							</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

const ProjectHero = ({ site, host }: { site: Exclude<SiteKey, 'main'>; host: string | null }) => {
	const config = siteConfigs[site]
	const githubRepo = githubRepos[site]

	return (
		<section className='mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl content-center gap-10 px-7 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 xl:px-20'>
			<div>
				<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
					{config.summary}
				</p>
				<h1 className='max-w-4xl text-5xl leading-tight font-black sm:text-6xl' data-nosnippet>
					{config.hero.title ?? `ShiroSU ${config.name}`}
				</h1>
				<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>{config.hero.description}</p>
				<div className='mt-8 flex flex-wrap items-center gap-3' data-nosnippet>
					<Link className='btn btn-primary gap-2' href={docsLinks[site]} target='_blank'>
						<BookOpen size={18} />
						查看文档
					</Link>
					<Link className='btn btn-outline hover:bg-primary/10 gap-2' href={getSiteHref('main', '/', host)}>
						<House size={18} />
						返回主站
					</Link>
					<GithubInfo owner={githubRepo.owner} repo={githubRepo.repo} />
				</div>
			</div>
			<div className='grid gap-4'>
				{config.features.map(feature => {
					const Icon = feature.icon

					return (
						<article
							key={feature.title}
							className='border-base-content/10 bg-base-100/72 hover:border-primary/40 hover:bg-primary/10 rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]'>
							<div className='flex items-start gap-4'>
								<div className='bg-primary/12 text-primary rounded-lg p-3'>
									<Icon size={24} />
								</div>
								<div>
									<h2 className='text-lg font-bold'>{feature.title}</h2>
									<p className='text-base-content/70 mt-2 leading-7'>{feature.description}</p>
								</div>
							</div>
						</article>
					)
				})}
			</div>
		</section>
	)
}

const MoreSection = ({ children }: { children: ReactNode }) => (
	<section className='border-base-content/10 bg-base-100/50 border-t'>
		<div className='mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:px-12'>
			<div className='mb-8'>
				<p className='text-primary text-sm font-semibold tracking-[0.18em] uppercase'>More</p>
				<h2 className='mt-2 text-3xl font-black'>了解更多</h2>
			</div>
			<div className='prose prose-lg max-w-none'>{children}</div>
		</div>
	</section>
)