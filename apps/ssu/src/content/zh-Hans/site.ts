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
import { content as WhyShiroSUContent } from './why-shirosu'

const mainConfig = {
	name: 'ShiroSU 系列',
	shortName: 'SSU',
	shortTitle: 'SSU',
	summary: '助力 Android 使用体验提升',
	description: '致力于 Android 使用体验提升的系列项目',
	keywords: ['SakiSU', 'ShiroSU', 'SSU', 'ShiroSU 官网', 'SSU 官网', 'Android', 'root', '刷机', '玩机'],
	hero: {
		description: '以系列中各个项目提供更易上手的 root 使用方式或玩机工具，让 Android 玩机体验更完整'
	}
} satisfies MainConfig

const projectConfigs = {
	newtech: {
		key: 'newtech',
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
				title: '网页互联',
				description:
					'通过网页管理器管理 root，前后端分离让局域网互联成为自然能力；浏览器 PWA 特性可直接将管理器安装至设备，易用易更新',
				icon: AppWindow
			},
			{
				title: '完整功能',
				description: '权能管理支持白名单授予 root 与黑名单卸载挂载；模块系统基于 KernelSU 元模块设计实现',
				icon: Blocks
			},
			{
				title: '高隐蔽性',
				description: '原生 root 不泄露任何 SELinux 或挂载上下文，并可通过黑名单功能暂时断连端口',
				icon: EyeOff
			}
		]
	},
	compat: {
		key: 'compat',
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
				title: '多种 root 实现适配',
				description: '兼容 Magisk、KernelSU、APatch 等多种 root 实现',
				icon: ShieldCog
			},
			{
				title: '模块管理',
				description: '支持一键处理模块，置顶模块或创建快捷方式等便利操作',
				icon: Layers
			},
			{
				title: '更多功能',
				description: '支持 Scheme 关联、模块信息拓展等更多功能增强使用体验',
				icon: Link
			}
		]
	},
	flasher: {
		key: 'flasher',
		name: 'Flasher',
		shortTitle: 'SSU Flash',
		summary: '免安装网页刷机工具',
		description: '通过 WebUSB 实现的网页刷机工具，仅需浏览器即可即刻刷机！',
		keywords: ['ShiroSU Flasher', 'SSU Flash', 'ShiroSU 网页刷机', 'SSU 网页刷机'],
		hero: {
			description: '(开发中) 通过 Chromium 内核的 WebUSB 特性连接设备，在网页上即可轻松刷机！'
		},
		jsonLd: {
			'@type': 'WebApplication',
			applicationCategory: 'UtilitiesApplication',
			applicationSubCategory: 'DeveloperApplication',
			operatingSystem: 'Web'
		},
		features: [
			{
				title: 'WebUSB 连接',
				description: '无需在本地安装 adb 或 fastboot 程序，通过浏览器即可连接设备（仍需安装驱动程序）',
				icon: Usb
			},
			{
				title: '丰富功能',
				description: '可通过 adb 或 fastboot 连接设备，支持解锁、刷机等常用功能',
				icon: Toolbox
			},
			{
				title: '易用网页',
				description: '浏览器 PWA 特性可直接将网页安装至设备，易用易更新',
				icon: AppWindow
			}
		]
	},
	fetcher: {
		key: 'fetcher',
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
		},
		features: [
			{
				title: '轻量与性能',
				description: '核心代码采用 Rust no_std 编写，让体积更轻量、运行更性能',
				icon: Gauge
			},
			{
				title: '多平台适配',
				description: '针对各个平台力所能及地获取信息，也有对 Android 进行深度适配',
				icon: MonitorSmartphone
			},
			{
				title: '多用用途',
				description: '支持日常通过命令行展示信息，也可作为库在必要时收集调试信息',
				icon: Wrench
			}
		]
	},
	library: {
		key: 'library',
		name: 'Library',
		shortTitle: 'SSU Lib',
		summary: 'root 接入封装库',
		description: '主要针对 root 实现的封装库，简化一些接入流程',
		keywords: ['ShiroSU Library', 'SSU Lib'],
		hero: {
			description: '(开发中) Android Kotlin 库，专注于 root 接入封装'
		},
		features: []
	},
	utils: {
		key: 'utils',
		name: 'Utils (苏柚)',
		shortName: 'SUU',
		shortTitle: 'SUU',
		summary: '多平台 Android 玩机工具',
		description: '多平台 Android 玩机工具，覆盖多种权限使用场景',
		keywords: ['ShiroSU Utils', '苏柚', 'SUU'],
		hero: {
			title: '苏柚 / SUU',
			description: '以多权限、多平台和小工具集合覆盖更广泛的 Android 玩机场景，让各场景下的 Android 玩机都能更进一步'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				title: '多权限覆盖',
				description: '普通权限、adb、DeviceOwner、root 与 Xposed 注入都可以驱动部分功能',
				icon: ShieldCog
			},
			{
				title: '存储优化',
				description: '文件整理、清理、重定向，加以碎片整理与脏块回收，让设备存储更清晰',
				icon: DatabaseZap
			},
			{
				title: '小功能集合',
				description: '更多小功能集合更能轻松解乏，也可配合 Windows 版本扩展体验',
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
		title: 'ShiroSU Utils (苏柚)',
		description: projectConfigs.utils.description,
		icon: FolderCog
	}
] satisfies ProjectCard[] as ProjectCard[]

export const content = {
	about: AboutContent,
	security: SecurityContent,
	whyShiroSU: WhyShiroSUContent,
	projectCards,
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
			viewDocs: '查看文档',
			backHome: '返回主页',
			moreTitle: '了解更多',
			whyChoose: '为何选择？'
		}
	}
} satisfies LocaleContent