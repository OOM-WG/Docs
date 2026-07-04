import { LandingPage } from '@/components/pages/landing-page'
import { pageMetadata } from '@/lib/metadata'
import { getCurrentSite } from '@/lib/routing'

export const generateMetadata = async () => pageMetadata(await getCurrentSite())

export default async () => <LandingPage site={await getCurrentSite()} />