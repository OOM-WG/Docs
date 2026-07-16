const projects = [
	{ path: '/ssu/nt', name: 'ShiroSU NT', icon: 'ssu' },
	{ path: '/ssu/compat', name: 'ShiroSU Compat', icon: 'ssu' },
	{ path: '/ssu', name: 'ShiroSU', icon: 'ssu' },
	{ path: '/suu/win', name: '苏柚 Windows', icon: 'suu' },
	{ path: '/suu', name: '苏柚', icon: 'suu' },
	{ path: '/mmem', name: 'MikotoMem' },
	{ path: '/only-gui-can-do', name: 'Only GUI Can Do', icon: 'only-gui-can-do' }
]

function update() {
	function set_default() {
		document.querySelectorAll('img.nav-logo').forEach(img => (img.src = '/images/logo/oow.webp'))
		document.querySelectorAll("link[rel*='icon']").forEach(link => {
			link.href = '/images/logo/oow.ico'
			link.removeAttribute('type')
			link.removeAttribute('sizes')
		})
	}

	const oow = '回忆溢出工作组'
	if (!document.title.endsWith(` - ${oow}`)) return
	for (const config of projects)
		if (location.pathname.startsWith(config.path)) {
			document.title =
				location.pathname === config.path
					? `${config.name} - ${document.title.replace(` - ${oow}`, '')}`
					: document.title.replace(` - ${oow}`, ` - ${config.name}`)
			if (!config.icon) {
				set_default()
				return
			}
			const icon = `/images/logo/${config.icon}`
			document.querySelectorAll('img.nav-logo').forEach(img => (img.src = `${icon}.webp`))
			document.querySelectorAll("link[rel*='icon']").forEach(link => {
				link.href = `${icon}.ico`
				link.removeAttribute('type')
				link.removeAttribute('sizes')
			})
			return
		}
	set_default()
}

new MutationObserver(_ => update()).observe(document.head, {
	childList: true,
	characterData: true,
	subtree: true
})
update()