import {
	AppWindow,
	Blocks,
	DatabaseZap,
	Drill,
	EyeOff,
	FolderCog,
	FolderSymlink,
	Gauge,
	Grid2x2Plus,
	Languages,
	Layers,
	Link,
	PackageOpen,
	ShieldCog,
	ShieldCogCorner,
	Usb
} from 'lucide-react'

import type { LocaleContent, MainConfig, ProjectConfig, ProjectKey } from '../site'
import Graph from './graph'
import AboutBody from './pages/about.mdx'
import MainBody from './pages/main.mdx'
import SecurityBody from './pages/security.mdx'
import WhyShiroSUBody from './pages/why-shirosu.mdx'
import CompatBody from './projects/compat.mdx'
import FetcherBody from './projects/fetcher.mdx'
import FlasherBody from './projects/flasher.mdx'
import FylBody from './projects/fyl.mdx'
import ModulesBuilderBody from './projects/modules-builder.mdx'
import NewTechBody from './projects/newtech.mdx'
import SystemlessBody from './projects/systemless.mdx'
import UtilsBody from './projects/utils.mdx'

const mainConfig = {
	name: 'ShiroSU Series',
	shortTitle: 'SSU',
	summary: 'Improving the Android experience',
	description: 'A series of projects built to improve the Android experience',
	keywords: ['SakiSU', 'ShiroSU', 'SSU', 'Android', 'root', 'flashing', 'tinkering'],
	hero: {
		description:
			'A family of root utilities and Android tinkering tools that makes each project easier to use and the overall experience more complete'
	}
} satisfies MainConfig

const projectConfigs = {
	fyl: {
		key: 'fyl',
		icon: PackageOpen,
		name: 'FYL',
		shortTitle: 'SSU FYL',
		summary: 'Cross-platform multifunction development library',
		description:
			'A development library covering a wide range of functionality, focused on cross-platform reuse and deep Android adaptation',
		keywords: ['ShiroSU FYL', 'SSU FYL', 'FVV', 'multilingual', 'Android', 'root', 'su'],
		hero: {
			description:
				'A development library composed of multiple subfeatures, focused on cross-platform reuse and deep Android adaptation'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'DeveloperApplication',
			applicationSubCategory: 'UtilitiesApplication',
			operatingSystem: 'Any'
		},
		features: [
			{
				icon: Languages,
				title: 'FYTxt - multilingual framework',
				description: 'A Kotlin multilingual framework with cross-platform support and strong performance and usability'
			}
		]
	},
	newtech: {
		key: 'newtech',
		icon: ShieldCogCorner,
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: 'Root implementation with open connectivity',
		description:
			'A root implementation that puts security and convenience first, with WebUI management for more flexible connectivity',
		keywords: ['ShiroSU NT', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description:
				'A low-intrusion userspace root implementation with WebUI management and a whitelist mechanism for strong concealment'
		},
		jsonLd: {
			'@type': 'WebApplication',
			applicationCategory: 'SecurityApplication',
			applicationSubCategory: 'DeveloperApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				icon: AppWindow,
				title: 'Web connectivity',
				description:
					'Manage root through a web manager, with frontend and backend separation making LAN access straightforward; Browser PWA support lets the page be installed on a device, keeping it easy to use and update'
			},
			{
				icon: Blocks,
				title: 'Complete feature set',
				description:
					'Privilege management supports whitelist root grants and blacklist unmounting; the module system follows the KernelSU meta module design'
			},
			{
				icon: EyeOff,
				title: 'High concealment',
				description:
					'Native root exposes no SELinux or mount context, and can temporarily disconnect ports through blacklist controls'
			}
		]
	},
	compat: {
		key: 'compat',
		icon: Grid2x2Plus,
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
			'@type': 'MobileApplication',
			applicationCategory: 'SecurityApplication',
			applicationSubCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				icon: ShieldCog,
				title: 'Multiple root implementations',
				description: 'Compatible with Magisk, KernelSU, APatch and other root implementations'
			},
			{
				icon: Layers,
				title: 'Module management',
				description: 'Supports convenient module operations such as one-tap handling, pinning modules and creating shortcuts'
			},
			{
				icon: Link,
				title: 'More capabilities',
				description: 'Supports scheme association, extended module information and other enhancements'
			}
		]
	},
	utils: {
		key: 'utils',
		icon: FolderCog,
		name: 'Utils (SUU)',
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
			'@type': 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				icon: ShieldCog,
				title: 'Multiple permission levels',
				description:
					'Standard permissions, adb, DeviceOwner, root, and Xposed injection can all drive parts of the feature set'
			},
			{
				icon: DatabaseZap,
				title: 'Storage optimization',
				description:
					'File organization, cleanup, redirection, defragmentation and dirty block reclaim help keep device storage clearer'
			},
			{
				icon: PackageOpen,
				title: 'Small utilities',
				description:
					'A collection of small utilities makes daily use easier, with Windows builds available to extend the experience'
			}
		]
	},
	flasher: {
		key: 'flasher',
		icon: Usb,
		name: 'Flasher',
		shortTitle: 'SSU Flash',
		summary: 'Install-free web flasher',
		description: 'A WebUSB-based web flashing tool that lets you flash devices directly from the browser',
		keywords: ['ShiroSU Flasher', 'SSU Flash', 'ShiroSU web flashing', 'SSU web flashing'],
		hero: {
			description:
				'(In development) Connect devices through WebUSB in Chromium-based browsers and flash them directly from the web'
		},
		jsonLd: {
			'@type': 'WebApplication',
			applicationCategory: 'UtilitiesApplication',
			applicationSubCategory: 'DeveloperApplication',
			operatingSystem: 'Web'
		}
	},
	fetcher: {
		key: 'fetcher',
		icon: Gauge,
		name: 'Fetcher',
		shortTitle: 'SSU Fetch',
		summary: 'Lightweight device information fetcher',
		description: 'A Rust no_std based device information fetcher that can run from the command line or be used as a library',
		keywords: ['ShiroSU Fetcher', 'SSU Fetch', 'ShiroSU device information', 'SSU device information'],
		hero: {
			description:
				'(In development) A lightweight, low-level device information fetcher focused on display and debugging use cases'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			applicationSubCategory: 'DeveloperApplication',
			operatingSystem: 'Any'
		}
	},
	systemless: {
		key: 'systemless',
		icon: FolderSymlink,
		name: 'Systemless',
		shortTitle: 'SSUS',
		summary: 'Highly compatible general-purpose systemless mounting system',
		description: 'A systemless mounting system built on bind mount with its own runtime',
		keywords: ['ShiroSU Systemless', 'SSUS', 'ShiroSU meta module', 'SSU meta module'],
		hero: {
			description:
				'A systemless mounting system with its own runtime and strong compatibility through dynamic partition detection'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'DeveloperApplication',
			applicationSubCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		}
	},
	'modules-builder': {
		key: 'modules-builder',
		icon: Drill,
		name: 'Modules Builder',
		shortTitle: 'SSU Mods Builder',
		summary: 'General-purpose root module builder',
		description: 'A module builder that supports features from multiple root implementations',
		keywords: ['ShiroSU modules', 'SSU modules', 'root modules'],
		hero: {
			description:
				'A module builder that supports multiple root implementation features and can build alongside native compiled languages'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'DeveloperApplication',
			applicationSubCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		}
	}
} satisfies Record<ProjectKey, ProjectConfig> as Record<ProjectKey, ProjectConfig>

