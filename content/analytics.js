;(function () {
	if (!['oom-wg.dev', 'oom.mintlify.app'].includes(window.location.hostname)) return
	function onerror() {
		console.error(
			'%c ERROR!!! ',
			'color: white; background: red; font-size: 88px; font-weight: bold; padding: 22px;'
		)
	}

	;(function (c, l, a, r, i, t, y) {
		c[a] =
			c[a] ||
			function () {
				;(c[a].q = c[a].q || []).push(arguments)
			}
		t = l.createElement(r)
		t.async = 1
		t.src = 'https://www.clarity.ms/tag/' + i
		t.onerror = onerror
		y = l.getElementsByTagName(r)[0]
		y.parentNode.insertBefore(t, y)
	})(window, document, 'clarity', 'script', 'v4cpxdpw7p')
	// Clarity: https://clarity.microsoft.com/
	;(function (script) {
		script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
		script.defer = true
		script.setAttribute('data-cf-beacon', `{"token": "39151721f49d4b68be95c02bdc214799"}`)
		script.onerror = onerror
		document.head.appendChild(script)
	})(document.createElement('script'))
	// Cloudflare Web Analytics: https://www.cloudflare.com/web-analytics/
})()
