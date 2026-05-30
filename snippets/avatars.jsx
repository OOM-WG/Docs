export const Avatar = ({ name, role, avatar, date, className = '' }) => {
	return (
		<div
			className={`
        flex items-center gap-3 p-3 rounded-xl
        w-full not-prose
        bg-white dark:bg-zinc-900/50

        /* 边框样式设置 */
        border border-zinc-200 dark:border-white/10

        /* 交互效果：悬停和点击时使用主题色 (Primary Color) */
        transition-colors duration-200
        hover:border-primary dark:hover:border-primary
        active:border-primary

        /* 保持轻微的背景变化以增强层次感 (可选，不需要可删除 hover:bg-...) */
        hover:bg-zinc-50 dark:hover:bg-white/5

        ${className}
      `}>
			{/* 1. 头像部分：固定大小，不压缩 */}
			<div className='flex-shrink-0'>
				<img
					src={avatar}
					alt={name}
					className='w-10 h-10 rounded-full object-cover border border-zinc-100 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800'
				/>
			</div>

			{/* 2. 文本部分：占据剩余空间 (flex-1) */}
			<div className='flex flex-col flex-1 min-w-0'>
				<div className='flex items-center justify-between gap-2'>
					<span className='text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate'>{name}</span>
				</div>
				<span className='text-xs text-zinc-500 dark:text-zinc-400 truncate'>{role}</span>
			</div>

			{/* 3. 日期部分：在最右侧显示 */}
			{date && <div className='flex-shrink-0 text-xs font-mono text-zinc-400 dark:text-zinc-500 ml-2'>{date}</div>}
		</div>
	)
}

export const ShiroAvatar = ({ date, className = '' }) => (
	<Avatar name='白彩恋' role='总主编' avatar='/images/avatar/shiro.webp' date={date} className={className} />
)
export const LinsoAvatar = ({ date, className = '' }) => (
	<Avatar name='Linso' role='强到被跨省抓捕' avatar='/images/avatar/linso.webp' date={date} className={className} />
)
export const NuoFangAvatar = ({ date, className = '' }) => (
	<Avatar name='悠栾' role='网管?' avatar='/images/avatar/ark.webp' date={date} className={className} />
)
export const YumeYukaAvatar = ({ date, className = '' }) => (
	<Avatar name='梦璃酱' role='小魔女' avatar='/images/avatar/yumeyuka.webp' date={date} className={className} />
)