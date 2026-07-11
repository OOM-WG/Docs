import { type Metadata, type MetadataRoute } from 'next'

import {
	type MainConfig,
	type PageContent,
	type ProjectConfig,
	type ProjectKey,
	baseHost,
	getMainConfig,
	getProjectConfigs,
	projectName,
	projects
} from '@/content/site'
import { type Locale, defaultLocale, locales } from '@/i18n/routing'

import { localizePathname } from './locale-path'

export const canonicalFor = (locale: Locale, pathname = '/') => `https://${baseHost}${localizePathname(pathname, locale)}`

export const languageAlternatesFor = (pathname = '/') =>
	Object.fromEntries([
		...locales.map(locale => [locale, canonicalFor(locale, pathname)] as const),
		['x-default', canonicalFor(defaultLocale, pathname)] as const
	]) as NonNullable<NonNullable<MetadataRoute.Sitemap[number]['alternates']>['languages']>

const metadataFor = (config: MainConfig | ProjectConfig, locale: Locale, pathname = '/', override?: PageContent) => {
	const pageName = 'key' in config ? projectName(config) : config.name
	const title = override?.title ?? `${pageName} - ${config.summary}`
	const description = override?.description ?? config.description
	const canonical = canonicalFor(locale, pathname)

	return {
		metadataBase: new URL(`https://${baseHost}`),
		title,
		description,
		applicationName: 'ShiroSU',
		authors: [
			{ name: 'OOM WG', url: 'https://oom-wg.dev' },
			{ name: 'FengYing', url: 'https://fengying.xin' },
			{ name: 'ShIroRRen', url: 'https://shiror.ren' },
			{ name: 'YumeYuka', url: 'https://yumeyuka.moe' },
			{ name: 'Linso', url: 'https://linso.pro' }
		],
		keywords: config.keywords,
		creator: 'OOM WG',
		publisher: 'OOM WG',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true
			}
		},
		alternates: {
			canonical,
			languages: languageAlternatesFor(pathname)
		},
		openGraph: {
			type: 'website',
			title: override?.title ?? pageName,
			description,
			siteName: 'ShiroSU',
			url: canonical
		},
		twitter: {
			card: 'summary_large_image',
			description,
			title: override?.title ?? pageName
		},
		appLinks: {
			android: [
				{
					package: 'ren.shiror.su',
					url: canonicalFor(locale, '/compat'),
					app_name: 'ShiroSU Compat'
				},
				{
					package: 'ren.shiror.su.utils',
					url: canonicalFor(locale, '/utils'),
					app_name: 'ShiroSU Utils'
				}
			],
			windows: [
				{
					url: canonicalFor(locale, '/utils'),
					app_name: 'ShiroSU Utils'
				}
			],
			web: [
				{
					url: 'https://su.shiror.ren'
				}
			]
		}
	} satisfies Metadata as Metadata
}

export const mainMetadata = (locale: Locale) => metadataFor(getMainConfig(locale), locale)

export const projectMetadata = (locale: Locale, project: ProjectKey) =>
	metadataFor(getProjectConfigs(locale)[project], locale, `/${project}`)

export const pageMetadata = (locale: Locale, pathname: string, content: PageContent) =>
	metadataFor(getMainConfig(locale), locale, `/${pathname}`, content)

export const sitemapEntries = () => {
	const lastModified = new Date()
	const routes = [
		{ pathname: '/', priority: 1 },
		...projects.map(project => ({ pathname: `/${project}`, priority: 1 })),
		{ pathname: '/about', priority: 0.99 },
		{ pathname: '/security', priority: 0.88 }
	]

	return routes.flatMap(route =>
		locales.map(
			locale =>
				({
					url: canonicalFor(locale, route.pathname),
					lastModified,
					priority: route.priority,
					alternates: {
						languages: languageAlternatesFor(route.pathname)
					}
				}) satisfies MetadataRoute.Sitemap[number]
		)
	) as MetadataRoute.Sitemap
}