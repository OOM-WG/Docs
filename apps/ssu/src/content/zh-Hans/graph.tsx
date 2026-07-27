import { GraphView } from '@/components/graph-view'

export default () => (
	<GraphView
		nodes={[
			{ id: 'ssu', text: 'ShiroSU 系列', description: '系列整体', url: '/' },
			{ id: 'ssu-main', text: 'ShiroSU 主线', description: '核心项目', url: '/' },
			{ id: 'ssu-sub', text: 'ShiroSU 支线', description: '子项目', url: '/about' },
			//
			{ id: 'ssu-fyl', text: 'ShiroSU 萦莹恋', description: '跨平台多功能库', url: '/fyl' },
			{ id: 'ssu-nt', text: 'ShiroSU NT', description: 'root 方案', url: '/newtech' },
			{ id: 'ssu-compat', text: 'ShiroSU Compat', description: '多功能 root 管理器', url: '/compat' },
			{ id: 'suu', text: '苏柚', description: '姊妹项目', url: '/utils' },
			//
			{ id: 'ssu-fetch', text: 'ShiroSU Fetcher', description: '设备信息获取工具', url: '/fetcher' },
			{ id: 'ssu-s', text: 'SSUS', description: 'Systemless 挂载系统', url: '/systemless' },
			{
				id: 'ssu-modbld',
				text: 'ShiroSU 模块构建工具',
				description: 'root 模块构建工具',
				url: '/modules-builder'
			},
			//
			{
				id: 'dev',
				text: '核心维护者',
				description: '回忆溢出工作组中的核心开发者',
				url: 'https://oom-wg.dev/developers'
			},
			{ id: 'dev-fy', text: '枫莹', description: 'AI 支持', url: 'https://fengying.xin' },
			{ id: 'dev-shiro', text: '白彩恋', description: '系列主创 & 核心维护', url: 'https://shiror.ren' },
			{ id: 'dev-yume', text: '梦璃酱', description: '前端维护', url: 'https://yumeyuka.moe' },
			{ id: 'dev-linso', text: 'Linso', description: '高价值开发者', url: 'https://linso.pro' }
		]}
		links={[
			{ source: 'ssu', target: 'ssu-main' },
			{ source: 'ssu', target: 'ssu-sub' },
			//
			{ source: 'ssu-main', target: 'ssu-fyl' },
			{ source: 'ssu-main', target: 'ssu-nt' },
			{ source: 'ssu-main', target: 'ssu-compat' },
			{ source: 'ssu-main', target: 'suu' },
			//
			{ source: 'ssu-sub', target: 'ssu-fetch' },
			{ source: 'ssu-sub', target: 'ssu-s' },
			{ source: 'ssu-sub', target: 'ssu-modbld' },
			//
			{ source: 'ssu-compat', target: 'ssu-fyl' },
			{ source: 'suu', target: 'ssu-fyl' },
			{ source: 'suu', target: 'ssu-fetch' },
			{ source: 'ssu-nt', target: 'ssu-fetch' },
			{ source: 'ssu-nt', target: 'suu' },
			//
			{ source: 'dev', target: 'ssu' },
			{ source: 'dev', target: 'dev-fy' },
			{ source: 'dev', target: 'dev-shiro' },
			{ source: 'dev', target: 'dev-yume' },
			{ source: 'dev', target: 'dev-linso' },
			{ source: 'dev-fy', target: 'dev-shiro' }
		]}
		data-nosnippet
	/>
)