import { getMainConfig } from '@/content/site'
import { getLocaleFromParams } from '@/i18n/routing'
import { openGraphImage } from '@/lib/open-graph'

export { size, contentType, alt } from '@/lib/open-graph'

export default async ({ params }: PageProps<'/[locale]'>) =>
	openGraphImage(getMainConfig(getLocaleFromParams((await params).locale)))