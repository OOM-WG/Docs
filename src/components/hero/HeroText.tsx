import {motion} from 'framer-motion'
import type {Variants} from 'framer-motion'
import React, {useState} from 'react'

import {hero} from '@/config.json'

import {SocialList} from './SocialList'

const Highlight = ({children, className = ''}: {children: React.ReactNode; className?: string}) => (
	<span className={`relative inline-block ${className}`}>
		<span
			aria-hidden
			className='absolute -z-1 top-[30%] left-0 w-full h-[40%] bg-accent/30 -rotate-3'
		/>
		<span className='relative'>{children}</span>
	</span>
)

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05
		}
	}
}

const wordVariants: Variants = {
	hidden: {opacity: 0, y: 14, scale: 0.98},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {type: 'spring', stiffness: 500, damping: 30}
	}
}

function splitWords(text: string) {
	return text.split(/\s+/).filter(Boolean)
}

export default function HeroText() {
	const [showSocial, setShowSocial] = useState(false)

	const line1 = ['欢迎光临']
	const name = hero.name
	const bioWords = splitWords(hero.bio)

	const words = [...line1, name, '💓', '|BREAK|', ...bioWords]

	return (
		<div>
			<motion.h1
				className='text-xl lg:text-3xl xl:text-[36px] leading-[1.2] tracking-[-0.01em] text-center lg:text-left text-balance'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				onAnimationComplete={() => setShowSocial(true)}>
				{words.map((w, i) =>
					w === '|BREAK|' ? (
						<br key={`br-${i}`} />
					) : (
						<motion.span
							key={`${w}-${i}`}
							variants={wordVariants}
							className='inline-block mr-2'>
							{w === name ? <Highlight className='font-medium'>{w}</Highlight> : w}
						</motion.span>
					)
				)}
			</motion.h1>

			<motion.div
				className='text-sm text-secondary mt-3 text-center lg:text-left'
				initial={{opacity: 0, y: 10}}
				animate={{opacity: 1, y: 0}}
				transition={{duration: 0.35, ease: 'easeOut', delay: 0.15}}>
				{hero.description}
			</motion.div>

			{/* 始终保留占位，避免社交图标出现时顶起上方文字（适当加大以适配移动端） */}
			<div className='mt-10 min-h-[52px]'>
				{showSocial && (
					<motion.div
						initial={{opacity: 0, y: 16}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.35, ease: 'easeOut'}}>
						<SocialList />
					</motion.div>
				)}
			</div>
		</div>
	)
}
