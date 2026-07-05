import { baseHost, docsLinks, getSiteConfigs, githubRepos, projects, type SiteKey } from '@/content/site'

export const dynamic = 'force-static'

const projectLinksFor = (site: Exclude<SiteKey, 'main'>) => {
	const config = getSiteConfigs('en')[site]
	const repo = githubRepos[site]

	return [
		`### ShiroSU ${config.name}`,
		'',
		`> ${config.description}`,
		'',
		`- [Homepage](https://${site}.${baseHost}/en): Project official website entry`,
		`- [Documentation](${docsLinks[site]}): Project official documentation`,
		`- [GitHub](https://github.com/${repo.owner}/${repo.repo}): Project GitHub repo`
	].join('\n')
}

const llmsMd = () => {
	const mainConfig = getSiteConfigs('en').main
	const homepage = `https://${baseHost}/en`
	const about = `https://${baseHost}/en/about`

	return [
		'# ShiroSU Series',
		'',
		`> ${mainConfig.description}`,
		'',
		`**Official website**: [${baseHost}](${homepage})`,
		'',
		'The ShiroSU Series is developed by [**OOM WG**](https://oom-wg.dev/)',
		'',
		'> GitHub organization: [OOM-WG](https://github.com/OOM-WG)',
		'',
		'## Core Pages',
		'',
		`- [Homepage](${homepage}): Main entry for the ShiroSU Series website`,
		`- [About](${about}): Overview, background and project history for the ShiroSU Series`,
		`- [Documentation](${docsLinks['main']}): Official documentation`,
		'',
		'## Projects',
		'',
		projects.map(projectLinksFor).join('\n\n')
	].join('\n')
}

export const GET = () =>
	new Response(llmsMd(), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	})