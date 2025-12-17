;(function () {
	const projects = [
		{path: '/ssu', name: 'ShiroSU'},
		{path: '/suu', name: '苏柚'}
	]

	function update() {
		for (const config of projects)
			if (window.location.pathname.startsWith(config.path)) {
				if (currentTitle.endsWith(` - ${config.name}`)) return
				const oow = '回忆溢出工作组'
				if (currentTitle.includes(` - ${oow}`)) {
					document.title = currentTitle.replace(` - ${oow}`, ` - ${config.name}`)
					return
				}
			}
	}

	const title = document.querySelector('title')
	if (title)
		new MutationObserver(_ => update()).observe(title, {
			childList: true,
			characterData: true,
			subtree: true
		})
	update()
})()