export const content = {
	pages: {
		about: {
			title: 'About the ShiroSU Series',
			description: 'Information about the ShiroSU Series (formerly SakiSU/SakitinSU)'
		},
		security: {
			title: 'ShiroSU Series Security Statement',
			description: 'Security statements for the ShiroSU Series'
		},
		'why-shirosu': {
			title: 'Why choose ShiroSU?',
			description: 'ShiroSU’s answer within the Android root ecosystem'
		},
		projects: {
			title: 'ShiroSU Project Directory',
			description: 'Mainline and supporting projects in the ShiroSU Series'
		}
	},
	mdx: {
		main: MainBody,
		pages: {
			about: AboutBody,
			security: SecurityBody,
			'why-shirosu': WhyShiroSUBody
		},
		projects: {
			fyl: FylBody,
			newtech: NewTechBody,
			compat: CompatBody,
			utils: UtilsBody,
			flasher: FlasherBody,
			fetcher: FetcherBody,
			systemless: SystemlessBody,
			'modules-builder': ModulesBuilderBody
		}
	},
	components: {
		graph: Graph
	},
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
			viewProjects: 'View projects',
			viewDocs: 'View docs',
			backHome: 'Back to homepage',
			moreTitle: 'Learn more',
			whyChoose: 'Why choose?'
		},
		projects: {
			description:
				'The ShiroSU Series consists of mainline and supporting projects, covering different Android tinkering scenarios',
			primaryTitle: 'Mainline projects',
			primaryDescription: 'The core projects of the ShiroSU Series, defining the core ShiroSU experience',
			subTitle: 'Supporting projects',
			subDescription: 'Projects focused on capabilities for specific scenarios'
		},
		subproject: {
			moreProjects: 'More projects',
			mainProjects: 'Mainline projects',
			mainProjectsDescription: 'Explore the core projects in the series',
			supportingProjects: 'Supporting projects',
			supportingProjectsDescription: 'Browse other projects focused on specific scenarios'
		},
		breadcrumbs: {
			'/': 'Series Homepage',
			'/projects': 'Project Directory',
			'/about': 'About the Series',
			'/security': 'Security Statement',
			'/why-shirosu': 'Why Choose'
		}
	}
} satisfies LocaleContent