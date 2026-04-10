export const UpdateLog = ({ date, changes = [], link }) => {
	const types = {
		common: { icon: 'scroll-text', color: 'blue' },
		update: { icon: 'circle-fading-arrow-up', color: 'green' },
		fix: { icon: 'bug-off', color: 'yellow' },
		broken: { icon: 'circle-x', color: 'red' },
		setting: { icon: 'bolt', color: 'gray' }
	}
	return (
		<>
			<h4>{date}</h4>
			{changes.map((item, index) => (
				<div key={index} className='mb-1'>
					<Badge icon={types[item.type].icon} color={types[item.type].color}>
						{item.text}
					</Badge>
				</div>
			))}
			{link && (
				<p>
					<a href={link} target='_blank' className='border-none'>
						<Badge icon='download' color='orange' shape='pill'>
							下载地址
						</Badge>
					</a>
				</p>
			)}
		</>
	)
}
