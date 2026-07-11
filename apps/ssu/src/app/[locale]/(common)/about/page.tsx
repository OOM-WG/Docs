import { type ComponentType } from 'react'

import { CommonPage } from '@/components/pages/common-page'
import EnContentBody from '@/content/en/about.mdx'
import { getContent } from '@/content/site'
import ZhHansContentBody from '@/content/zh-Hans/about.mdx'
import ZhHantContentBody from '@/content/zh-Hant/about.mdx'
import { getLocaleFromParams } from '@/i18n/routing'
import { type Locale } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'

const bodyByLocale = {
	'zh-Hans': ZhHansContentBody,
	'zh-Hant': ZhHantContentBody,
	en: EnContentBody
} satisfies Record<Locale, ComponentType>

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)

	return pageMetadata(locale, 'about', getContent(locale).about)
}

export default async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)
	const content = getContent(locale).about
	const ContentBody = bodyByLocale[locale]

	return (
		<CommonPage eyebrow='About' title={content.title}>
			<ContentBody />
		</CommonPage>
	)
}