import type {APIContext} from 'astro'

import {site} from '@/config.json'
import {getSortedPosts} from '@/utils/content'
import rss from '@astrojs/rss'

export async function GET(context: APIContext) {
	const sortedPosts = await getSortedPosts()

	return rss({
		title: site.title,
		description: site.description,
		site: context.site!,
		items: sortedPosts.map(post => ({
			link: `/posts/${post.slug}`,
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.summary
		})),
		customData: `<language>${site.lang}</language>`
	})
}
