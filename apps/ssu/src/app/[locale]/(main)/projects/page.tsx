import { ProjectsPage } from '@/components/pages/projects-page'
import { getContent } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) => {
	const locale = getLocaleFromParams((await params).locale)

	return pageMetadata(locale, 'projects', getContent(locale).pages.projects)
}

export default async ({ params }: PageProps<'/[locale]'>) => (
	<ProjectsPage locale={getLocaleFromParams((await params).locale)} />
)