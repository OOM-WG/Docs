;(function () {
	const projects = [
		{path: '/ssu', name: 'ShiroSU', icon: 'ssu'},
		{path: '/suu', name: '苏柚', icon: 'suu'},
		{path: '/mmem', name: 'MikotoMem'},
		{path: '/only-gui-can-do', name: 'Only GUI Can Do', icon: 'only-gui-can-do'}
	]

	function update() {
		function set_default() {
			document.querySelectorAll('img.nav-logo').forEach(img => (img.src = '/images/logo/oow.webp'))
			document.querySelectorAll("link[rel*='icon']").forEach(link => {
				link.href = '/images/logo/oow.ico'
				link.type = 'image/x-icon'
				link.removeAttribute('sizes')
			})
		}
		for (const config of projects)
			if (window.location.pathname.startsWith(config.path)) {
				if (document.title.endsWith(` - ${config.name}`)) return
				const oow = '回忆溢出工作组'
				if (document.title.includes(` - ${oow}`)) {
					document.title = document.title.replace(` - ${oow}`, ` - ${config.name}`)
					if (!config.icon) {
						set_default()
						return
					}
					const icon = `/images/logo/${config.icon}`
					document.querySelectorAll('img.nav-logo').forEach(img => (img.src = `${icon}.webp`))
					document.querySelectorAll("link[rel*='icon']").forEach(link => {
						link.href = `${icon}.ico`
						link.type = 'image/x-icon'
						link.removeAttribute('sizes')
					})
					return
				}
			}
		set_default()
	}

	new MutationObserver(_ => update()).observe(document.head, {
		childList: true,
		characterData: true,
		subtree: true
	})
	update()
})()
