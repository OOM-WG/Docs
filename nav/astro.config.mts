import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robots from 'astro-robots'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://200ok.work',
	build: { assets: '_200ok' },
	integrations: [
		react(),
		sitemap(),
		robots({
			policy: [{ userAgent: '*', allow: '/' }],
			host: '200ok.work'
		})
	],
	vite: {
		plugins: [tailwindcss()],
		server: { fs: { allow: ['..'] } }
	}
})