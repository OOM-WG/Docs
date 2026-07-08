import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://200ok.work',
	build: { assets: '_200ok' },
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		server: { fs: { allow: ['..'] } }
	}
})