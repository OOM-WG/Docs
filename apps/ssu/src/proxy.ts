import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { baseHost, isProject } from '@/content/site'
import { isLocale, routing } from '@/i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const getLocaleByPath = (pathname: string) => {
	const segments = pathname.split('/').filter(Boolean)
	const first = segments[0]
	const locale = isLocale(first) ? first : null
	return { locale, isRoot: segments.length === (locale ? 1 : 0) }
}

const getProjectRedirect = (req: NextRequest) => {
	const url = req.nextUrl.clone()
	const host = req.headers.get('host')?.split(':')[0]?.toLowerCase()
	if (!host?.endsWith(`.${baseHost}`)) return null

	const project = host.slice(0, -`.${baseHost}`.length)
	if (!isProject(project)) return null

	const { locale, isRoot } = getLocaleByPath(url.pathname)
	url.hostname = baseHost
	if (isRoot) {
		url.pathname = locale ? `/${locale}/${project}` : `/${project}`
		return NextResponse.redirect(url, 307)
	} else return NextResponse.redirect(url, 308)
}

export const proxy = (req: NextRequest) => getProjectRedirect(req) ?? handleI18nRouting(req)

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}