import { ArrowRight } from 'lucide-react'
import { type ComponentType } from 'react'

import EnMainBody from '@/content/en/main.mdx'
import { getContent, getMainConfig } from '@/content/site'
import ZhHansMainBody from '@/content/zh-Hans/main.mdx'
import ZhHantMainBody from '@/content/zh-Hant/main.mdx'
import { Link, type Locale } from '@/i18n/routing'

import { ContentSection } from './content-section'

const bodyByLocale = {
	'zh-Hans': ZhHansMainBody,
	'zh-Hant': ZhHantMainBody,
	en: EnMainBody
} satisfies Record<Locale, ComponentType>

export const MainPage = ({ locale }: { locale: Locale }) => {
	const { projectCards, ui } = getContent(locale)
	const config = getMainConfig(locale)
	const Body = bodyByLocale[locale]

	return (
		<main className='flex flex-1 flex-col'>
			<section className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center gap-10 px-7 py-16 sm:px-10 lg:px-16 xl:px-20'>
				<div className='max-w-4xl'>
					<p className='text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase' data-nosnippet>
						{config.summary}
					</p>
					<div className='flex flex-wrap items-end gap-x-2 gap-y-1'>
						<h1 className='text-5xl leading-tight font-black sm:text-6xl'>{config.name}</h1>
						<Link
							className='btn btn-ghost btn-sm text-primary hover:bg-primary/12 mb-1 shrink-0 whitespace-nowrap'
							href='/why-shirosu'
							title={ui.landing.whyChoose}
							data-nosnippet>
							{ui.landing.whyChoose}
						</Link>
					</div>
					<p className='text-base-content/72 mt-6 max-w-3xl text-lg leading-8'>{config.hero.description}</p>
				</div>
				<ul className='m-0 grid list-none gap-4 p-0 md:grid-cols-3'>
					{projectCards.map(project => (
						<li key={project.project}>
							<Link
								className='group border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 flex min-h-64 flex-col rounded-xl border p-5 shadow-sm backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]'
								href={`/${project.project}`}>
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
			<ContentSection title={ui.landing.moreTitle}>
				<Body />
			</ContentSection>
		</main>
	)
}