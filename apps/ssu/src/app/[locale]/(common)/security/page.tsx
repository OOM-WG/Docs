import { type ComponentType } from 'react'

import { CommonPage } from '@/components/pages/common-page'
import EnContentBody from '@/content/en/security.mdx'
import { getContent } from '@/content/site'
import ZhHansContentBody from '@/content/zh-Hans/security.mdx'
import ZhHantContentBody from '@/content/zh-Hant/security.mdx'
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

	return pageMetadata(locale, 'security', getContent(locale).security)
}

export default async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)
	const content = getContent(locale).security
	const ContentBody = bodyByLocale[locale]

	return (
		<CommonPage eyebrow='Security' title={content.title}>
			<ContentBody />
		</CommonPage>
	)
}