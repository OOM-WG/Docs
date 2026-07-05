import { type LucideIcon } from 'lucide-react'

import { defaultLocale, isLocale, type Locale } from '@/i18n/routing'

import { content as enContent } from './en/site'
import { content as zhHansContent } from './zh-Hans/site'
import { content as zhHantContent } from './zh-Hant/site'

export type SiteKey = 'main' | 'compat' | 'newtech' | 'utils'

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

export type AboutContent = {
	eyebrow: string
	title: string
	description: string
}

export type UiContent = {
	nav: {
		about: string
		organization: string
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
	about: AboutContent
	projectCards: ProjectCard[]
	siteConfigs: Record<SiteKey, SiteConfig>
	ui: UiContent
}

export const baseHost = 'shirosu.my.id'

export const projects = ['newtech', 'compat', 'utils'] as const satisfies readonly Exclude<SiteKey, 'main'>[]

export const siteOrder = ['main', 'newtech', 'compat', 'utils'] satisfies readonly SiteKey[] as readonly SiteKey[]

export const docsLinks = {
	main: 'https://oom-wg.dev/ssu',
	compat: 'https://oom-wg.dev/ssu/compat',
	newtech: 'https://oom-wg.dev/ssu/nt',
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