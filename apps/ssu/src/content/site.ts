import { type LucideIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { SoftwareApplication } from 'schema-dts'

import { type Locale, defaultLocale, isLocale } from '@/i18n/routing'

import { content as enContent } from './en/site'
import { content as zhHansContent } from './zh-Hans/site'
import { content as zhHantContent } from './zh-Hant/site'

export type SiteKey = 'main' | 'compat' | 'newtech' | 'flasher' | 'fetcher' | 'library' | 'utils'
export type ProjectKey = Exclude<SiteKey, 'main'>

export type SiteFeature = {
	title: string
	description: string
	icon: LucideIcon
}

export type JsonLdConfig = {
	type: SoftwareApplication['@type']
	applicationCategory: SoftwareApplication['applicationCategory']
	operatingSystem: SoftwareApplication['operatingSystem']
}

export type SiteConfig = {
	name: string
	shortName?: string
	shortTitle: string
	summary: string
	description: string
	keywords: string[]
	hero: {
		title?: string
		description: string
	}
	jsonLd?: JsonLdConfig
}

export type MainConfig = SiteConfig

export type ProjectConfig = SiteConfig & {
	key: ProjectKey
	features: SiteFeature[]
}

export type ProjectCard = {
	project: ProjectKey
	title: string
	description: string
	icon: LucideIcon
}

export type GithubRepo = {
	owner: string
	repo: string
}

export type PageContent = {
	title: string
	description: string
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
		viewDocs: string
		backHome: string
		moreTitle: string
	}
}

export type LocaleContent = {
	about: PageContent
	security: PageContent
	projectCards: ProjectCard[]
	mainConfig: MainConfig
	projectConfigs: Record<ProjectKey, ProjectConfig>
	ui: UiContent
}

export const baseHost = 'shirosu.my.id'

export const projects = [
	'newtech',
	'compat',
	'flasher',
	'fetcher',
	'library',
	'utils'
] as const satisfies readonly ProjectKey[]

export const isProject = (project: string): project is ProjectKey => (projects as readonly string[]).includes(project)

export const projectName = (config: ProjectConfig) => `ShiroSU ${config.name}`

export const docsLinks = {
	main: 'https://oom-wg.dev/ssu',
	compat: 'https://oom-wg.dev/ssu/compat',
	newtech: 'https://oom-wg.dev/ssu/nt',
	flasher: 'https://oom-wg.dev/ssu',
	fetcher: 'https://oom-wg.dev/ssu',
	library: 'https://oom-wg.dev/ssu',
	utils: 'https://oom-wg.dev/suu'
} satisfies Record<SiteKey, string> as Record<SiteKey, string>

export const githubRepos = {
	compat: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	newtech: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	flasher: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	fetcher: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	library: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	utils: {
		owner: 'OOM-WG',
		repo: 'ShiroSU-Utils'
	}
} satisfies Record<ProjectKey, GithubRepo> as Record<ProjectKey, GithubRepo>

export const contentByLocale = {
	'zh-Hans': zhHansContent,
	'zh-Hant': zhHantContent,
	en: enContent
} satisfies Record<Locale, LocaleContent>

export const getContent = (locale: Locale = defaultLocale) => contentByLocale[isLocale(locale) ? locale : defaultLocale]

export const getMainConfig = (locale: Locale = defaultLocale) => getContent(locale).mainConfig

export const getProjectConfigs = (locale: Locale = defaultLocale) => getContent(locale).projectConfigs

export const getProjectCards = (locale: Locale = defaultLocale) => getContent(locale).projectCards

export const getProjectFromParams = (project: string) => (isProject(project) ? project : notFound())