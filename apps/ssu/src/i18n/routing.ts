import { hasLocale } from 'next-intl'
import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import { notFound } from 'next/navigation'

export const locales = ['zh-Hans', 'zh-Hant', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale = 'zh-Hans' satisfies Locale

export const localeLabels = {
	'zh-Hans': '简体中文',
	'zh-Hant': '正體中文',
	en: 'English'
} satisfies Record<Locale, string>

export const routing = defineRouting({
	locales,
	defaultLocale,
	localePrefix: 'as-needed',
	localeDetection: false
})

export const isLocale = (locale?: string): locale is Locale => (locales as readonly string[]).includes(locale ?? '')

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)

export const getLocaleFromParams = (locale: string) => (hasLocale(routing.locales, locale) ? locale : notFound())