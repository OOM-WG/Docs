import { headers } from 'next/headers'

import { baseHost, getSiteConfigs, type SiteKey } from '@/content/site'
import { defaultLocale, type Locale } from '@/i18n/routing'

import { localizePathname, normalizePathname } from './locale-path'

export const getSiteFromHost = (hostname: string | null | undefined): SiteKey => {
	switch (hostname?.split(':')[0]?.toLowerCase().split('.')[0]) {
		case 'compat':
			return 'compat'
		case 'nt':
		case 'newtech':
			return 'newtech'
		case 'flash':
		case 'flasher':
			return 'flasher'
		case 'fetch':
		case 'fetcher':
			return 'fetcher'
		case 'lib':
		case 'library':
			return 'library'
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

export const getSiteHref = (target: SiteKey, locale: Locale = defaultLocale, pathname = '/', currentHost?: string | null) => {
	const normalizedPath = normalizePathname(pathname)
	const localizedPath = localizePathname(normalizedPath, locale)
	const host = currentHost?.split(':')[0]?.toLowerCase()
	const isLocal =
		!host ||
		host === 'localhost' ||
		host.endsWith('.local') ||
		host === '127.0.0.1' ||
		host.startsWith('192.168.') ||
		host === '0.0.0.0'

	const config = getSiteConfigs(locale)
	if (isLocal) {
		if (target === 'main') return localizedPath
		const sitePath = `/${config[target].key}${normalizedPath === '/' ? '' : normalizedPath}`
		return localizePathname(sitePath, locale)
	} else {
		const targetHost = target === 'main' ? baseHost : `${config[target].key}.${baseHost}`
		return `//${targetHost}${localizedPath}`
	}
}