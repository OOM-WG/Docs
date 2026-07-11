import { getProjectFromParams, projects } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import BaseLayout from '@/layouts/base-layout'

export const dynamicParams = false

export const generateStaticParams = () => projects.map(project => ({ project }))

export default async ({ children, params }: LayoutProps<'/[locale]/[project]'>) => {
	const { locale: localeParam, project: projectParam } = await params

	return (
		<BaseLayout locale={getLocaleFromParams(localeParam)} project={getProjectFromParams(projectParam)}>
			{children}
		</BaseLayout>
	)
}