import { type LucideIcon } from 'lucide-react'

import { defaultLocale, isLocale, type Locale } from '@/i18n/routing'

import { content as enContent } from './en/site'
import { content as zhHansContent } from './zh-Hans/site'
import { content as zhHantContent } from './zh-Hant/site'

export type SiteKey = 'main' | 'compat' | 'newtech' | 'flasher' | 'fetcher' | 'library' | 'utils'

export type SiteFeature = {
	title: string
	description: string
	icon: LucideIcon
}

export type SiteConfig = {
	key: SiteKey
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
	features: SiteFeature[]
}

export type ProjectCard = {
	site: Exclude<SiteKey, 'main'>
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
	siteConfigs: Record<SiteKey, SiteConfig>
	ui: UiContent
}

export const baseHost = 'shirosu.my.id'

export const projects = ['newtech', 'compat', 'flasher', 'fetcher', 'library', 'utils'] as const satisfies readonly Exclude<
	SiteKey,
	'main'
>[]

export const siteOrder = [
	'main',
	'newtech',
	'compat',
	'flasher',
	'fetcher',
	'library',
	'utils'
] satisfies readonly SiteKey[] as readonly SiteKey[]

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
} satisfies Record<Exclude<SiteKey, 'main'>, GithubRepo> as Record<Exclude<SiteKey, 'main'>, GithubRepo>

export const contentByLocale = {
	'zh-Hans': zhHansContent,
	'zh-Hant': zhHantContent,
	en: enContent
} satisfies Record<Locale, LocaleContent>

export const getContent = (locale: Locale = defaultLocale) => contentByLocale[isLocale(locale) ? locale : defaultLocale]

export const getSiteConfigs = (locale: Locale = defaultLocale) => getContent(locale).siteConfigs

export const getProjectCards = (locale: Locale = defaultLocale) => getContent(locale).projectCards