import {AnimatePresence, motion} from 'framer-motion'

import {org} from '@/config.json'

import {useIsMobile, useShouldHeaderMetaShow} from './hooks'

export function AnimatedLogo() {
	const isMobile = useIsMobile()
	const shouldHeaderMetaShow = useShouldHeaderMetaShow()

	if (!isMobile) {
		return <Logo />
	}

	return (
		<AnimatePresence>
			{!shouldHeaderMetaShow && (
				<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
					<Logo />
				</motion.div>
			)}
		</AnimatePresence>
	)
}

function Logo() {
	return (
		<a className='block' href='/' title='Nav to home'>
			<img
				className='size-[40px] select-none object-cover rounded-2xl'
				src={org.avatar}
				alt='Site owner avatar'
			/>
		</a>
	)
}
