export const CoreDevCard = ({name, role, image, bio, url}) => (
	<a
		href={url}
		className='group flex items-start sm:items-center gap-5 p-5 rounded-xl w-full
               not-prose no-underline border border-transparent
               hover:border-primary bg-transparent
               hover:bg-zinc-50 dark:hover:bg-zinc-800/30
               transition-colors duration-200'>
		<div className='shrink-0'>
			<div
				className='w-16 h-16 rounded-lg overflow-hidden
                      bg-zinc-100 ring-1 ring-zinc-200
                      dark:ring-white/10
                      group-hover:ring-transparent
                      transition-colors'>
				<img src={image} alt={name} className='w-full h-full object-cover m-0' />
			</div>
		</div>

		<div className='flex-1 min-w-0 flex flex-col justify-center'>
			<h3
				className='text-base font-bold m-0
                     text-zinc-900 dark:text-zinc-100
                     group-hover:text-primary
                     transition-colors'>
				{name}
			</h3>

			<div
				className='text-xs font-semibold uppercase tracking-wider mb-2
                      text-zinc-400
                      group-hover:text-primary/80
                      transition-colors'>
				{role}
			</div>

			<p
				className='text-sm text-zinc-500 dark:text-zinc-400
                    m-0 leading-relaxed line-clamp-2'>
				{bio}
			</p>
		</div>
	</a>
)

export const DevList = ({children}) => (
	<div className='flex flex-col gap-4 w-full max-w-3xl mx-auto my-8'>{children}</div>
)
