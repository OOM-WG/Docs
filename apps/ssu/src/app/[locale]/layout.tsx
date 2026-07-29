import { type Metadata, type Viewport } from 'next'

import { baseHost } from '@/content/site'
import { routing } from '@/i18n/routing'

import '@/styles/globals.css'

export const metadata = {
	metadataBase: new URL(`https://${baseHost}`),
	verification: {
		other: {
			'baidu-site-verification': 'codeva-nXglycuJb6',
			sogou_site_verification: 'shfiXuODN6',
			'shenma-site-verification': '0ad68825c7b10f48a35f6b608dc411f0_1785333266',
			'bytedance-verification-code': 'Yo85U0LaD6d1yMLuydLg'
		}
	}
} satisfies Metadata

export const viewport = {
	themeColor: '#e6be8a'
} satisfies Viewport

export const dynamicParams = false

export const generateStaticParams = () => routing.locales.map(locale => ({ locale }))

export default async ({ children }: LayoutProps<'/[locale]'>) => <>{children}</>