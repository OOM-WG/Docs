import { BookOpen, FolderKanban } from 'lucide-react'

import { docsLinks, getContent, getMainConfig } from '@/content/site'
import { Link, type Locale } from '@/i18n/routing'
import { mainJsonLd } from '@/lib/structured-data'

import { JsonLd } from '../json-ld'
import { ContentSection } from './content-section'

export const MainPage = ({ locale }: { locale: Locale }) => {
	const { components, mdx, ui } = getContent(locale)
	const config = getMainConfig(locale)
	const jsonLd = mainJsonLd(locale, '/')

	return (
		<main className='flex flex-1 flex-col'>
			<JsonLd data={jsonLd} />

			<section className='mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl content-center gap-10 px-7 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 xl:px-20'>
				<div>
					<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
						{config.summary}
					</p>
					<div className='flex flex-wrap items-end gap-x-2 gap-y-1'>
						<h1 className='max-w-4xl text-5xl leading-tight font-black sm:text-6xl'>{config.name}</h1>
						<Link
							className='btn btn-ghost btn-sm text-primary hover:bg-primary/12 mb-1 shrink-0 whitespace-nowrap'
							href='/why-shirosu'
							title={ui.landing.whyChoose}
							data-nosnippet>
							{ui.landing.whyChoose}
						</Link>
					</div>
					<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>{config.hero.description}</p>
					<nav className='mt-8 flex flex-wrap items-center gap-3' aria-label={config.name} data-nosnippet>
						<Link className='btn btn-primary gap-2' href='/projects'>
							<FolderKanban size={18} />
							{ui.landing.viewProjects}
						</Link>
						<Link className='btn btn-outline hover:bg-primary/10 gap-2' href={docsLinks.main} target='_blank'>
							<BookOpen size={18} />
							{ui.landing.viewDocs}
						</Link>
					</nav>
				</div>
				<components.graph />
			</section>
			<ContentSection title={ui.landing.moreTitle}>
				<mdx.main />
			</ContentSection>
		</main>
	)
}