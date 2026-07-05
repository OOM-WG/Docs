import { defaultLocale, isLocale, type Locale } from '@/i18n/routing'

export const getLocalePrefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`)

export const normalizePathname = (pathname = '/') => (pathname.startsWith('/') ? pathname : `/${pathname}`)

export const isExternalHref = (href: string) => /^(https?:)?\/\//.test(href)

export const localizePathname = (pathname: string, locale: Locale) => {
	const normalized = normalizePathname(pathname)
	const segments = normalized.split('/').filter(Boolean)

	if (isLocale(segments[0])) return locale === defaultLocale ? normalizePathname(segments.slice(1).join('/')) : normalized

	const prefix = getLocalePrefix(locale)
	if (!prefix) return normalized
	return normalized === '/' ? prefix : `${prefix}${normalized}`
}

export const localizeInternalHref = (href: string, locale: Locale) => {
	if (isExternalHref(href)) return href

	const [pathnameWithHash = '', search = ''] = href.split('?')
	const [pathname = '/', hash = ''] = pathnameWithHash.split('#')
	const localizedPathname = localizePathname(pathname, locale)
	const queryPart = search ? `?${search}` : ''
	const hashPart = hash ? `#${hash}` : ''

	return `${localizedPathname}${queryPart}${hashPart}`
}