import { getLocale } from 'next-intl/server'
import { headers } from 'next/headers'
import NextLink from 'next/link'
import { type ComponentProps } from 'react'

import { type SiteKey } from '@/content/site'
import { Link, type Locale } from '@/i18n/routing'
import { isExternalHref, normalizePathname } from '@/lib/locale-path'
import { getSiteFromHost, getSiteHref } from '@/lib/routing'

const sitePathFor = (site: SiteKey, pathname: string) => {
	const normalizedPath = normalizePathname(pathname)
	if (site === 'main') return normalizedPath
	return `/${site}${normalizedPath === '/' ? '' : normalizedPath}`
}

export const SiteLink = async ({
	site,
	path = '/',
	locale,
	children,
	...props
}: Omit<ComponentProps<typeof NextLink>, 'href' | 'locale'> & {
	site: SiteKey
	path?: string
	locale?: Locale
}) => {
	const host = (await headers()).get('host')
	const currentSite = getSiteFromHost(host)
	const currentLocale = (await getLocale()) as Locale
	const targetLocale = locale ?? currentLocale
	const href = getSiteHref(site, targetLocale, path, host)
	const useLocaleLink = Boolean(locale && (currentSite === site || !isExternalHref(href)))
	const localeHref = currentSite === site ? normalizePathname(path) : sitePathFor(site, path)

	return useLocaleLink && locale ? (
		<Link href={localeHref} locale={locale} hrefLang={locale} {...props}>
			{children}
		</Link>
	) : (
		<NextLink href={href} hrefLang={locale} {...props}>
			{children}
		</NextLink>
	)
}