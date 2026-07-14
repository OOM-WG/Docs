import {
	AppWindow,
	Blocks,
	DatabaseZap,
	EyeOff,
	FolderCog,
	Gauge,
	Layers,
	Link,
	MonitorSmartphone,
	PackageOpen,
	Router,
	ShieldCog,
	Toolbox,
	Usb,
	Wrench
} from 'lucide-react'

import type { LocaleContent, MainConfig, ProjectCard, ProjectConfig, ProjectKey } from '../site'
import { content as AboutContent } from './about'
import { content as SecurityContent } from './security'

const mainConfig = {
	name: 'ShiroSU Series',
	shortName: 'SSU',
	shortTitle: 'SSU',
	summary: 'Improving the Android experience',
	description: 'A series of projects built to improve the Android experience',
	keywords: ['ShiroSU', 'SSU', 'Android', 'root', 'flashing', 'tinkering'],
	hero: {
		description:
			'A family of root utilities and Android tinkering tools that makes each project easier to use and the overall experience more complete'
	}
} satisfies MainConfig

const projectConfigs = {
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
		jsonLd: {
			type: 'WebApplication',
			applicationCategory: 'SecurityApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				title: 'Web connectivity',
				description:
					'Manage root through a web manager, with frontend and backend separation making LAN access straightforward; Browser PWA support lets the page be installed on a device, keeping it easy to use and update',
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
		jsonLd: {
			type: 'SoftwareApplication',
			applicationCategory: 'SecurityApplication',
			operatingSystem: 'Android'
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
	flasher: {
		key: 'flasher',
		name: 'Flasher',
		shortTitle: 'SSU Flash',
		summary: 'Install-free web flasher',
		description: 'A WebUSB-based web flashing tool that lets you flash devices directly from the browser',
		keywords: ['ShiroSU Flasher', 'SSU Flash', 'ShiroSU web flashing', 'SSU web flashing'],
		hero: {
			description:
				'(In development) Connect devices through WebUSB in Chromium-based browsers and flash them directly from the web'
		},
		features: [
			{
				title: 'WebUSB connection',
				description:
					'Connect devices from the browser without local adb or fastboot binaries, while device drivers are still required',
				icon: Usb
			},
			{
				title: 'Rich feature set',
				description: 'Connect through adb or fastboot, with support for common actions such as unlocking and flashing',
				icon: Toolbox
			},
			{
				title: 'Easy web app',
				description: 'Browser PWA support lets the page be installed on a device, keeping it easy to use and update',
				icon: AppWindow
			}
		]
	},
	fetcher: {
		key: 'fetcher',
		name: 'Fetcher',
		shortTitle: 'SSU Fetch',
		summary: 'Lightweight device information fetcher',
		description: 'A Rust no_std based device information fetcher that can run from the command line or be used as a library',
		keywords: ['ShiroSU Fetcher', 'SSU Fetch', 'ShiroSU device information', 'SSU device information'],
		hero: {
			description:
				'(In development) A lightweight, low-level device information fetcher focused on display and debugging use cases'
		},
		features: [
			{
				title: 'Lightweight and fast',
				description: 'The core is written in Rust no_std for a leaner footprint and predictable performance',
				icon: Gauge
			},
			{
				title: 'Multi-platform adaptation',
				description: 'Collects what each platform can provide, with deeper Android-specific support',
				icon: MonitorSmartphone
			},
			{
				title: 'Multiple uses',
				description:
					'Can display information from the command line in daily use, or be used as a library to gather debug information when needed',
				icon: Wrench
			}
		]
	},
	library: {
		key: 'library',
		name: 'Library',
		shortTitle: 'SSU Lib',
		summary: 'Root integration wrapper library',
		description: 'A wrapper library mainly for root implementations, simplifying parts of the integration process',
		keywords: ['ShiroSU Library', 'SSU Lib'],
		hero: {
			description: '(In development) An Android Kotlin library focused on wrapping root integration'
		},
		features: []
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
		jsonLd: {
			type: 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
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
} satisfies Record<ProjectKey, ProjectConfig> as Record<ProjectKey, ProjectConfig>

const projectCards = [
	{
		project: 'newtech',
		title: 'ShiroSU NewTech',
		description: projectConfigs.newtech.description,
		icon: Router
	},
	{
		project: 'compat',
		title: 'ShiroSU Compat',
		description: projectConfigs.compat.description,
		icon: Layers
	},
	{
		project: 'flasher',
		title: 'ShiroSU Flasher',
		description: projectConfigs.flasher.description,
		icon: Usb
	},
	{
		project: 'fetcher',
		title: 'ShiroSU Fetcher',
		description: projectConfigs.fetcher.description,
		icon: Gauge
	},
	{
		project: 'library',
		title: 'ShiroSU Library',
		description: projectConfigs.library.description,
		icon: PackageOpen
	},
	{
		project: 'utils',
		title: 'ShiroSU Utils',
		description: projectConfigs.utils.description,
		icon: FolderCog
	}
] satisfies ProjectCard[] as ProjectCard[]

export const content = {
	about: AboutContent,
	security: SecurityContent,
	projectCards,
	mainConfig,
	projectConfigs,
	ui: {
		nav: {
			about: 'About',
			security: 'Security',
			projects: 'Projects',
			language: 'Language'
		},
		landing: {
			enterPage: 'Open page',
			viewDocs: 'View docs',
			backHome: 'Back to homepage',
			moreTitle: 'Learn more'
		}
	}
} satisfies LocaleContent