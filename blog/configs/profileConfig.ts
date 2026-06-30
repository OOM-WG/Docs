import type { ProfileConfig } from '@/types/config'

export const profileConfig: ProfileConfig = {
	avatar: '/images/logo/oow.webp',
	name: '回忆溢出工作组',
	bio: '这里是一切的开始，在仰望星空的同时，也悄然承载着一点点回忆',
	typewriter: {
		enable: true
	},
	links: [
		{
			name: '官网',
			icon: 'material-symbols:work',
			url: 'https://oom-wg.dev'
		},
		{
			name: 'GitHub',
			icon: 'fa7-brands:github',
			url: 'https://github.com/OOM-WG'
		}
	]
}