import { type ReactNode } from 'react'

export const ContentSection = ({ children, title }: { children: ReactNode; title: string }) => (
	<section className='border-base-content/10 bg-base-100/50 border-t'>
		<div className='mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:px-12'>
			<div className='mb-8'>
				<p className='text-primary text-sm font-semibold tracking-[0.18em] uppercase' data-nosnippet>
					More
				</p>
				<h2 className='mt-2 text-3xl font-black'>{title}</h2>
			</div>
			<div className='prose prose-lg max-w-none'>{children}</div>
		</div>
	</section>
)