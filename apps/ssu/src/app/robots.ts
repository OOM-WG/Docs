import { type MetadataRoute } from 'next'

import { baseHost } from '@/content/site'

export default () =>
	({
		rules: {
			userAgent: '*',
			allow: '/'
		},
		sitemap: `https://${baseHost}/sitemap.xml`
	}) satisfies MetadataRoute.Robots