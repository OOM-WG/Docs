import { LandingPage } from '@/components/pages/landing-page'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata('utils', { absoluteTitle: true })

export default () => <LandingPage site='utils' />