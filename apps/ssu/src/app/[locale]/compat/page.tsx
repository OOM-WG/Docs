import { LandingPage } from '@/components/pages/landing-page'
import { getLocaleFromParams } from '@/i18n/locale'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) =>
	pageMetadata('compat', getLocaleFromParams((await params).locale))

export default async ({ params }: PageProps<'/[locale]'>) => (
	<LandingPage site='compat' locale={getLocaleFromParams((await params).locale)} />
)