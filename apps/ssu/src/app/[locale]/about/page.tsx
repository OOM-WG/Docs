import { type ComponentType } from 'react'

import EnAboutBody from '@/content/en/about.mdx'
import { getContent } from '@/content/site'
import ZhHansAboutBody from '@/content/zh-Hans/about.mdx'
import ZhHantAboutBody from '@/content/zh-Hant/about.mdx'
import { getLocaleFromParams } from '@/i18n/locale'
import { type Locale } from '@/i18n/routing'
import { aboutMetadata } from '@/lib/metadata'

const bodyByLocale = {
	'zh-Hans': ZhHansAboutBody,
	'zh-Hant': ZhHantAboutBody,
	en: EnAboutBody
} satisfies Record<Locale, ComponentType>

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) =>
	aboutMetadata(getLocaleFromParams((await params).locale))

export default async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)
	const about = getContent(locale).about
	const AboutBody = bodyByLocale[locale]

	return (
		<main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12'>
			<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>{about.eyebrow}</p>
			<h1 className='mt-4 text-5xl font-black'>{about.title}</h1>
			<div className='prose prose-lg mt-8 max-w-none'>
				<AboutBody />
			</div>
		</main>
	)
}