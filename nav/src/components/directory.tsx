import { Code2, LinkIcon, Users } from 'lucide-react'

import { LinkCard } from '@/components/link-card'
import { navSections, orgLinks } from '@/data/links'

const sectionIcons = {
	link: LinkIcon,
	code: Code2,
	users: Users
} as const

export const Directory = () => (
	<div className='space-y-14'>
		{navSections.map(section => {
			const Icon = sectionIcons[section.icon]

			return (
				<section key={section.slug} id={section.slug} className='scroll-mt-24'>
					<div className='mb-5 flex items-start gap-4'>
						<div className='bg-primary/12 text-primary rounded-lg p-3'>
							<Icon size={22} />
						</div>
						<div>
							<h2 className='text-2xl font-black'>{section.taxonomy}</h2>
							<p className='text-base-content/62 mt-2 leading-7'>{section.description}</p>
						</div>
					</div>
					<div className='space-y-6'>
						{section.list.map(group => (
							<div key={group.term}>
								<div className='mb-3 flex items-center gap-2'>
									<div className='badge badge-outline border-primary/40 bg-primary/10 text-primary'>{group.term}</div>
								</div>
								<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
									{group.links.map(link => (
										<LinkCard key={link.url} link={link} />
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			)
		})}

		<section id='organization' className='scroll-mt-24'>
			<h2 className='mb-4 text-2xl font-black'>组织账号</h2>
			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
				{orgLinks.map(link => (
					<LinkCard key={link.url} link={link} />
				))}
			</div>
		</section>
	</div>
)