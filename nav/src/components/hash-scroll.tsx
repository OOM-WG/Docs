'use client'

import { useEffect } from 'react'

const scrollToHash = () => {
	const id = decodeURIComponent(window.location.hash.slice(1))
	if (!id) return
	const element = document.getElementById(id)
	if (!element) return
	element.scrollIntoView({ block: 'start' })
}

export const HashScroll = () => (
	useEffect(() => {
		const onHashChange = () => requestAnimationFrame(scrollToHash)
		const onLoad = () => scrollToHash()

		requestAnimationFrame(() => {
			scrollToHash()
			window.setTimeout(scrollToHash, 127)
			window.setTimeout(scrollToHash, 369)
		})

		window.addEventListener('load', onLoad)
		window.addEventListener('hashchange', onHashChange)
		return () => {
			window.removeEventListener('load', onLoad)
			window.removeEventListener('hashchange', onHashChange)
		}
	}, []),
	null
)