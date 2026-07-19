import { type ReactNode } from 'react'

import { type BreadcrumbPath } from '@/content/site'
import { type Locale } from '@/i18n/routing'
import { commonJsonLd } from '@/lib/structured-data'

import { JsonLd } from '../json-ld'

export const CommonPage = ({
	eyebrow,
	title,
	children,
	locale,
	pathname
}: {
	eyebrow: string
	title: string
	children: ReactNode
	locale: Locale
	pathname: BreadcrumbPath
}) => (
	<main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12'>
		<JsonLd data={commonJsonLd(locale, pathname)} />

		<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>{eyebrow}</p>
		<h1 className='mt-4 text-5xl font-black'>{title}</h1>
		<div className='prose prose-lg mt-8 max-w-none'>{children}</div>
	</main>
)