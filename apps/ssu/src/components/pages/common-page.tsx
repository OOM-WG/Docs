import { type ReactNode } from 'react'

export const CommonPage = async ({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) => (
	<main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12'>
		<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>{eyebrow}</p>
		<h1 className='mt-4 text-5xl font-black'>{title}</h1>
		<div className='prose prose-lg mt-8 max-w-none'>{children}</div>
	</main>
)