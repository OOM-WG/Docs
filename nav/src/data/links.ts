export type NavLink = {
	title: string
	url: string
	description?: string
	icon: string
}

export type NavGroup = {
	term: string
	links: NavLink[]
}

export type NavSection = {
	taxonomy: string
	slug: string
	description: string
	icon: 'link' | 'code' | 'users'
	list: NavGroup[]
}

export const urlFavicon = (url: string) => `https://favicon.vemetric.com/${url}`

const withIcons = <Type extends { url: string }>(links: Type[]) =>
	links.map(link => ({
		...link,
		icon: urlFavicon(link.url)
	}))

export const navSections = [
	{
		taxonomy: '项目',
		slug: 'projects',
		description: '回忆溢出工作组主导或维护的项目网站与文档',
		icon: 'link',
		list: [
			{
				term: '网站',
				links: withIcons([
					{
						title: 'Latest File',
						url: 'https://latestfile.zip/',
						description: '白彩恋个人项目站'
					},
					{
						title: 'ShiroSU NT WebUI',
						url: 'https://su.shiror.ren/',
						description: 'ShiroSU NT 网页管理器'
					}
				])
			},
			{
				term: '文档',
				links: withIcons([
					{
						title: 'ShiroSU',
						url: 'https://shirosu.gal.tf/',
						description: 'Android root 方案与管理工具'
					},
					{
						title: '苏柚',
						url: 'https://shirosu.gal.tf/utils',
						description: '多平台 Android 玩机工具'
					},
					{
						title: 'YumeBox',
						url: 'https://yumebox.gal.tf/',
						description: '基于 mihomo 内核的开源 Android 客户端'
					}
				])
			}
		]
	},
	{
		taxonomy: '开发',
		slug: 'development',
		description: '各类项目的开发文档',
		icon: 'code',
		list: [
			{
				term: '文档',
				links: withIcons([
					{
						title: 'FVV 语言',
						url: 'https://fvvlang.sbs/',
						description: '多用途语言'
					},
					{
						title: 'NGA 文档',
						url: 'https://app.niggergo.work/',
						description: '多系列开发文档'
					}
				])
			}
		]
	},
	{
		taxonomy: '成员',
		slug: 'members',
		description: '开发组成员的个人主页',
		icon: 'users',
		list: [
			{
				term: '主页',
				links: withIcons([
					{
						title: '枫莹',
						url: 'https://www.fengying.xin/'
					},
					{
						title: '白彩恋',
						url: 'https://shiror.ren/'
					},
					{
						title: '梦璃酱',
						url: 'https://www.yumeyuka.moe/'
					},
					{
						title: 'Linso',
						url: 'https://linso.pro/'
					}
				])
			}
		]
	}
] satisfies NavSection[]

export const orgLinks = withIcons([
	{
		title: 'GitHub',
		url: 'https://github.com/OOM-WG',
		description: '回忆溢出工作组 GitHub 组织'
	},
	{
		title: 'GitCode',
		url: 'https://gitcode.com/OOM-WG',
		description: '回忆溢出工作组 GitCode 组织'
	}
]) satisfies NavLink[]

export const navItems = [
	{
		item: '首页',
		url: '/'
	},
	{
		item: '组织',
		url: 'https://oom-wg.dev/'
	},
	{
		item: '交流',
		url: 'https://oom-wg.dev/join'
	}
] satisfies { item: string; url: string }[]