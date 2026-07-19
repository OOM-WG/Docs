import { ProjectPage } from '@/components/pages/project-page'
import { SubprojectPage } from '@/components/pages/subproject-page'
import { getProjectFromParams, isMainProject } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { projectMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]/[project]'>) => {
	const { locale: localeParam, project: projectParam } = await params
	const locale = getLocaleFromParams(localeParam)
	const project = getProjectFromParams(projectParam)

	return projectMetadata(locale, project)
}

export default async ({ params }: PageProps<'/[locale]/[project]'>) => {
	const { locale: localeParam, project: projectParam } = await params
	const locale = getLocaleFromParams(localeParam)
	const project = getProjectFromParams(projectParam)

	return isMainProject(project) ? (
		<ProjectPage locale={locale} project={project} />
	) : (
		<SubprojectPage locale={locale} project={project} />
	)
}