import { Directory } from '@/components/directory'
import { navSections } from '@/data/links'

export const Home = () => (
	<main>
		<section className='mx-auto grid w-full max-w-7xl gap-8 px-7 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-16 xl:px-20'>
			<div>
				<p className='text-primary text-sm font-semibold tracking-[0.22em] uppercase'>OOM WG Navigation</p>
				<h1 className='mt-4 text-5xl leading-tight font-black sm:text-6xl'>200OK Working</h1>
				<p className='text-base-content/72 mt-6 max-w-2xl text-lg leading-8'>
					回忆溢出工作组的网址导航，在这里或许能认识更多？
				</p>
			</div>
			<div className='grid gap-3 sm:grid-cols-2'>
				{navSections.map(section => (
					<a
						key={section.slug}
						className='border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 rounded-xl border p-4 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]'
						href={`#${section.slug}`}>
						<p className='font-bold'>{section.taxonomy}</p>
						<p className='text-base-content/64 mt-2 text-sm leading-6'>{section.description}</p>
					</a>
				))}
				<a
					className='border-base-content/10 bg-base-100/82 hover:border-primary/45 hover:bg-primary/10 rounded-xl border p-4 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]'
					href='#organization'>
					<p className='font-bold'>组织账号</p>
					<p className='text-base-content/64 mt-2 text-sm leading-6'>组织平台官方账号</p>
				</a>
			</div>
		</section>
		<div className='mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 lg:px-12'>
			<Directory />
		</div>
	</main>
)