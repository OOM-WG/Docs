import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

import { routing } from './routing'

export const getLocaleFromParams = (locale: string) => (hasLocale(routing.locales, locale) ? locale : notFound())