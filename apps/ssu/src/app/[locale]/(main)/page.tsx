import { MainPage } from '@/components/pages/main-page'
import { getLocaleFromParams } from '@/i18n/routing'
import { mainMetadata } from '@/lib/metadata'

export const generateMetadata = async ({ params }: PageProps<'/[locale]'>) =>
	mainMetadata(getLocaleFromParams((await params).locale))

export default async ({ params }: PageProps<'/[locale]'>) => <MainPage locale={getLocaleFromParams((await params).locale)} />