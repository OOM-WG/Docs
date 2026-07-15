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
	summary: '助力 Android 使用體驗提升',
	description: '致力於 Android 使用體驗提升的系列項目',
	keywords: ['ShiroSU', 'SSU', 'Android', 'root', '刷機', '玩機'],
	hero: {
		description: '以系列中各個項目提供更易上手的 root 使用方式或玩機工具，讓 Android 玩機體驗更完整'
	}
} satisfies MainConfig

const projectConfigs = {
	newtech: {
		key: 'newtech',
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: '自由互聯的 root 實現',
		description: '以安全性與便利性為先的 root 實現，WebUI 管理方式讓互聯更自由',
		keywords: ['ShiroSU NewTech', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description: '純使用者態低侵入性 root 實現，採用 WebUI 管理結合白名單機制實現高隱蔽性設計'
		},
		jsonLd: {
			type: 'WebApplication',
			applicationCategory: 'SecurityApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				title: '網頁互聯',
				description:
					'透過網頁管理器管理 root，前後端分離讓區域網互聯成為自然能力；瀏覽器 PWA 特性可直接將網頁安裝至裝置，易用易更新',
				icon: AppWindow
			},
			{
				title: '完整功能',
				description: '權能管理支援白名單授予 root 與黑名單卸載掛載；模組系統基於 KernelSU 元模組設計實現',
				icon: Blocks
			},
			{
				title: '高隱蔽性',
				description: '原生 root 不洩露任何 SELinux 或掛載上下文，並可透過黑名單功能暫時斷連連接埠',
				icon: EyeOff
			}
		]
	},
	compat: {
		key: 'compat',
		name: 'Compat',
		shortTitle: 'SSU Compat',
		summary: '多功能 root 管理器',
		description: '相容多種 root 實現的多功能 root 管理器，便利管理 root 功能',
		keywords: ['ShiroSU Compat', 'SSU Compat', 'ShiroSU 管理器', 'SSU 管理器'],
		hero: {
			description: '面向多種 root 實現提供權能與模組管理，在多種 root 實現間始終保持一致性體驗'
		},
		jsonLd: {
			type: 'SoftwareApplication',
			applicationCategory: 'SecurityApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				title: '多種 root 實現適配',
				description: '相容 Magisk、KernelSU、APatch 等多種 root 實現',
				icon: ShieldCog
			},
			{
				title: '模組管理',
				description: '支援一鍵處理模組，置頂模組或建立捷徑等便利操作',
				icon: Layers
			},
			{
				title: '更多功能',
				description: '支援 Scheme 關聯、模組資訊拓展等更多功能增強使用體驗',
				icon: Link
			}
		]
	},
	flasher: {
		key: 'flasher',
		name: 'Flasher',
		shortTitle: 'SSU Flash',
		summary: '免安裝網頁刷機工具',
		description: '透過 WebUSB 實現的網頁刷機工具，僅需瀏覽器即可即刻刷機！',
		keywords: ['ShiroSU Flasher', 'SSU Flash', 'ShiroSU 網頁刷機', 'SSU 網頁刷機'],
		hero: {
			description: '（開發中）透過 Chromium 內核的 WebUSB 特性連接裝置，在網頁上即可輕鬆刷機！'
		},
		features: [
			{
				title: 'WebUSB 連線',
				description: '無需在本機安裝 adb 或 fastboot 程式，透過瀏覽器即可連接裝置（仍需安裝驅動程式）',
				icon: Usb
			},
			{
				title: '豐富功能',
				description: '可透過 adb 或 fastboot 連接裝置，支援解鎖、刷機等常用功能',
				icon: Toolbox
			},
			{
				title: '易用網頁',
				description: '瀏覽器 PWA 特性可直接將網頁安裝至裝置，易用易更新',
				icon: AppWindow
			}
		]
	},
	fetcher: {
		key: 'fetcher',
		name: 'Fetcher',
		shortTitle: 'SSU Fetch',
		summary: '輕量裝置資訊取得工具',
		description: '以 Rust no_std 為核心的裝置資訊取得工具，可透過命令列執行或作為函式庫使用',
		keywords: ['ShiroSU Fetcher', 'SSU Fetch', 'ShiroSU 資訊取得', 'SSU 資訊取得'],
		hero: {
			description: '（開發中）追求輕量、底層的裝置資訊取得工具，專注於展示或偵錯用途'
		},
		features: [
			{
				title: '輕量與效能',
				description: '核心程式碼採用 Rust no_std 編寫，讓體積更輕量、執行更有效能',
				icon: Gauge
			},
			{
				title: '多平台適配',
				description: '針對各個平台力所能及地取得資訊，也有對 Android 進行深度適配',
				icon: MonitorSmartphone
			},
			{
				title: '多用途',
				description: '支援日常透過命令列展示資訊，也可作為函式庫在必要時收集偵錯資訊',
				icon: Wrench
			}
		]
	},
	library: {
		key: 'library',
		name: 'Library',
		shortTitle: 'SSU Lib',
		summary: 'root 接入封裝庫',
		description: '主要針對 root 實現的封裝庫，簡化部分接入流程',
		keywords: ['ShiroSU Library', 'SSU Lib'],
		hero: {
			description: '（開發中）Android Kotlin 函式庫，專注於 root 接入封裝'
		},
		features: []
	},
	utils: {
		key: 'utils',
		name: 'Utils (蘇柚)',
		shortName: 'SUU',
		shortTitle: 'SUU',
		summary: '多平台 Android 玩機工具',
		description: '多平台 Android 玩機工具，覆蓋多種權限使用場景',
		keywords: ['ShiroSU Utils', '蘇柚', 'SUU'],
		hero: {
			title: '蘇柚 / SUU',
			description: '以多權限、多平台和小工具集合覆蓋更廣泛的 Android 玩機場景，讓各場景下的 Android 玩機都能更進一步'
		},
		jsonLd: {
			type: 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				title: '多權限覆蓋',
				description: '一般權限、adb、DeviceOwner、root 與 Xposed 注入都可以驅動部分功能',
				icon: ShieldCog
			},
			{
				title: '儲存最佳化',
				description: '檔案整理、清理、重新導向，加以碎片整理與髒塊回收，讓裝置儲存更清晰',
				icon: DatabaseZap
			},
			{
				title: '小功能集合',
				description: '更多小功能集合更能輕鬆解乏，也可配合 Windows 版本擴展體驗',
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
		title: 'ShiroSU Utils (蘇柚)',
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
			about: '關於',
			security: '安全聲明',
			projects: '項目',
			language: '語言'
		},
		landing: {
			enterPage: '進入頁面',
			viewDocs: '查看文件',
			backHome: '返回主頁',
			moreTitle: '了解更多',
			whyChoose: '為何選擇？'
		}
	}
} satisfies LocaleContent