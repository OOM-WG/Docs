import { type Metadata, type MetadataRoute } from 'next'

import { baseHost, getSiteConfigs, siteOrder, type SiteKey } from '@/content/site'
import { locales, type Locale } from '@/i18n/routing'

import { localizePathname } from './locale-path'

const siteHostFor = (site: SiteKey) => (site === 'main' ? baseHost : `${site}.${baseHost}`)

export const canonicalFor = (site: SiteKey, locale: Locale, pathname = '/') =>
	`https://${siteHostFor(site)}${localizePathname(pathname, locale)}`

export const languageAlternatesFor = (site: SiteKey, pathname = '/') =>
	Object.fromEntries([
		...locales.map(locale => [locale, canonicalFor(site, locale, pathname)] as const),
		['x-default', canonicalFor(site, 'zh-Hans', pathname)] as const
	]) as NonNullable<NonNullable<MetadataRoute.Sitemap[number]['alternates']>['languages']>

export const siteMetadata = (
	site: SiteKey,
	locale: Locale,
	pathname = '/',
	override: {
		title?: string
		description?: string
	} = {}
) => {
	const config = getSiteConfigs(locale)[site]
	const pageName = site === 'main' ? `${config.name}` : `ShiroSU ${config.name}`
	const title = override.title ?? `${pageName} - ${config.summary}`
	const description = override.description ?? config.description
	const canonical = canonicalFor(site, locale, pathname)

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
			languages: languageAlternatesFor(site, pathname)
		},
		openGraph: {
			type: 'website',
			title: override.title ?? pageName,
			description,
			siteName: 'ShiroSU',
			url: canonical
		},
		twitter: {
			card: 'summary_large_image',
			description,
			title: override.title ?? pageName
		},
		appLinks: {
			android: [
				{
					package: 'ren.shiror.su',
					url: 'https://compat.shirosu.my.id',
					app_name: 'ShiroSU Compat'
				},
				{
					package: 'ren.shiror.su.utils',
					url: 'https://utils.shirosu.my.id',
					app_name: 'ShiroSU Utils'
				}
			],
			windows: [
				{
					url: 'https://utils.shirosu.my.id',
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

export const pageMetadata = (locale: Locale, pathname: string, title: string, description: string) =>
	siteMetadata('main', locale, `/${pathname}`, { title, description })

export const sitemapEntries = () => {
	const lastModified = new Date()
	const routes = [
		...siteOrder.map(site => ({
			site,
			pathname: '/',
			priority: 1
		})),
		{
			site: 'main',
			pathname: '/about',
			priority: 0.99
		},
		{
			site: 'main',
			pathname: '/security',
			priority: 0.88
		}
	] satisfies { pathname: string; priority: number; site: SiteKey }[]

	return routes.flatMap(route =>
		locales.map(
			locale =>
				({
					url: canonicalFor(route.site, locale, route.pathname),
					lastModified,
					priority: route.priority,
					alternates: {
						languages: languageAlternatesFor(route.site, route.pathname)
					}
				}) satisfies MetadataRoute.Sitemap[number]
		)
	) as MetadataRoute.Sitemap
}