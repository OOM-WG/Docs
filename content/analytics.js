;(function () {
	if (!['oom-wg.dev', 'oom.mintlify.app'].includes(window.location.hostname)) return

	var appKeys = [
		{path: '/ssu', key: 'v4cd2cjejx'},
		{path: '/suu', key: 'v4ciy9mif7'}
	]
	var appKey = null

	for (const config of appKeys)
		if (window.location.pathname.startsWith(config.path)) {
			appKey = config.path
			break
		}
	if (!appKey) return
	;(function (c, l, a, r, i, t, y) {
		c[a] =
			c[a] ||
			function () {
				;(c[a].q = c[a].q || []).push(arguments)
			}
		t = l.createElement(r)
		t.async = 1
		t.src = 'https://www.clarity.ms/tag/' + i
		y = l.getElementsByTagName(r)[0]
		y.parentNode.insertBefore(t, y)
	})(window, document, 'clarity', 'script', appKey)

	const script = document.createElement('script')
	script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
	script.defer = true
	script.setAttribute('data-cf-beacon', `{"token": "39151721f49d4b68be95c02bdc214799"}`)
	document.head.appendChild(script)
})()
