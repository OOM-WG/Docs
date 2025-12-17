self.addEventListener('install', event => self.skipWaiting())
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', event => {
	const req = event.request
	const url = new URL(req.url)

	if (/\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
		url.hostname = url.hostname.replace(/\.com$/, '.cn')
		event.respondWith(
			fetch(
				new Request(url.toString(), {
					method: req.method,
					headers: req.headers,
					body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.clone().body,
					mode: 'cors',
					credentials: req.credentials,
					redirect: 'follow',
					cache: req.cache,
					referrer: req.referrer,
					referrerPolicy: req.referrerPolicy,
					integrity: req.integrity,
					keepalive: req.keepalive
				})
			).catch(_ => fetch(req))
		)
		return
	}
})
