import { type Metadata, type MetadataRoute } from 'next'

import { baseHost, siteConfigs, siteOrder, type SiteKey } from '@/content/site'

export const canonicalFor = (site: SiteKey, pathname = '/') => {
	const host = site === 'main' ? baseHost : `${siteConfigs[site].key}.${baseHost}`
	return `https://${host}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export const pageMetadata = (site: SiteKey) => {
	const config = siteConfigs[site]
	const pageName = site === 'main' ? `${config.name}` : `ShiroSU ${config.name}`
	const fullName = `${pageName} - ${config.summary}`

	return {
		title: fullName,
		description: config.description,
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
			canonical: canonicalFor(site)
		},
		openGraph: {
			type: 'website',
			title: pageName,
			description: config.description,
			siteName: 'ShiroSU',
			url: canonicalFor(site)
		},
		twitter: {
			card: 'summary_large_image',
			description: config.description,
			title: pageName
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

export const sitemapEntries = () =>
	[
		...siteOrder.map(site => ({
			url: canonicalFor(site),
			lastModified: new Date(),
			priority: 1
		})),
		{
			url: canonicalFor('main', '/about'),
			lastModified: new Date(),
			priority: 0.99
		}
	] satisfies MetadataRoute.Sitemap as MetadataRoute.Sitemap