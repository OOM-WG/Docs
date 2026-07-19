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
	name: 'ShiroSU 系列',
	shortTitle: 'SSU',
	summary: '助力 Android 使用體驗提升',
	description: '致力於 Android 使用體驗提升的系列項目',
	keywords: ['SakiSU', 'ShiroSU', 'SSU', 'Android', 'root', '刷機', '玩機'],
	hero: {
		description: '以系列中各個項目提供更易上手的 root 使用方式或玩機工具，讓 Android 玩機體驗更完整'
	}
} satisfies MainConfig

const projectConfigs = {
	fyl: {
		key: 'fyl',
		icon: PackageOpen,
		name: '縈瑩戀',
		shortTitle: 'SSU FYL',
		summary: '跨平台多功能開發庫',
		description: '涵蓋各種功能的開發庫，專注於跨平台通用與 Android 深度適配',
		keywords: ['ShiroSU 縈瑩戀', 'SSU FYL', 'FVV', '多語言', 'Android', 'root', 'su'],
		hero: {
			description: '由多種子功能聚合而成的開發庫，專注於跨平台通用與 Android 深度適配'
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
				title: 'FYTxt - 多語言框架',
				description: 'Kotlin 多語言框架，支援全平台並在效能與易用性上有優秀表現'
			}
		]
	},
	newtech: {
		key: 'newtech',
		icon: ShieldCogCorner,
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: '自由互聯的 root 實現',
		description: '以安全性與便利性為先的 root 實現，WebUI 管理方式讓互聯更自由',
		keywords: ['ShiroSU NT', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description: '純使用者態低侵入性 root 實現，採用 WebUI 管理結合白名單機制實現高隱蔽性設計'
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
				title: '網頁互聯',
				description:
					'透過網頁管理器管理 root，前後端分離讓區域網互聯成為自然能力；瀏覽器 PWA 特性可直接將管理器安裝至裝置，易用易更新'
			},
			{
				icon: Blocks,
				title: '完整功能',
				description: '權能管理支援白名單授予 root 與黑名單卸載掛載；模組系統基於 KernelSU 元模組設計實現'
			},
			{
				icon: EyeOff,
				title: '高隱蔽性',
				description: '原生 root 不洩露任何 SELinux 或掛載上下文，並可透過黑名單功能暫時斷連連接埠'
			}
		]
	},
	compat: {
		key: 'compat',
		icon: Grid2x2Plus,
		name: 'Compat',
		shortTitle: 'SSU Compat',
		summary: '多功能 root 管理器',
		description: '相容多種 root 實現的多功能 root 管理器，便利管理 root 功能',
		keywords: ['ShiroSU Compat', 'SSU Compat', 'ShiroSU 管理器', 'SSU 管理器'],
		hero: {
			description: '面向多種 root 實現提供權能與模組管理，在多種 root 實現間始終保持一致性體驗'
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
				title: '多種 root 實現適配',
				description: '相容 Magisk、KernelSU、APatch 等多種 root 實現'
			},
			{
				icon: Layers,
				title: '模組管理',
				description: '支援一鍵處理模組，置頂模組或建立捷徑等便利操作'
			},
			{
				icon: Link,
				title: '更多功能',
				description: '支援 Scheme 關聯、模組資訊拓展等更多功能增強使用體驗'
			}
		]
	},
	utils: {
		key: 'utils',
		icon: FolderCog,
		name: 'Utils (蘇柚)',
		shortTitle: 'SUU',
		summary: '多平台 Android 玩機工具',
		description: '多平台 Android 玩機工具，覆蓋多種權限使用場景',
		keywords: ['ShiroSU Utils', '蘇柚', 'SUU'],
		hero: {
			title: '蘇柚 / SUU',
			description: '以多權限、多平台和小工具集合覆蓋更廣泛的 Android 玩機情境，讓各情境下的 Android 玩機都能更進一步'
		},
		jsonLd: {
			'@type': 'SoftwareApplication',
			applicationCategory: 'UtilitiesApplication',
			operatingSystem: 'Android'
		},
		features: [
			{
				icon: ShieldCog,
				title: '多權限覆蓋',
				description: '一般權限、adb、DeviceOwner、root 與 Xposed 注入都可以驅動部分功能'
			},
			{
				icon: DatabaseZap,
				title: '儲存最佳化',
				description: '檔案整理、清理、重新導向，加以碎片整理與髒塊回收，讓裝置儲存更清晰'
			},
			{
				icon: PackageOpen,
				title: '小功能集合',
				description: '更多小功能集合更能輕鬆解乏，也可配合 Windows 版本擴展體驗'
			}
		]
	},
	flasher: {
		key: 'flasher',
		icon: Usb,
		name: 'Flasher',
		shortTitle: 'SSU Flash',
		summary: '免安裝網頁刷機工具',
		description: '透過 WebUSB 實現的網頁刷機工具，僅需瀏覽器即可即刻刷機！',
		keywords: ['ShiroSU Flasher', 'SSU Flash', 'ShiroSU 網頁刷機', 'SSU 網頁刷機'],
		hero: {
			description: '（開發中）透過 Chromium 內核的 WebUSB 特性連接裝置，在網頁上即可輕鬆刷機！'
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
		summary: '輕量裝置資訊取得工具',
		description: '以 Rust no_std 為核心的裝置資訊取得工具，可透過命令列執行或作為函式庫使用',
		keywords: ['ShiroSU Fetcher', 'SSU Fetch', 'ShiroSU 資訊取得', 'SSU 資訊取得'],
		hero: {
			description: '（開發中）追求輕量、底層的裝置資訊取得工具，專注於展示或偵錯用途'
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
		summary: '高相容通用 systemless 掛載系統',
		description: '基於 bind mount 實現且擁有自身執行階段的 systemless 掛載系統',
		keywords: ['ShiroSU Systemless', 'SSUS', 'ShiroSU 元模組', 'SSU 元模組'],
		hero: {
			description: '擁有自身執行階段的 systemless 掛載系統，動態分區判斷使其具有優秀相容性'
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
		name: '模組建構工具',
		shortTitle: 'SSU Mods Builder',
		summary: '通用 root 模組建構工具',
		description: '支援多種 root 實現特性的模組建構工具',
		keywords: ['ShiroSU 模組', 'SSU 模組', 'root 模組'],
		hero: {
			description: '支援多種 root 實現特性並可與原生編譯語言共同建構的模組建構工具'
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
			title: '關於 ShiroSU 系列',
			description: 'ShiroSU 系列的相關說明（原 SakiSU/SakitinSU）'
		},
		security: {
			title: 'ShiroSU 系列安全聲明',
			description: '有關 ShiroSU 系列的安全性聲明'
		},
		'why-shirosu': {
			title: '為什麼選擇 ShiroSU？',
			description: 'ShiroSU 在 Android root 生態中交出的答卷'
		},
		projects: {
			title: 'ShiroSU 專案列表',
			description: 'ShiroSU 系列中的主線專案與支線專案'
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
			about: '關於',
			security: '安全聲明',
			projects: '專案',
			language: '語言'
		},
		landing: {
			enterPage: '進入頁面',
			viewProjects: '查看專案',
			viewDocs: '查看文件',
			backHome: '返回主頁',
			moreTitle: '了解更多',
			whyChoose: '為何選擇？'
		},
		projects: {
			description: 'ShiroSU 系列由主線專案與支線專案組成，共同覆蓋 Android 玩機的不同情境',
			primaryTitle: '主線專案',
			primaryDescription: 'ShiroSU 系列的核心專案，定義 ShiroSU 核心使用體驗',
			subTitle: '支線專案',
			subDescription: '專注於各類情境能力的專案'
		},
		subproject: {
			moreProjects: '更多專案',
			mainProjects: '主線專案',
			mainProjectsDescription: '查看系列中的核心專案',
			supportingProjects: '支線專案',
			supportingProjectsDescription: '瀏覽其他專注於特定情境的專案'
		},
		breadcrumbs: {
			'/': '系列首頁',
			'/projects': '專案列表',
			'/about': '關於系列',
			'/security': '安全聲明',
			'/why-shirosu': '為何選擇'
		}
	}
} satisfies LocaleContent