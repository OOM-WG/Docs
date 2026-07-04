import { type Metadata } from 'next'

import AboutBody from '@/content/body/about.mdx'
import { canonicalFor, pageMetadata } from '@/lib/metadata'

const baseMetadata = pageMetadata('main')
const pageInfo = {
	title: '关于 ShiroSU 系列',
	description: 'ShiroSU 系列的相关说明',
	canonical: canonicalFor('main', '/about')
}

export const metadata = {
	...baseMetadata,
	title: pageInfo.title,
	description: pageInfo.description,
	alternates: {
		canonical: pageInfo.canonical
	},
	openGraph: {
		...baseMetadata.openGraph,
		title: pageInfo.title,
		description: pageInfo.description,
		url: pageInfo.canonical
	},
	twitter: {
		...baseMetadata.twitter,
		description: pageInfo.description,
		title: pageInfo.title
	}
} satisfies Metadata

export default () => (
	<main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12'>
		<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>About</p>
		<h1 className='mt-4 text-5xl font-black'>关于 ShiroSU 系列</h1>
		<div className='prose prose-lg mt-8 max-w-none'>
			<AboutBody />
		</div>
	</main>
)