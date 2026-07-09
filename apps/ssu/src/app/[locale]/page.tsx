import { LandingPage } from '@/components/pages/landing-page'
import { getLocaleFromParams } from '@/i18n/locale'
import { siteMetadata } from '@/lib/metadata'
import { getCurrentSite } from '@/lib/routing'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) =>
	siteMetadata(await getCurrentSite(), getLocaleFromParams((await params).locale))

export default async ({ params }: PageProps<'/[locale]'>) => (
	<LandingPage site={await getCurrentSite()} locale={getLocaleFromParams((await params).locale)} />
)