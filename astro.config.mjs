import mermaid from 'astro-mermaid'
import {defineConfig} from 'astro/config'
import autoprefixer from 'autoprefixer'
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'

import {rehypeHeadingIds} from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import swup from '@swup/astro'

import {site} from './src/config.json'
import {rehypeCodeBlock} from './src/plugins/rehypeCodeBlock'
import {rehypeCodeHighlight} from './src/plugins/rehypeCodeHighlight'
import {rehypeHeading} from './src/plugins/rehypeHeading'
import {rehypeImage} from './src/plugins/rehypeImage'
import {rehypeLink} from './src/plugins/rehypeLink'
import {rehypeTableBlock} from './src/plugins/rehypeTableBlock'
import {remarkEmbed} from './src/plugins/remarkEmbed'
import {remarkReadingTime} from './src/plugins/remarkReadingTime'
import {remarkSpoiler} from './src/plugins/remarkSpoiler'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	build: {
		format: 'file',
		assets: 'assets'
	},
	site: site.url,
	base: '/',
	redirects: {
		'/posts': '/archives'
	},
	integrations: [
		mermaid({autoTheme: true}),
		tailwind(),
		react(),
		sitemap(),
		swup({
			theme: false,
			animationClass: 'swup-transition-',
			containers: ['main'],
			morph: ['[component-export="Provider"]']
		})
	],
	markdown: {
		syntaxHighlight: false,
		smartypants: false,
		remarkPlugins: [remarkMath, remarkDirective, remarkEmbed, remarkSpoiler, remarkReadingTime],
		rehypePlugins: [
			rehypeHeadingIds,
			rehypeKatex,
			rehypeLink,
			rehypeImage,
			rehypeHeading,
			rehypeCodeBlock,
			rehypeCodeHighlight,
			rehypeTableBlock
		],
		remarkRehype: {footnoteLabel: '参考', footnoteBackLabel: '返回正文'}
	},
	vite: {
		css: {
			postcss: {
				plugins: [autoprefixer()]
			}
		},
		build: {
			assetsInlineLimit: 0,
			rollupOptions: {
				external: ['/pagefind/pagefind.js'],
				output: {
					entryFileNames: 'assets/[name].[hash].js',
					chunkFileNames: 'assets/[name].[hash].js',
					assetFileNames: 'assets/[name].[hash].[ext]'
				}
			}
		}
	}
})
