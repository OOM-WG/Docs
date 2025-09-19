import * as QR from 'qrcode.react'
import clsx from 'clsx'
import {motion} from 'framer-motion'
import {useAtomValue} from 'jotai'
import {toast} from 'react-toastify'

import {useModal} from '@/components/ui/modal'
import {site} from '@/config.json'
import {metaSlugAtom, metaTitleAtom} from '@/store/metaInfo'

interface ShareData {
	url: string
	text: string
}

const shareList = [
	{
		name: '复制链接',
		icon: 'icon-link',
		onClick: (data: ShareData) => {
			navigator.clipboard.writeText(data.url)
			toast.success('已复制到剪贴板')
		}
	}
]

export function ActionAside() {
	return (
		<div
			className='absolute left-0 bottom-0 flex flex-col gap-4'
			style={{
				transform: 'translateY(calc(100% + 24px))'
			}}>
			<ShareButton />
			<JoinButton />
		</div>
	)
}

function ShareButton() {
	const postSlug = useAtomValue(metaSlugAtom)
	const postTitle = useAtomValue(metaTitleAtom)
	const {present} = useModal()

	const url = new URL(postSlug, site.url).href
	const text = `嘿，我发现了一片宝藏文章「${postTitle}」哩，快来看看吧！`

	const openModal = () => {
		present({
			content: <ShareModal url={url} text={text} />
		})
	}

	return (
		<button
			type='button'
			aria-label='Share this post'
			className='size-6 text-xl leading-none hover:text-accent'
			onClick={() => openModal()}>
			<i className='iconfont icon-share'></i>
		</button>
	)
}

function ShareModal({url, text}: {url: string; text: string}) {
	return (
		<motion.div
			className='bg-primary rounded-lg p-2 min-w-[420px] border border-primary flex flex-col'
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			exit={{opacity: 0, scale: 0.8}}>
			<h2 className='px-3 py-1 font-bold'>分享此内容</h2>
			<hr className='my-2 border-primary' />
			<div className='px-3 py-2 grid grid-cols-[180px_auto] gap-3'>
				<QR.QRCodeSVG value={url} size={180} />
				<div className='flex flex-col gap-2'>
					<ul className='flex flex-col gap-2'>
						{shareList.map(item => (
							<li
								className='px-2 py-1 flex gap-2 cursor-pointer rounded-md hover:bg-secondary'
								key={item.name}
								onClick={() => item.onClick({url, text})}
								role='button'
								aria-label={`Share to ${item.name}`}>
								<i className={clsx('iconfont text-accent', item.icon)}></i>
								<span>{item.name}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</motion.div>
	)
}

function JoinButton() {
	const openJoin = () => {
		window.open('/join', '_blank')
	}

	return (
		<button
			type='button'
			aria-label='Join group'
			className='size-6 text-xl leading-none hover:text-accent'
			onClick={() => openJoin()}>
			<i className='iconfont icon-user-heart'></i>
		</button>
	)
}
