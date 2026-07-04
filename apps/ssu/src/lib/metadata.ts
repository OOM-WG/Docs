import { type Metadata, type MetadataRoute } from 'next'

import { baseHost, siteConfigs, siteOrder, type SiteKey } from '@/content/site'

export const canonicalFor = (site: SiteKey, pathname = '/') => {
	const host = site === 'main' ? baseHost : `${siteConfigs[site].key}.${baseHost}`
	return `https://${host}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export const pageMetadata = (site: SiteKey, options: { absoluteTitle?: boolean } = {}) => {
	const config = siteConfigs[site]
	const siteName = site === 'main' ? `${config.name}` : `ShiroSU ${config.name}`
	const fullName = `${siteName} - ${config.summary}`

	return {
		title: options.absoluteTitle ? { absolute: fullName } : fullName,
		description: config.description,
		keywords: config.keywords,
		alternates: {
			canonical: canonicalFor(site)
		},
		openGraph: {
			type: 'website',
			url: canonicalFor(site),
			title: siteName,
			description: config.description,
			siteName: 'ShiroSU'
		},
		twitter: {
			card: 'summary_large_image',
			title: siteName,
			description: config.description
		}
	} satisfies Metadata
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