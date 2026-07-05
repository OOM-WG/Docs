import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'

import { baseHost, projects } from '@/content/site'
import { defaultLocale, isLocale, routing } from '@/i18n/routing'
import { localizePathname } from '@/lib/locale-path'

const handleI18nRouting = createMiddleware(routing)

const splitPath = (pathname: string) => {
	const segments = pathname.split('/').filter(Boolean)
	const first = segments[0]
	const locale = isLocale(first) ? first : null
	const projectIndex = locale ? 1 : 0
	const project = segments[projectIndex]
	const rest = segments.slice(projectIndex + 1)

	return { locale, project, rest }
}

const getProjectRedirect = (req: NextRequest) => {
	const url = req.nextUrl.clone()
	const host = req.headers.get('host')?.split(':')[0]?.toLowerCase()
	if (!host) return null
	if (host !== baseHost && !host.endsWith(`.${baseHost}`)) return null

	const { locale, project, rest } = splitPath(url.pathname)
	if (!project || !(projects as readonly string[]).includes(project)) return null

	const projectHost = `${project}.${baseHost}`
	if (host === baseHost || host === projectHost) {
		url.hostname = projectHost
		url.pathname = localizePathname(`/${rest.join('/')}`, locale ?? defaultLocale)
		return NextResponse.redirect(url, 308)
	}

	return null
}

export const proxy = (req: NextRequest) => getProjectRedirect(req) ?? handleI18nRouting(req)

export const config = {
	matcher: ['/((?!api|_next|_vercel|icon|.*\\..*).*)']
}