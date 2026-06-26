import AboutBody from '@/content/body/about.mdx'
import { canonicalFor } from '@/lib/metadata'

export const metadata = {
	title: '关于',
	description: 'ShiroSU 系列的相关说明',
	alternates: {
		canonical: canonicalFor('main', '/about')
	}
}

export default () => (
	<main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-16 sm:px-8 lg:px-12'>
		<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>About</p>
		<h1 className='mt-4 text-5xl font-black'>关于 ShiroSU 系列</h1>
		<div className='prose prose-lg mt-8 max-w-none'>
			<AboutBody />
		</div>
	</main>
)