import { getProjectConfigs, getProjectFromParams } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { openGraphImage } from '@/lib/open-graph'

export { size, contentType, alt } from '@/lib/open-graph'

export default async ({ params }: PageProps<'/[locale]/[project]'>) => {
	const { locale: localeParam, project: projectParam } = await params
	const locale = getLocaleFromParams(localeParam)
	const project = getProjectFromParams(projectParam)

	return openGraphImage(getProjectConfigs(locale)[project], project)
}