import { type Metadata, type Viewport } from 'next'

import { baseHost } from '@/content/site'
import { routing } from '@/i18n/routing'

import '@/styles/globals.css'

export const metadata = {
	metadataBase: new URL(`https://${baseHost}`),
	verification: {
		other: {
			'baidu-site-verification': 'codeva-nXglycuJb6'
		}
	}
} satisfies Metadata

export const viewport = {
	themeColor: '#e6be8a'
} satisfies Viewport

export const dynamicParams = false

export const generateStaticParams = () => routing.locales.map(locale => ({ locale }))

export default async ({ children }: LayoutProps<'/[locale]'>) => <>{children}</>