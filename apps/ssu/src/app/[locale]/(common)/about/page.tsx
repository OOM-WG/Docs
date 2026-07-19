import { CommonPage } from '@/components/pages/common-page'
import { getContent } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)

	return pageMetadata(locale, 'about', getContent(locale).pages.about)
}

export default async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)
	const { mdx, pages } = getContent(locale)
	const content = pages.about
	const ContentBody = mdx.pages.about

	return (
		<CommonPage eyebrow='About' title={content.title} locale={locale} pathname='/about'>
			<ContentBody />
		</CommonPage>
	)
}