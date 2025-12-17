;(function () {
	if (!('serviceWorker' in navigator)) return
	if (!['oom-wg.dev', 'oom.mintlify.app'].includes(window.location.hostname)) return

	if (/^zh\b/.test(navigator.language || navigator.userLanguage || ''))
		navigator.serviceWorker.register('/assets/oow-sw.js', {scope: '/'}).catch(() => {})
})()
