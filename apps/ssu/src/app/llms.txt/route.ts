import { type ProjectKey, baseHost, docsLinks, getContent, githubRepos, projects } from '@/content/site'

export const dynamic = 'force-static'

const projectLinksFor = (project: ProjectKey) => {
	const config = getContent('en').projectConfigs[project]
	const repo = githubRepos[project]

	return [
		`### ShiroSU ${config.name}`,
		'',
		`> ${config.description}`,
		'',
		`- [Homepage](https://${baseHost}/en/${project}): Project official website entry`,
		`- [Documentation](${docsLinks[project]}): Project official documentation`,
		`- [GitHub](https://github.com/${repo.owner}/${repo.repo}): Project GitHub repo`
	].join('\n')
}

const llmsMd = () => {
	const mainConfig = getContent('en').mainConfig
	const homepage = `https://${baseHost}/en`
	const about = `https://${baseHost}/en/about`
	const security = `https://${baseHost}/en/security`

	return [
		'# ShiroSU Series',
		'',
		`> ${mainConfig.description}`,
		'>',
		'> (formerly SakiSU / SakitinSU)',
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
		`- [Security](${security}): Security statement for the ShiroSU Series`,
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