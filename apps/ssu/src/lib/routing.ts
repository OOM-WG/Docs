import { headers } from 'next/headers'

import { baseHost, siteConfigs, type SiteKey } from '@/content/site'

export const getSiteFromHost = (hostname: string | null | undefined): SiteKey => {
	switch (hostname?.split(':')[0]?.toLowerCase().split('.')[0]) {
		case 'compat':
			return 'compat'
		case 'newtech':
		case 'nt':
			return 'newtech'
		case 'utils':
			return 'utils'
		default:
			return 'main'
	}
}

export const getCurrentSite = async (defaultSite: SiteKey = 'main') => {
	const site = getSiteFromHost((await headers()).get('host'))
	return site === 'main' ? defaultSite : site
}

export const getSiteHref = (target: SiteKey, pathname = '/', currentHost?: string | null) => {
	const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
	const host = currentHost?.split(':')[0]?.toLowerCase()
	const isLocal =
		!host ||
		host === 'localhost' ||
		host.endsWith('.local') ||
		host === '127.0.0.1' ||
		host.startsWith('192.168.') ||
		host === '0.0.0.0'

	if (isLocal) {
		const basePath = siteConfigs[target].devPath
		if (target === 'main') return normalizedPath
		if (normalizedPath === '/') return basePath
		return `${basePath}${normalizedPath}`
	}

	const prefix = siteConfigs[target].hostPrefix
	const protocol = 'https'
	const targetHost = prefix ? `${prefix}.${baseHost}` : baseHost
	return `${protocol}://${targetHost}${normalizedPath}`
}