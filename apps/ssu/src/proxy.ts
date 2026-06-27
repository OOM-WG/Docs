import { NextResponse, type NextRequest } from 'next/server'

import { baseHost, projects } from '@/content/site'

export const proxy = (req: NextRequest) => {
	const url = req.nextUrl
	const host = req.headers.get('host')?.split(':')[0]?.toLowerCase()
	if (!host) return NextResponse.next()
	const [path] = url.pathname.split('/').filter(Boolean)
	if (!path) return NextResponse.next()
	if (!(projects as readonly string[]).includes(path)) return NextResponse.next()

	if (host === baseHost || host === `${path}.${baseHost}`) {
		url.hostname = `${path}.${baseHost}`
		url.pathname = '/'
		return NextResponse.redirect(url, 308)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/compat/:path*', '/newtech/:path*', '/utils/:path*']
}