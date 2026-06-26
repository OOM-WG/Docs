import { headers } from 'next/headers'
import Link from 'next/link'
import { type ComponentProps } from 'react'

import { type SiteKey } from '@/content/site'
import { getSiteHref } from '@/lib/routing'

type SiteLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
	site: SiteKey
	pathname?: string
}

export const SiteLink = async ({ site, pathname = '/', children, ...props }: SiteLinkProps) => {
	const host = (await headers()).get('host')

	return (
		<Link href={getSiteHref(site, pathname, host)} {...props}>
			{children}
		</Link>
	)
}