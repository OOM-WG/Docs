import { GithubInfo } from 'fumadocs-ui/components/github-info'
import { ArrowRight, BookOpen, GitBranchPlus, House, LandPlot } from 'lucide-react'
import Link from 'next/link'

import { type Subproject, docsLinks, getContent, githubRepos, projectName } from '@/content/site'
import { type Locale } from '@/i18n/routing'
import { localizeInternalHref } from '@/lib/locale-path'
import { projectJsonLd } from '@/lib/structured-data'

import { JsonLd } from '../json-ld'

export const SubprojectPage = ({ locale, project }: { locale: Locale; project: Subproject }) => {
	const { mdx, projectConfigs, ui } = getContent(locale)
	const config = projectConfigs[project]
	const githubRepo = githubRepos[project]
	const copy = ui.subproject
	const Body = mdx.projects[project]
	const jsonLd = projectJsonLd(locale, project)

	return (
		<main className='flex flex-1 flex-col'>
			<JsonLd data={jsonLd} />

			<div className='mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.46fr)]'>
				<section className='flex min-h-[68dvh] flex-col justify-center px-7 py-16 sm:px-10 lg:col-start-1 lg:row-start-1 lg:px-16 xl:px-20'>
					<div className='max-w-3xl'>
						<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
							{config.summary}
						</p>
						<h1 className='text-5xl leading-tight font-black sm:text-6xl'>{config.hero.title ?? projectName(config)}</h1>
						<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>{config.hero.description}</p>
						<nav className='mt-8 flex flex-wrap items-center gap-3' aria-label={config.name} data-nosnippet>
							<Link className='btn btn-primary gap-2' href={docsLinks[project]} target='_blank'>
								<BookOpen size={18} />
								{ui.landing.viewDocs}
							</Link>
							<Link className='btn btn-outline hover:bg-primary/10 gap-2' href={localizeInternalHref('/', locale)}>
								<House size={18} />
								{ui.landing.backHome}
							</Link>
							<GithubInfo owner={githubRepo.owner} repo={githubRepo.repo} />
						</nav>
					</div>
				</section>

				<section className='mx-auto w-[calc(100%-4.5rem)] max-w-4xl pb-16 lg:col-span-2 lg:row-start-2'>
					<div className='prose prose-lg max-w-none'>
						<Body />
					</div>
				</section>

				<aside
					className='border-base-content/10 grid content-center gap-3 border-t px-7 py-12 sm:px-10 lg:col-start-2 lg:row-start-1 lg:self-center lg:border-t-0 lg:border-l lg:px-10 xl:px-14'
					aria-label={copy.moreProjects}
					data-nosnippet>
					<p className='text-base-content/60 text-sm font-semibold'>{copy.moreProjects}</p>
					<Link
						className='group border-base-content/10 bg-base-100/72 hover:border-primary/45 hover:bg-primary/8 rounded-lg border p-5 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5'
						href={localizeInternalHref('/projects#main', locale)}>
						<div className='text-primary mb-4'>
							<LandPlot size={22} />
						</div>
						<div className='flex items-center justify-between gap-4'>
							<h2 className='font-bold'>{copy.mainProjects}</h2>
							<ArrowRight className='text-primary shrink-0 transition-transform group-hover:translate-x-1' size={17} />
						</div>
						<p className='text-base-content/65 mt-2 text-sm leading-6'>{copy.mainProjectsDescription}</p>
					</Link>
					<Link
						className='group border-base-content/10 bg-base-100/72 hover:border-primary/45 hover:bg-primary/8 rounded-lg border p-5 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5'
						href={localizeInternalHref('/projects#sub', locale)}>
						<div className='text-primary mb-4'>
							<GitBranchPlus size={22} />
						</div>
						<div className='flex items-center justify-between gap-4'>
							<h2 className='font-bold'>{copy.supportingProjects}</h2>
							<ArrowRight className='text-primary shrink-0 transition-transform group-hover:translate-x-1' size={17} />
						</div>
						<p className='text-base-content/65 mt-2 text-sm leading-6'>{copy.supportingProjectsDescription}</p>
					</Link>
				</aside>
			</div>
		</main>
	)
}