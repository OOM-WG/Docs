import { type Metadata, type MetadataRoute } from 'next'

import { docsLinks, baseHost, siteConfigs, siteOrder, type SiteKey } from '@/content/site'

export const canonicalFor = (site: SiteKey, pathname = '/') => {
	const prefix = siteConfigs[site].hostPrefix
	const host = prefix ? `${prefix}.${baseHost}` : baseHost
	const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

	return `https://${host}${normalizedPath}`
}

export const pageMetadata = (site: SiteKey, options: { absoluteTitle?: boolean } = {}) => {
	const config = siteConfigs[site]

	return {
		title: options.absoluteTitle ? { absolute: config.label } : config.label,
		description: config.description,
		keywords: config.keywords,
		alternates: {
			canonical: canonicalFor(site)
		},
		openGraph: {
			type: 'website',
			url: canonicalFor(site),
			title: config.label,
			description: config.description,
			siteName: 'ShiroSU'
		},
		twitter: {
			card: 'summary_large_image',
			title: config.label,
			description: config.description
		}
	} satisfies Metadata
}

export const sitemapEntries = () =>
	[
		...siteOrder.map(site => ({
			url: canonicalFor(site),
			lastModified: new Date()
		})),
		{
			url: canonicalFor('main', '/about'),
			lastModified: new Date()
		},
		...siteOrder.map(site => ({
			url: docsLinks[site],
			lastModified: new Date()
		}))
	] satisfies MetadataRoute.Sitemap as MetadataRoute.Sitemap