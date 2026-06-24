export const CoreDevCard = ({ name, role, image, bio, url, email, tooltip }) => {
	const [address, setAddress] = useState('')
	const [hasMail, setHasMail] = useState(false)

	useEffect(() => {
		if (email) {
			setHasMail(true)
			setAddress(`mailto:${email}@oom-wg.dev`)
		}
	}, [email])

	const CardContent = (
		<a
			href={url}
			className='not-prose hover:border-primary group flex w-full items-start gap-5 rounded-xl border border-transparent bg-transparent p-5 no-underline transition-colors duration-200 hover:bg-zinc-50 sm:items-center dark:hover:bg-zinc-800/30'>
			<div className='shrink-0'>
				<div className='h-16 w-16 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-zinc-200 transition-colors group-hover:ring-transparent dark:ring-white/10'>
					<img src={image} alt={name} className='m-0 h-full w-full object-cover' />
				</div>
			</div>

			<div className='flex min-w-0 flex-1 flex-col justify-center text-left'>
				<h3 className='group-hover:text-primary m-0 text-base font-bold text-zinc-900 transition-colors dark:text-zinc-100'>
					{name}
				</h3>

				<div className='group-hover:text-primary/80 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors'>
					{role}
				</div>

				<p className='m-0 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>{bio}</p>
			</div>
		</a>
	)

	return hasMail ? (
		<Tooltip headline={name} tip={tooltip} cta='邮件联系' href={address}>
			{CardContent}
		</Tooltip>
	) : (
		CardContent
	)
}

export const DevList = ({ children }) => <div className='mx-auto my-8 flex w-full max-w-3xl flex-col gap-4'>{children}</div>