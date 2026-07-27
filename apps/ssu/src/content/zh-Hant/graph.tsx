import { GraphView } from '@/components/graph-view'

export default () => (
	<GraphView
		nodes={[
			{ id: 'ssu', text: 'ShiroSU 系列', description: '系列整體', url: '/' },
			{ id: 'ssu-main', text: 'ShiroSU 主線', description: '核心專案', url: '/' },
			{ id: 'ssu-sub', text: 'ShiroSU 支線', description: '子專案', url: '/about' },
			{ id: 'ssu-fyl', text: 'ShiroSU 縈瑩戀', description: '跨平台多功能庫', url: '/fyl' },
			{ id: 'ssu-nt', text: 'ShiroSU NT', description: 'root 解決方案', url: '/newtech' },
			{ id: 'ssu-compat', text: 'ShiroSU Compat', description: '多功能 root 管理器', url: '/compat' },
			{ id: 'suu', text: '蘇柚', description: '姊妹專案', url: '/utils' },
			{ id: 'ssu-fetch', text: 'ShiroSU Fetcher', description: '裝置資訊取得工具', url: '/fetcher' },
			{ id: 'ssu-s', text: 'SSUS', description: 'Systemless 掛載系統', url: '/systemless' },
			{
				id: 'ssu-modbld',
				text: 'ShiroSU 模組建構工具',
				description: 'root 模組建構工具',
				url: '/modules-builder'
			},
			{
				id: 'dev',
				text: '核心維護者',
				description: '回憶溢出工作組中的核心開發者',
				url: 'https://oom-wg.dev/developers'
			},
			{ id: 'dev-fy', text: '楓瑩', description: 'AI 支援', url: 'https://fengying.xin' },
			{ id: 'dev-shiro', text: '白彩戀', description: '系列主創與核心維護', url: 'https://shiror.ren' },
			{ id: 'dev-yume', text: '夢璃醬', description: '前端維護', url: 'https://yumeyuka.moe' },
			{ id: 'dev-linso', text: 'Linso', description: '高價值開發者', url: 'https://linso.pro' }
		]}
		links={[
			{ source: 'ssu', target: 'ssu-main' },
			{ source: 'ssu', target: 'ssu-sub' },
			{ source: 'ssu-main', target: 'ssu-fyl' },
			{ source: 'ssu-main', target: 'ssu-nt' },
			{ source: 'ssu-main', target: 'ssu-compat' },
			{ source: 'ssu-main', target: 'suu' },
			{ source: 'ssu-sub', target: 'ssu-fetch' },
			{ source: 'ssu-sub', target: 'ssu-s' },
			{ source: 'ssu-sub', target: 'ssu-modbld' },
			{ source: 'ssu-compat', target: 'ssu-fyl' },
			{ source: 'suu', target: 'ssu-fyl' },
			{ source: 'suu', target: 'ssu-fetch' },
			{ source: 'ssu-nt', target: 'ssu-fetch' },
			{ source: 'ssu-nt', target: 'suu' },
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