import { GraphView } from '@/components/graph-view'

export default () => (
	<GraphView
		nodes={[
			{ id: 'ssu', text: 'ShiroSU Series', description: 'The overall series', url: '/' },
			{ id: 'ssu-main', text: 'ShiroSU mainline', description: 'Core projects', url: '/' },
			{ id: 'ssu-sub', text: 'ShiroSU supporting line', description: 'Supporting projects', url: '/about' },
			{ id: 'ssu-fyl', text: 'ShiroSU FYL', description: 'Cross-platform multifunction library', url: '/fyl' },
			{ id: 'ssu-nt', text: 'ShiroSU NT', description: 'root solution', url: '/newtech' },
			{ id: 'ssu-compat', text: 'ShiroSU Compat', description: 'Multi-purpose root manager', url: '/compat' },
			{ id: 'suu', text: 'SUU', description: 'Sister project', url: '/utils' },
			{ id: 'ssu-flash', text: 'ShiroSU Flasher', description: 'Web flashing tool', url: '/flasher' },
			{ id: 'ssu-fetch', text: 'ShiroSU Fetcher', description: 'Device information fetcher', url: '/fetcher' },
			{ id: 'ssu-s', text: 'SSUS', description: 'Systemless mounting system', url: '/systemless' },
			{
				id: 'ssu-modbld',
				text: 'ShiroSU Modules Builder',
				description: 'Root module builder',
				url: '/modules-builder'
			},
			{
				id: 'dev',
				text: 'Core maintainers',
				description: 'Core developers in OOM WG',
				url: 'https://oom-wg.dev/developers'
			},
			{ id: 'dev-fy', text: 'FengYing', description: 'AI support', url: 'https://fengying.xin' },
			{
				id: 'dev-shiro',
				text: 'ShIroRRen',
				description: 'Series creator and core maintainer',
				url: 'https://shiror.ren'
			},
			{ id: 'dev-yume', text: 'YumeYuka', description: 'Frontend maintenance', url: 'https://yumeyuka.moe' },
			{ id: 'dev-linso', text: 'Linso', description: 'Valued developer', url: 'https://linso.pro' }
		]}
		links={[
			{ source: 'ssu', target: 'ssu-main' },
			{ source: 'ssu', target: 'ssu-sub' },
			{ source: 'ssu-main', target: 'ssu-fyl' },
			{ source: 'ssu-main', target: 'ssu-nt' },
			{ source: 'ssu-main', target: 'ssu-compat' },
			{ source: 'ssu-main', target: 'suu' },
			{ source: 'ssu-sub', target: 'ssu-flash' },
			{ source: 'ssu-sub', target: 'ssu-fetch' },
			{ source: 'ssu-sub', target: 'ssu-s' },
			{ source: 'ssu-sub', target: 'ssu-modbld' },
			{ source: 'ssu-compat', target: 'ssu-fyl' },
			{ source: 'suu', target: 'ssu-fyl' },
			{ source: 'ssu-nt', target: 'ssu-flash' },
			{ source: 'suu', target: 'ssu-fetch' },
			{ source: 'ssu-nt', target: 'ssu-fetch' },
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