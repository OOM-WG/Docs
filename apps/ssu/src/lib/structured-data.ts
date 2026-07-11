import type { AggregateRating, Graph, ItemList, Offer, Organization, SoftwareApplication } from 'schema-dts'

import { type ProjectConfig, type ProjectKey, githubRepos, projectName, projects } from '@/content/site'
import { type Locale } from '@/i18n/routing'

import { canonicalFor } from './metadata'

const organization = {
	'@type': 'Organization',
	url: 'https://oom-wg.dev',
	name: 'OOM WG',
	description: 'OutOfMemories WorkGroup'
} satisfies Organization

const graphFor = (...nodes: Graph['@graph']) =>
	({
		'@context': 'https://schema.org',
		'@graph': [organization, ...nodes]
	}) satisfies Graph

export const getGithubStars = async (project: ProjectKey) => {
	const repo = githubRepos[project]
	const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}`

	try {
		const resp = await fetch(apiUrl, {
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'GitHub',
				...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
			},
			next: { revalidate: 3333 }
		})
		if (!resp.ok) return 0
		const stars = (await resp.json()).stargazers_count
		return typeof stars === 'number' && Number.isFinite(stars) && stars > 0 ? stars : 0
	} catch {
		return 0
	}
}

export const mainJsonLd = (locale: Locale) =>
	graphFor({
		'@type': 'ItemList',
		itemListElement: projects.map((project, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: canonicalFor(locale, `/${project}`)
		}))
	} satisfies ItemList)

export const commonJsonLd = (_?: Locale) => graphFor()

export const projectJsonLd = (config: ProjectConfig, stars: number) => {
	if (!config.jsonLd) return graphFor()

	const offer = {
		'@type': 'Offer',
		price: 0
	} satisfies Offer
	const aggregateRating = stars
		? ({
				'@type': 'AggregateRating',
				ratingValue: 5,
				bestRating: 5,
				ratingCount: stars
			} satisfies AggregateRating)
		: undefined
	return graphFor({
		'@type': config.jsonLd.type,
		name: projectName(config),
		description: config.description,
		applicationCategory: config.jsonLd.applicationCategory,
		operatingSystem: config.jsonLd.operatingSystem,
		offers: offer,
		...(aggregateRating ? { aggregateRating } : {})
	} satisfies SoftwareApplication)
}