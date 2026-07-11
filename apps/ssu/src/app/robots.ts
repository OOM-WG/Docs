import { type MetadataRoute } from 'next'

import { baseHost as host } from '@/content/site'

export default () =>
	({
		rules: {
			userAgent: '*',
			allow: '/'
		},
		host,
		sitemap: `https://${host}/sitemap.xml`
	}) satisfies MetadataRoute.Robots