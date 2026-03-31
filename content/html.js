;(function () {
	const path = window.location.pathname
	if (path.endsWith('.html')) window.location.replace(path.slice(0, -5) + window.location.search + window.location.hash)
})()
