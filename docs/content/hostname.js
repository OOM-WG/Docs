if (location.hostname === 'oom.mintlify.app') {
	const url = new URL(location.href)
	location.replace(((url.hostname = 'oom-wg.dev'), url))
}