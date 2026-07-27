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
import FylBody from './projects/fyl.mdx'
import ModulesBuilderBody from './projects/modules-builder.mdx'
import NewTechBody from './projects/newtech.mdx'
import SystemlessBody from './projects/systemless.mdx'
import UtilsBody from './projects/utils.mdx'

const mainConfig = {
	name: 'ShiroSU 系列',
	shortTitle: 'SSU',
	summary: '助力 Android 使用体验提升',
	description: '致力于 Android 使用体验提升的系列项目',
	keywords: ['SakiSU', 'ShiroSU', 'SSU', 'ShiroSU 官网', 'SSU 官网', 'Android', 'root', '刷机', '玩机'],
	hero: {
		description: '以系列中各个项目提供更易上手的 root 使用方式或玩机工具，让 Android 玩机体验更完整'
	}
} satisfies MainConfig

const projectConfigs = {
	fyl: {
		key: 'fyl',
		icon: PackageOpen,
		name: '萦莹恋',
		shortTitle: 'SSU FYL',
		summary: '跨平台多功能开发库',
		description: '涵盖各种功能的开发库，专注于跨平台通用和 Android 深度适配',
		keywords: ['ShiroSU 萦莹恋', 'SSU FYL', 'FVV', '多语言', 'Android', 'root', 'su'],
		hero: {
			description: '以多种子功能聚合的开发库，专注于跨平台通用与 Android 深度适配'
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
				title: 'FYTxt - 多语言框架',
				description: 'Kotlin 多语言框架，支持全平台并在性能与易用性上有着优秀表现'
			}
		]
	},
	newtech: {
		key: 'newtech',
		icon: ShieldCogCorner,
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: '自由互联的 root 实现',
		description: '以安全性与便利性为先的 root 实现，WebUI 管理方式让互联更自由',
		keywords: ['ShiroSU NT', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description: '纯用户态低侵入性 root 实现，采用 WebUI 管理结合白名单机制实现高隐蔽性设计'
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
				title: '网页互联',
				description:
					'通过网页管理器管理 root，前后端分离让局域网互联成为自然能力；浏览器 PWA 特性可直接将管理器安装至设备，易用易更新'
			},
			{
				icon: Blocks,
				title: '完整功能',
				description: '权能管理支持白名单授予 root 与黑名单卸载挂载；模块系统基于 KernelSU 元模块设计实现'
			},
			{
				icon: EyeOff,
				title: '高隐蔽性',
				description: '原生 root 不泄露任何 SELinux 或挂载上下文，并可通过黑名单功能暂时断连端口'
			}
		]
	},
	compat: {
		key: 'compat',
		icon: Grid2x2Plus,
		name: 'Compat',
		shortTitle: 'SSU Compat',
		summary: '多功能 root 管理器',
		description: '兼容多种 root 实现的多功能 root 管理器，便利管理 root 功能',
		keywords: ['ShiroSU Compat', 'SSU Compat', 'ShiroSU 管理器', 'SSU 管理器'],
		hero: {
			description: '面向多种 root 实现提供权能与模块管理，在多种 root 实现间始终保持一致性体验'
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
				title: '多种 root 实现适配',
				description: '兼容 Magisk、KernelSU、APatch 等多种 root 实现'
			},
			{
				icon: Layers,
				title: '模块管理',
				description: '支持一键处理模块，置顶模块或创建快捷方式等便利操作'
			},
			{
				icon: Link,
				title: '更多功能',
				description: '支持 Scheme 关联、模块信息拓展等更多功能增强使用体验'
			}
		]
	},
	utils: {
		key: 'utils',
		icon: FolderCog,
		name: 'Utils (苏柚)',
		shortTitle: 'SUU',
		summary: '多平台 Android 玩机工具',
		description: '多平台 Android 玩机工具，覆盖多种使用场景',
		keywords: ['ShiroSU Utils', '苏柚', 'SUU', '存储优化', '网页刷机'],
		hero: {
			title: '苏柚 / SUU',
			description: '以多权限、多平台覆盖更广泛的 Android 玩机场景，让各场景下的 Android 玩机都能更进一步'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			applicationSubCategory: 'DeveloperApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				icon: ShieldCog,
				title: '多权限覆盖',
				description: '普通权限、ADB、DeviceOwner、root 与 Xposed 注入都可以驱动部分功能'
			},
			{
				icon: DatabaseZap,
				title: '存储优化',
				description: '文件整理、清理、重定向，加以碎片整理与脏块回收，让设备存储更清晰'
			},
			{
				icon: Usb,
				title: '网页刷机',
				description: '免安装网页刷机工具，仅需浏览器即可即刻刷机，无需在本地额外安装 adb 或 fastboot 程序'
			}
		]
	},
	fetcher: {
		key: 'fetcher',
		icon: Gauge,
		name: 'Fetcher',
		shortTitle: 'SSU Fetch',
		summary: '轻量设备信息获取工具',
		description: '以 Rust no_std 为核心的设备信息获取工具，可通过命令行运行或作为库使用',
		keywords: ['ShiroSU Fetcher', 'SSU Fetch', 'ShiroSU 信息获取', 'SSU 信息获取'],
		hero: {
			description: '(开发中) 追求轻量、底层的设备信息获取工具，专注于展示或调试用途'
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
		summary: '高兼容通用 systemless 挂载系统',
		description: '基于 bind mount 实现的拥有自身运行时的 systemless 挂载系统',
		keywords: ['ShiroSU Systemless', 'SSUS', 'ShiroSU 元模块', 'SSU 元模块'],
		hero: {
			description: '拥有自身运行时的 systemless 挂载系统，动态分区判断使其有着优秀兼容性'
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
		name: '模块构建工具',
		shortTitle: 'SSU Mods Builder',
		summary: '通用 root 模块构建工具',
		description: '支持多种 root 实现特性的模块构建工具',
		keywords: ['ShiroSU 模块', 'SSU 模块', 'root 模块'],
		hero: {
			description: '支持多种 root 实现特性并可与原生编译语言共同构建的模块构建工具'
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
			title: '关于 ShiroSU 系列',
			description: 'ShiroSU 系列的相关说明（原 SakiSU/SakitinSU）'
		},
		security: {
			title: 'ShiroSU 系列安全声明',
			description: '有关 ShiroSU 系列的安全性声明'
		},
		'why-shirosu': {
			title: '为什么选择 ShiroSU？',
			description: '在 Android root 生态中 ShiroSU 交出的答卷'
		},
		projects: {
			title: 'ShiroSU 项目列表',
			description: 'ShiroSU 系列中的主线项目与支线项目'
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
			about: '关于',
			security: '安全声明',
			projects: '项目',
			language: '语言'
		},
		landing: {
			enterPage: '进入页面',
			viewProjects: '查看项目',
			viewDocs: '查看文档',
			backHome: '返回主页',
			moreTitle: '了解更多',
			whyChoose: '为何选择？'
		},
		projects: {
			description: 'ShiroSU 系列由主线项目与支线项目组成，共同覆盖 Android 玩机的不同场景',
			primaryTitle: '主线项目',
			primaryDescription: 'ShiroSU 系列的核心项目，定义 ShiroSU 核心使用体验',
			subTitle: '支线项目',
			subDescription: '专注于各类场景能力的项目'
		},
		subproject: {
			moreProjects: '更多项目',
			mainProjects: '主线项目',
			mainProjectsDescription: '查看系列中的核心项目',
			supportingProjects: '支线项目',
			supportingProjectsDescription: '浏览其他专注于特定场景的项目'
		},
		breadcrumbs: {
			'/': '系列主页',
			'/projects': '项目列表',
			'/about': '关于系列',
			'/security': '安全声明',
			'/why-shirosu': '为何选择'
		}
	}
} satisfies LocaleContent