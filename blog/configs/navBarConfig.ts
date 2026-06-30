import type { NavBarConfig } from '@/types/config'
import { LinkPreset } from '@/types/config'

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,

		{
			name: '官网',
			url: 'https://oom-wg.dev',
			external: true,
			icon: 'material-symbols:work'
		},

		{
			name: 'GitHub',
			url: 'https://github.com/OOM-WG',
			external: true,
			icon: 'fa7-brands:github'
		},

		{
			name: 'About',
			url: '/about/',
			icon: 'material-symbols:info'
		}
	]
}