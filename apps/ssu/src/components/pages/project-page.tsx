import { GithubInfo } from 'fumadocs-ui/components/github-info'
import { BookOpen, House } from 'lucide-react'
import Link from 'next/link'

import { type MainProject, docsLinks, getContent, githubRepos, projectName } from '@/content/site'
import { type Locale, Link as LocalizedLink } from '@/i18n/routing'
import { getGithubStars, projectJsonLd } from '@/lib/structured-data'

import { JsonLd } from '../json-ld'
import { ContentSection } from './content-section'

export const ProjectPage = async ({ locale, project }: { locale: Locale; project: MainProject }) => {
	const { mdx, projectConfigs, ui } = getContent(locale)
	const config = projectConfigs[project]
	const githubRepo = githubRepos[project]
	const Body = mdx.projects[project]
	const features = 'features' in config ? config.features : []
	const jsonLd = projectJsonLd(locale, project, await getGithubStars(project))

	return (
		<main className='flex flex-1 flex-col'>
			<JsonLd data={jsonLd} />

			<section className='mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl content-center gap-10 px-7 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 xl:px-20'>
				<div>
					<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
						{config.summary}
					</p>
					<h1 className='max-w-4xl text-5xl leading-tight font-black sm:text-6xl'>
						{config.hero.title ?? projectName(config)}
					</h1>
					<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>{config.hero.description}</p>
					<nav className='mt-8 flex flex-wrap items-center gap-3' aria-label={config.name} data-nosnippet>
						<Link className='btn btn-primary gap-2' href={docsLinks[project]} target='_blank'>
							<BookOpen size={18} />
							{ui.landing.viewDocs}
						</Link>
						<LocalizedLink className='btn btn-outline hover:bg-primary/10 gap-2' href='/'>
							<House size={18} />
							{ui.landing.backHome}
						</LocalizedLink>
						<GithubInfo owner={githubRepo.owner} repo={githubRepo.repo} />
					</nav>
				</div>
				<ul className='m-0 grid list-none gap-4 p-0'>
					{features.map(feature => (
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
			<ContentSection title={ui.landing.moreTitle}>
				<Body />
			</ContentSection>
		</main>
	)
}