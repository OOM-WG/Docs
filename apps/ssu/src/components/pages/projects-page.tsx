import { ArrowRight } from 'lucide-react'

import { getContent, mainProjects, projectName, subprojects } from '@/content/site'
import { Link, type Locale } from '@/i18n/routing'
import { mainJsonLd } from '@/lib/structured-data'

import { JsonLd } from '../json-ld'

export const ProjectsPage = ({ locale }: { locale: Locale }) => {
	const { pages, projectConfigs, ui } = getContent(locale)
	const copy = ui.projects
	const jsonLd = mainJsonLd(locale, '/projects')

	return (
		<main className='flex flex-1 flex-col'>
			<JsonLd data={jsonLd} />

			<section className='mx-auto w-full max-w-7xl px-7 py-16 sm:px-10 lg:px-16 xl:px-20'>
				<header className='max-w-3xl'>
					<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
						Projects
					</p>
					<h1 className='text-5xl leading-tight font-black sm:text-6xl'>{pages.projects.title}</h1>
					<p className='text-base-content/72 mt-6 text-lg leading-8'>{copy.description}</p>
				</header>

				<div id='main' className='mt-14 scroll-mt-20'>
					<div className='mb-8 max-w-2xl'>
						<h2 className='text-3xl font-black'>{copy.primaryTitle}</h2>
						<p className='text-base-content/70 mt-3 leading-7'>{copy.primaryDescription}</p>
					</div>
					<ul className='m-0 grid list-none gap-4 p-0 md:grid-cols-3'>
						{mainProjects.map(project => {
							const config = projectConfigs[project]

							return (
								<li key={project}>
									<Link
										className='group border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 flex min-h-64 flex-col rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]'
										href={`/${project}`}>
										<div className='bg-primary/12 text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-lg'>
											<config.icon size={24} />
										</div>
										<h3 className='text-xl font-black'>{config.hero.title ?? projectName(config)}</h3>
										<p className='text-base-content/70 mt-3 leading-7'>{config.description}</p>
										<div
											className='text-primary mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold'
											data-nosnippet>
											{ui.landing.enterPage}
											<ArrowRight size={16} className='transition group-hover:translate-x-1' />
										</div>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>

				<div id='sub' className='border-base-content/10 mt-16 scroll-mt-20 border-t pt-12'>
					<div className='mb-6 max-w-2xl'>
						<h2 className='text-3xl font-black'>{copy.subTitle}</h2>
						<p className='text-base-content/70 mt-3 leading-7'>{copy.subDescription}</p>
					</div>
					<ul className='border-base-content/10 m-0 list-none border-y p-0'>
						{subprojects.map(project => {
							const config = projectConfigs[project]

							return (
								<li key={project} className='border-base-content/10 border-b last:border-b-0'>
									<Link
										className='group hover:bg-primary/8 flex items-center gap-4 px-1 py-5 transition-colors sm:px-5'
										href={`/${project}`}>
										<div className='text-primary shrink-0'>
											<config.icon size={22} />
										</div>
										<div className='min-w-0 flex-1'>
											<h3 className='font-bold'>{projectName(config)}</h3>
											<p className='text-base-content/65 mt-1 truncate text-sm'>{config.summary}</p>
										</div>
										<ArrowRight
											className='text-base-content/50 shrink-0 transition-transform group-hover:translate-x-1'
											size={18}
										/>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</section>
		</main>
	)
}