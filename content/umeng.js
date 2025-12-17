;(function () {
	if (!['oom-wg.dev', 'oom.mintlify.app'].includes(window.location.hostname)) return

	var appKeys = [
		{path: '/ssu', key: '6849a077bc47b67d8382f404'},
		{path: '/suu', key: '68234476bc47b67d8364a026'}
	]
	var appKey = null

	for (const config of appKeys)
		if (window.location.pathname.startsWith(config.path)) {
			appKey = config.path
			break
		}
	if (!appKey) return
	;(function (w, d, s, q, i) {
		w[q] = w[q] || []
		const f = d.getElementsByTagName(s)[0],
			j = d.createElement(s)
		j.async = true
		j.id = 'beacon-aplus'
		j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js'
		f.parentNode.insertBefore(j, f)
	})(window, document, 'script', 'aplus_queue', '203467608')
	aplus_queue.push({
		action: 'aplus.setMetaInfo',
		arguments: ['appKey', appKey]
	})
})()
