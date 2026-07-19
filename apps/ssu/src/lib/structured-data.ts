import type { AggregateRating, BreadcrumbList, Graph, ItemList, Offer, Organization, SoftwareApplication } from 'schema-dts'

import {
	type BreadcrumbPath,
	type ProjectKey,
	getContent,
	getMainConfig,
	getProjectConfigs,
	githubRepos,
	projectName,
	projects
} from '@/content/site'
import { type Locale } from '@/i18n/routing'

import { canonicalFor } from './metadata'

const organization = {
	'@type': 'Organization',
	'@id': 'https://oom-wg.dev/#organization',
	url: 'https://oom-wg.dev',
	sameAs: ['https://github.com/OOM-WG', 'https://gitcode.com/OOM-WG'],
	logo: 'https://oom-wg.dev/images/logo/oow.webp',
	name: 'OOM WG',
	description: 'OutOfMemories WorkGroup',
	email: 'oom@200ok.work',
	contactPoint: {
		'@type': 'ContactPoint',
		email: 'oom@200ok.work'
	},
	numberOfEmployees: {
		'@type': 'QuantitativeValue',
		minValue: 6,
		maxValue: 12
	}
} satisfies Organization

const graphFor = (...nodes: Graph['@graph']) =>
	({
		'@context': 'https://schema.org',
		'@graph': [organization, ...nodes]
	}) satisfies Graph

type BreadcrumbEntry = {
	name: string
	pathname: string
}

const breadcrumbList = (locale: Locale, entries: BreadcrumbEntry[]) =>
	({
		'@type': 'BreadcrumbList',
		itemListElement: entries.map((entry, index) => ({
			'@type': 'ListItem',
			item: canonicalFor(locale, entry.pathname),
			name: entry.name,
			position: index + 1
		}))
	}) satisfies BreadcrumbList

const staticBreadcrumb = (locale: Locale, pathname: BreadcrumbPath) => {
	const breadcrumbs = getContent(locale).ui.breadcrumbs
	const entries = [{ name: breadcrumbs['/'], pathname: '/' }]
	if (pathname !== '/') entries.push({ name: breadcrumbs[pathname], pathname })

	return breadcrumbList(locale, entries)
}

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

export const mainJsonLd = (locale: Locale, pathname: BreadcrumbPath) =>
	graphFor(
		{
			'@type': 'ItemList',
			name: getMainConfig(locale).name,
			itemListElement: projects.map((project, index) => ({
				'@type': 'ListItem',
				name: projectName(getProjectConfigs(locale)[project]),
				url: canonicalFor(locale, `/${project}`),
				position: index + 1
			}))
		} satisfies ItemList,
		staticBreadcrumb(locale, pathname)
	)

export const commonJsonLd = (locale: Locale, pathname: BreadcrumbPath) => graphFor(staticBreadcrumb(locale, pathname))

export const projectJsonLd = (locale: Locale, project: ProjectKey, stars?: number | null) => {
	const config = getProjectConfigs(locale)[project]
	const breadcrumbs = getContent(locale).ui.breadcrumbs
	const breadcrumb = breadcrumbList(locale, [
		{ name: breadcrumbs['/'], pathname: '/' },
		{ name: breadcrumbs['/projects'], pathname: '/projects' },
		{ name: projectName(config), pathname: `/${project}` }
	])

	if (!config.jsonLd) return graphFor(breadcrumb)

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
	return graphFor(
		{
			...config.jsonLd,
			name: projectName(config),
			description: config.description,
			offers: offer,
			...(aggregateRating ? { aggregateRating } : {})
		} satisfies SoftwareApplication,
		breadcrumb
	)
}