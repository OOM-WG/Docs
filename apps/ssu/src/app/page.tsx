import { LandingPage } from '@/components/pages/landing-page'
import { pageMetadata } from '@/lib/metadata'
import { getCurrentSite } from '@/lib/routing'

export const generateMetadata = async () => {
	const site = await getCurrentSite('main')
	return pageMetadata(site, { absoluteTitle: site !== 'main' })
}

export default async () => <LandingPage site={await getCurrentSite('main')} />