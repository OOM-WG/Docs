import { LandingPage } from '@/components/pages/landing-page'
import { getLocaleFromParams } from '@/i18n/locale'
import { siteMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) =>
	siteMetadata('fetcher', getLocaleFromParams((await params).locale))

export default async ({ params }: PageProps<'/[locale]'>) => (
	<LandingPage site='fetcher' locale={getLocaleFromParams((await params).locale)} />
)