import { AppWindow, Blocks, DatabaseZap, EyeOff, FolderCog, Layers, Link, PackageOpen, Router, ShieldCog } from 'lucide-react'

import type { LocaleContent, ProjectCard, SiteConfig, SiteKey } from '../site'
import { about } from './about'

const siteConfigs = {
	main: {
		key: 'main',
		name: 'ShiroSU Series',
		shortName: 'SSU',
		shortTitle: 'SSU',
		summary: 'Improving the Android experience',
		description: 'A series of projects built to improve the Android experience',
		keywords: ['ShiroSU', 'SSU', 'Android', 'root', 'flashing', 'tinkering'],
		hero: {
			description:
				'A family of root utilities and Android tinkering tools that makes each project easier to use and the overall experience more complete'
		},
		features: []
	},
	newtech: {
		key: 'newtech',
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: 'Root implementation with open connectivity',
		description:
			'A root implementation that puts security and convenience first, with WebUI management for more flexible connectivity',
		keywords: ['ShiroSU NewTech', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description:
				'A low-intrusion userspace root implementation with WebUI management and a whitelist mechanism for strong concealment'
		},
		features: [
			{
				title: 'Web connectivity',
				description:
					'Manage root through a web manager, with frontend and backend separation making LAN access straightforward',
				icon: AppWindow
			},
			{
				title: 'Complete feature set',
				description:
					'Privilege management supports whitelist root grants and blacklist unmounting; the module system follows KernelSU meta module design',
				icon: Blocks
			},
			{
				title: 'High concealment',
				description:
					'Native root exposes no SELinux or mount context, and can temporarily disconnect ports through blacklist controls',
				icon: EyeOff
			}
		]
	},
	compat: {
		key: 'compat',
		name: 'Compat',
		shortTitle: 'SSU Compat',
		summary: 'Multi-purpose root manager',
		description: 'A multi-purpose root manager compatible with multiple root implementations',
		keywords: ['ShiroSU Compat', 'SSU Compat', 'ShiroSU manager', 'SSU manager'],
		hero: {
			description:
				'Privilege and module management for multiple root implementations, keeping the experience consistent across them'
		},
		features: [
			{
				title: 'Multiple root implementations',
				description: 'Compatible with Magisk, KernelSU, APatch and other root implementations',
				icon: ShieldCog
			},
			{
				title: 'Module management',
				description: 'Supports convenient module operations such as one-tap handling, pinning modules and creating shortcuts',
				icon: Layers
			},
			{
				title: 'More capabilities',
				description: 'Supports scheme association, extended module information and other enhancements',
				icon: Link
			}
		]
	},
	utils: {
		key: 'utils',
		name: 'Utils (SUU)',
		shortName: 'SUU',
		shortTitle: 'SUU',
		summary: 'Multi-platform Android modding & tweaking utility',
		description: 'A multi-platform Android tinkering toolkit covering multiple permission scenarios',
		keywords: ['ShiroSU Utils', 'SUU'],
		hero: {
			title: 'SUU',
			description:
				'A multi-platform toolkit covering multiple permission levels and broader Android tinkering scenarios with small utilities'
		},
		features: [
			{
				title: 'Multiple permission levels',
				description:
					'Standard permissions, adb, DeviceOwner, root, and Xposed injection can all drive parts of the feature set',
				icon: ShieldCog
			},
			{
				title: 'Storage optimization',
				description:
					'File organization, cleanup, redirection, defragmentation and dirty block reclaim help keep device storage clearer',
				icon: DatabaseZap
			},
			{
				title: 'Small utilities',
				description:
					'A collection of small utilities makes daily use easier, with Windows builds available to extend the experience',
				icon: PackageOpen
			}
		]
	}
} satisfies Record<SiteKey, SiteConfig> as Record<SiteKey, SiteConfig>

const projectCards = [
	{
		site: 'newtech',
		title: 'ShiroSU NewTech',
		description: siteConfigs.newtech.description,
		icon: Router
	},
	{
		site: 'compat',
		title: 'ShiroSU Compat',
		description: siteConfigs.compat.description,
		icon: Layers
	},
	{
		site: 'utils',
		title: 'ShiroSU Utils',
		description: siteConfigs.utils.description,
		icon: FolderCog
	}
] satisfies ProjectCard[] as ProjectCard[]

export const content = {
	about,
	projectCards,
	siteConfigs,
	ui: {
		nav: {
			about: 'About',
			organization: 'Organization',
			projects: 'Projects',
			language: 'Language'
		},
		landing: {
			enterPage: 'Open page',
			viewDocs: 'View docs',
			backHome: 'Back to main site',
			moreTitle: 'Learn more'
		}
	}
} satisfies LocaleContent