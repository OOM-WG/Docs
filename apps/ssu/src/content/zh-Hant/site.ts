import { AppWindow, Blocks, DatabaseZap, EyeOff, FolderCog, Layers, Link, PackageOpen, Router, ShieldCog } from 'lucide-react'

import type { LocaleContent, ProjectCard, SiteConfig, SiteKey } from '../site'
import { about } from './about'

const siteConfigs = {
	main: {
		key: 'main',
		name: 'ShiroSU 系列',
		shortName: 'SSU',
		shortTitle: 'SSU',
		summary: '助力 Android 使用體驗提升',
		description: '致力於 Android 使用體驗提升的系列項目',
		keywords: ['ShiroSU', 'SSU', 'Android', 'root', '刷機', '玩機'],
		hero: {
			description: '以系列中各個項目提供更易上手的 root 使用方式或玩機工具，讓 Android 玩機體驗更完整'
		},
		features: []
	},
	newtech: {
		key: 'newtech',
		name: 'NewTech',
		shortTitle: 'SSU NT',
		summary: '原生 root 實現',
		description: 'ShiroSU 原生 root 實現，兼顧安全性與便利性',
		keywords: ['ShiroSU NewTech', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			description: '純使用者態低侵入性 root 實現，採用 WebUI 管理結合白名單機制實現高隱蔽性設計'
		},
		features: [
			{
				title: '網頁互聯',
				description: '透過網頁管理器管理 root，前後端分離讓區域網互聯成為自然能力',
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
		title: 'ShiroSU Utils (蘇柚)',
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
			about: '關於',
			organization: '組織',
			projects: '項目',
			language: '語言'
		},
		landing: {
			enterPage: '進入頁面',
			viewDocs: '查看文件',
			backHome: '返回主站',
			moreTitle: '了解更多'
		}
	}
} satisfies LocaleContent