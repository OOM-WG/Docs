import { getProjectFromParams } from '@/content/site'
import { iconResponse } from '@/lib/brand-assets'

export default async ({ params }: PageProps<'/[locale]/[project]'>) =>
	iconResponse(getProjectFromParams((await params).project))