import { getLocaleFromParams } from '@/i18n/routing'
import BaseLayout from '@/layouts/base-layout'

export default async ({ children, params }: LayoutProps<'/[locale]'>) => (
	<BaseLayout locale={getLocaleFromParams((await params).locale)} common>
		{children}
	</BaseLayout>
)