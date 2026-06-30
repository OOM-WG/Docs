import type { SiteConfig } from '@/types/config'

const SITE_LANG = 'zh_CN'

export const siteConfig: SiteConfig = {
	title: '回忆篇章',
	subtitle: '回忆溢出工作组在发展中留下的回忆篇章~',
	siteURL: 'https://770414.xyz/',
	siteStartDate: '2023-02-06',

	favicon: [
		{
			src: '/images/logo/oow.ico'
		}
	],

	thirdPartyAnalytics: {
		enable: true,
		clarityId: 'xf0rwudv2r'
	},

	lang: SITE_LANG,

	themeColor: {
		hue: 240,
		fixed: false
	},

	featurePages: {
		anime: false,
		diary: false,
		friends: false,
		projects: false,
		skills: false,
		timeline: false,
		albums: false,
		devices: false,
		aiTools: false
	},

	navbarTitle: {
		mode: 'text-icon',
		text: '回忆篇章',
		icon: 'images/logo/oow.webp',
		logo: 'images/logo/oow.webp'
	},

	pageScaling: { enable: true },

	postListLayout: {
		defaultMode: 'list',
		enable: true,
		allowSwitch: true,
		categoryBar: { enable: true }
	},

	tagStyle: { useNewStyle: true },

	wallpaperMode: {
		defaultMode: 'banner',
		showModeSwitchOnMobile: 'both'
	},

	banner: {
		homeText: {
			enable: true,
			title: '回忆篇章',
			switchable: true,

			subtitle: [
				'特別なことはないけど、君がいると十分です',
				'今でもあなたは私の光',
				'君ってさ、知らないうちに私の毎日になってたよ',
				'君と話すと、なんか毎日がちょっと楽しくなるんだ',
				'今日はなんでもない日。でも、ちょっとだけいい日'
			],
			typewriter: {
				enable: true,

				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000
			}
		},

		src: {
			desktop: [
				'/assets/desktop-banner/1.webp',
				'/assets/desktop-banner/2.webp',
				'/assets/desktop-banner/3.webp',
				'/assets/desktop-banner/4.webp'
			],
			mobile: [
				'/assets/mobile-banner/1.webp',
				'/assets/mobile-banner/2.webp',
				'/assets/mobile-banner/3.webp',
				'/assets/mobile-banner/4.webp'
			]
		},

		position: 'center',

		carousel: {
			enable: true,
			interval: 3,
			switchable: true
		},

		waves: {
			enable: true,
			performanceMode: false,
			mobileDisable: false,
			switchable: true
		},

		credit: {
			enable: false,

			text: 'Describe'
		},

		navbar: {
			transparentMode: 'semifull'
		}
	},
	toc: {
		enable: true,
		mobileTop: true,
		desktopSidebar: true,
		floating: true,
		depth: 2,
		useJapaneseBadge: true
	},
	showCoverInContent: true,
	generateOgImages: false,

	showLastModified: true,
	pageProgressBar: { enable: true },

	card: {
		border: true,
		followTheme: false
	}
}

export { SITE_LANG }