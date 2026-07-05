'use client'

import { Check, Languages } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'

import { localeLabels, locales, type Locale, usePathname, useRouter } from '@/i18n/routing'

type SwitcherHref = Parameters<ReturnType<typeof useRouter>['replace']>[0]

const getLocaleMenuItemClass = (active: boolean) => {
	const baseClass = 'flex items-center justify-between gap-3 rounded-md'
	return active ? `${baseClass} bg-primary/15 text-primary font-semibold` : baseClass
}

export const LanguageSwitcher = ({ label }: { label: string }) => {
	const locale = useLocale() as Locale
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [isPending, startTransition] = useTransition()
	const currentLocaleLabel = localeLabels[locale]
	const href = useMemo<SwitcherHref>(() => {
		const query = {} as Record<string, string | string[]>

		searchParams.forEach((value, key) => {
			const previousValue = query[key]
			if (Array.isArray(previousValue)) previousValue.push(value)
			else if (previousValue) query[key] = [previousValue, value]
			else query[key] = value
		})

		return Object.keys(query).length > 0 ? { pathname, query } : pathname
	}, [pathname, searchParams])

	return (
		<div className='dropdown dropdown-end' data-nosnippet>
			<button
				type='button'
				tabIndex={0}
				className='btn btn-ghost btn-sm text-primary hover:bg-primary/12 shrink-0 gap-2 whitespace-nowrap'
				aria-label={`${label}: ${currentLocaleLabel}`}
				aria-haspopup='menu'
				title={label}>
				<Languages size={16} />
				<span className='hidden whitespace-nowrap min-[860px]:inline'>{currentLocaleLabel}</span>
			</button>
			<ul
				tabIndex={0}
				aria-label={label}
				className='menu dropdown-content bg-base-100 border-base-content/10 z-50 mt-3 w-44 rounded-lg border p-2 shadow-xl'>
				{locales.map(targetLocale => {
					const active = targetLocale === locale

					return (
						<li key={targetLocale}>
							<button
								type='button'
								lang={targetLocale}
								aria-current={active ? 'true' : undefined}
								disabled={isPending}
								onClick={() => {
									if (active) return
									startTransition(() => router.replace(href, { locale: targetLocale }))
								}}
								className={getLocaleMenuItemClass(active)}>
								<span>{localeLabels[targetLocale]}</span>
								{active && <Check size={15} aria-hidden='true' />}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}