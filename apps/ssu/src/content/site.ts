import type { GithubInfoProps } from 'fumadocs-ui/components/github-info'
import { type LucideIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { type ComponentType } from 'react'
import type { SoftwareApplication } from 'schema-dts'

import { type Locale, defaultLocale, isLocale } from '@/i18n/routing'

import { content as enContent } from './en/site'
import { content as zhHansContent } from './zh-Hans/site'
import { content as zhHantContent } from './zh-Hant/site'

export type MainProject = 'fyl' | 'newtech' | 'compat' | 'utils'
export type Subproject = 'flasher' | 'fetcher' | 'systemless' | 'modules-builder'
export type ConfigKey = 'main' | MainProject | Subproject
export type ProjectKey = Exclude<ConfigKey, 'main'>

export type ProjectFeature = {
	icon: LucideIcon
	title: string
	description: string
}

export type MainConfig = {
	name: string
	shortTitle: string
	summary: string
	description: string
	keywords: string[]
	hero: {
		title?: string
		description: string
	}
	jsonLd?: SoftwareApplication
}

export type ProjectConfig = MainConfig & { icon: LucideIcon } & (
		| { key: MainProject; features: ProjectFeature[] }
		| { key: ProjectKey }
	)

export type PageContent = {
	title: string
	description: string
}

export type PageKey = 'about' | 'security' | 'why-shirosu' | 'projects'
export type MdxPageKey = Exclude<PageKey, 'projects'>
export type BreadcrumbPath = '/' | '/projects' | '/about' | '/security' | '/why-shirosu'

export type MdxContent = {
	main: ComponentType
	pages: Record<MdxPageKey, ComponentType>
	projects: Record<ProjectKey, ComponentType>
}

export type UiContent = {
	nav: {
		about: string
		security: string
		projects: string
		language: string
	}
	landing: {
		enterPage: string
		viewProjects: string
		viewDocs: string
		backHome: string
		moreTitle: string
		whyChoose: string
	}
	projects: {
		description: string
		primaryTitle: string
		primaryDescription: string
		subTitle: string
		subDescription: string
	}
	subproject: {
		moreProjects: string
		mainProjects: string
		mainProjectsDescription: string
		supportingProjects: string
		supportingProjectsDescription: string
	}
	breadcrumbs: Record<BreadcrumbPath, string>
}

export type LocaleContent = {
	pages: Record<PageKey, PageContent>
	mdx: MdxContent
	components: {
		graph: ComponentType
	}
	mainConfig: MainConfig
	projectConfigs: Record<ProjectKey, ProjectConfig>
	ui: UiContent
}

export const baseHost = 'shirosu.gal.tf'

export const mainProjects = ['fyl', 'newtech', 'compat', 'utils'] as const satisfies readonly MainProject[]
export const subprojects = ['flasher', 'fetcher', 'systemless', 'modules-builder'] as const satisfies readonly Subproject[]
export const projects = [...mainProjects, ...subprojects] as const satisfies readonly ProjectKey[]

export const isMainProject = (project: string): project is MainProject => (mainProjects as readonly string[]).includes(project)
export const isSubproject = (project: string): project is Subproject => (subprojects as readonly string[]).includes(project)
export const isProject = (project: string): project is ProjectKey => (projects as readonly string[]).includes(project)

export const projectName = (config: ProjectConfig) => `ShiroSU ${config.name}`

export const docsLinks = {
	main: 'https://oom-wg.dev/ssu',
	fyl: 'https://oom-wg.dev/dev',
	newtech: 'https://oom-wg.dev/ssu/nt',
	compat: 'https://oom-wg.dev/ssu/compat',
	utils: 'https://oom-wg.dev/suu',
	flasher: 'https://oom-wg.dev/ssu',
	fetcher: 'https://oom-wg.dev/ssu',
	systemless: 'https://oom-wg.dev/ssu/nt/dev/module/ssus',
	'modules-builder': 'https://oom-wg.dev/ssu/nt/dev/module/builder'
} satisfies Record<ConfigKey, string> as Record<ConfigKey, string>

export const githubRepos = {
	fyl: {
		owner: 'OOM-WG',
		repo: 'ShiroSU-FYL'
	},
	newtech: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	compat: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	utils: {
		owner: 'OOM-WG',
		repo: 'ShiroSU-Utils'
	},
	flasher: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	fetcher: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	systemless: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	'modules-builder': {
		owner: 'OOM-WG',
		repo: 'ShiroSU-Modules-Builder'
	}
} satisfies Record<ProjectKey, GithubInfoProps> as Record<ProjectKey, GithubInfoProps>

export const contentByLocale = {
	'zh-Hans': zhHansContent,
	'zh-Hant': zhHantContent,
	en: enContent
} satisfies Record<Locale, LocaleContent>

export const getContent = (locale: Locale = defaultLocale) => contentByLocale[isLocale(locale) ? locale : defaultLocale]

export const getMainConfig = (locale: Locale = defaultLocale) => getContent(locale).mainConfig

export const getProjectConfigs = (locale: Locale = defaultLocale) => getContent(locale).projectConfigs

export const getProjectFromParams = (project: string) => (isProject(project) ? project : notFound())