import {
	type LucideIcon,
	AppWindow,
	DatabaseZap,
	EyeOff,
	FolderCog,
	Layers,
	PackageOpen,
	Router,
	ShieldCog,
	Link,
	Blocks
} from 'lucide-react'

export type SiteKey = 'main' | 'compat' | 'newtech' | 'utils'

export type SiteFeature = {
	title: string
	description: string
	icon: LucideIcon
}

export type SiteConfig = {
	key: SiteKey
	title: string
	label: string
	shortLabel: string
	hostPrefix?: string
	devPath: string
	description: string
	keywords: string[]
	hero: {
		eyebrow: string
		title: string
		lead: string
	}
	features: SiteFeature[]
}

export type ProjectCard = {
	site: Exclude<SiteKey, 'main'>
	title: string
	description: string
	icon: LucideIcon
}

export type GithubRepo = {
	owner: string
	repo: string
}

export const baseHost = 'shirosu.my.id'

export const projects = ['newtech', 'compat', 'utils'] as const satisfies readonly Exclude<SiteKey, 'main'>[]

export const siteOrder = ['main', 'newtech', 'compat', 'utils'] satisfies readonly SiteKey[] as readonly SiteKey[]

export const siteConfigs = {
	main: {
		key: 'main',
		title: 'SSU',
		label: 'ShiroSU',
		shortLabel: 'SSU',
		devPath: '/',
		description: '致力于 Android 使用体验提升的系列项目',
		keywords: ['ShiroSU', 'SSU', 'Android', 'root', '刷机', '玩机'],
		hero: {
			eyebrow: '助力 Android 使用体验提升',
			title: 'ShiroSU 系列',
			lead: '以系列中各个项目提供更易上手的 root 使用方式或玩机工具，让 Android 玩机体验更完整'
		},
		features: []
	},
	newtech: {
		key: 'newtech',
		title: 'SSU NT',
		label: 'ShiroSU NewTech',
		shortLabel: 'NewTech',
		hostPrefix: 'newtech',
		devPath: '/newtech',
		description: 'ShiroSU 原生 root 实现，兼顾安全性与便利性',
		keywords: ['ShiroSU NewTech', 'SSU NT', 'ShiroSU root', 'SSU root'],
		hero: {
			eyebrow: '原生 root 实现',
			title: 'ShiroSU NewTech',
			lead: '纯用户态低侵入性 root 实现，采用 WebUI 管理结合白名单机制实现高隐蔽性设计'
		},
		features: [
			{
				title: '网页互联',
				description: '通过网页管理器管理 root，前后端分离让局域网互联成为自然能力',
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
		title: 'SSU Compat',
		label: 'ShiroSU Compat',
		shortLabel: 'Compat',
		hostPrefix: 'compat',
		devPath: '/compat',
		description: '兼容多种 root 实现的多功能 root 管理器，便利管理 root 功能',
		keywords: ['ShiroSU Compat', 'SSU Compat', 'ShiroSU 管理器', 'SSU 管理器'],
		hero: {
			eyebrow: '多功能 root 管理器',
			title: 'ShiroSU Compat',
			lead: '面向多种 root 实现提供权能与模块管理，在多种 root 实现间始终保持一致性体验'
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
	utils: {
		key: 'utils',
		title: 'SUU',
		label: '苏柚 / SUU',
		shortLabel: 'SUU',
		hostPrefix: 'utils',
		devPath: '/utils',
		description: '多平台 Android 玩机工具，覆盖多种权限使用场景',
		keywords: ['ShiroSU Utils', '苏柚', 'SUU'],
		hero: {
			eyebrow: '多平台 Android 玩机工具',
			title: '苏柚 / ShiroSU Utils',
			lead: '以多权限、多平台和小工具集合覆盖更广泛的 Android 玩机场景，让各场景下的 Android 玩机都能更进一步'
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
} satisfies Record<SiteKey, SiteConfig> as Record<SiteKey, SiteConfig>

export const projectCards = [
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
		title: 'ShiroSU Utils (苏柚)',
		description: siteConfigs.utils.description,
		icon: FolderCog
	}
] satisfies ProjectCard[] as ProjectCard[]

export const docsLinks = {
	main: 'https://oom-wg.dev/ssu',
	compat: 'https://oom-wg.dev/ssu/compat',
	newtech: 'https://oom-wg.dev/ssu/nt',
	utils: 'https://oom-wg.dev/suu'
} satisfies Record<SiteKey, string> as Record<SiteKey, string>

export const githubRepos = {
	main: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	compat: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	newtech: {
		owner: 'OOM-WG',
		repo: 'ShiroSU'
	},
	utils: {
		owner: 'OOM-WG',
		repo: 'ShiroSU-Utils'
	}
} satisfies Record<SiteKey, GithubRepo> as Record<SiteKey, GithubRepo>