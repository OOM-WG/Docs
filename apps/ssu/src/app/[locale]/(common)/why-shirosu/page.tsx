import { CommonPage } from '@/components/pages/common-page'
import { getContent } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)

	return pageMetadata(locale, 'why-shirosu', getContent(locale).pages['why-shirosu'])
}

export default async ({ params }: PageProps<'/[locale]/why-shirosu'>) => {
	const locale = getLocaleFromParams((await params).locale)
	const { mdx, pages } = getContent(locale)
	const content = pages['why-shirosu']
	const ContentBody = mdx.pages['why-shirosu']

	return (
		<CommonPage eyebrow='Why ShiroSU' title={content.title} locale={locale} pathname='/why-shirosu'>
			<ContentBody />
		</CommonPage>
	)
}