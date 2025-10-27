/*
 * Copyright (c) YumeYuka 2025.
 *
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
 */

import autoprefixer from "autoprefixer";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vitepress";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";

import { generateBreadcrumbsData } from "@nolebase/vitepress-plugin-breadcrumbs/vitepress";
import { GitChangelog, GitChangelogMarkdownSection } from "@nolebase/vitepress-plugin-git-changelog/vite";
import { PageProperties, PagePropertiesMarkdownSection } from "@nolebase/vitepress-plugin-page-properties/vite";
import { ThumbnailHashImages } from "@nolebase/vitepress-plugin-thumbnail-hash/vite";

import { head } from "./local";
import { markdown } from "./local";
import { themeConfig } from "./local";

export default defineConfig({
	title: "OOM-WG",
	lang: "zh-Hans",
	description: "回忆溢出工作组综合文档",
	lastUpdated: true,
	ignoreDeadLinks: true,
	srcDir: "src",
	outDir: "./dist",
	srcExclude: [],
	scrollOffset: "header",
	cleanUrls: true,
	rewrites: {
		"zh/:rest*": ":rest*",
	},
	metaChunk: true,

	sitemap: {
		hostname: "https://ssu.oom-wg.dev",
	},
	head: head,
	markdown: markdown,
	themeConfig,

	transformPageData(pageData, context) {
		generateBreadcrumbsData(pageData, context);
	},
	vite: {
		css: {
			postcss: {
				plugins: [autoprefixer()],
			},
		},
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
		},
		resolve: {
			alias: [
				{
					find: /^.*\/VPFooter\.vue$/,
					replacement: fileURLToPath(new URL("./theme/components/navigation/Footer.vue", import.meta.url)),
				},
				{
					find: /^.*\/VPHome\.vue$/,
					replacement: fileURLToPath(new URL("./theme/home/WalletApp.vue", import.meta.url)),
				},
				{
					find: /^.*\/VPSidebarItem\.vue$/,
					replacement: fileURLToPath(new URL("./theme/components/navigation/VPSidebarItem.vue", import.meta.url)),
				},
				{
					find: /^.*\/VPSidebarGroup\.vue$/,
					replacement: fileURLToPath(new URL("./theme/components/navigation/VPSidebarGroup.vue", import.meta.url)),
				},
			],
		},
		build: {
			chunkSizeWarningLimit: 2000,
		},
		plugins: [
			groupIconVitePlugin(),
			ThumbnailHashImages(),
			GitChangelog({
                repoURL: () => "https://github.com/OOM-WG/Docs",
				mapAuthors: [
					{
						name: "YumeYuka",
						username: "YumeYuka",
						mapByEmailAliases: ["yumeyuka@oom-wg.dev", "Miao@YumeYuka.plus"],
					},
					{
						name: "白彩恋",
						username: "ShIroRRen",
						mapByEmailAliases: ["shiro@oom-wg.dev"],
					},
					{
						name: "Linso",
						username: "Linso05",
						mapByEmailAliases: ["linso@oom-wg.dev"],
					},
					{
						name: "枫莹",
						username: "FengYing1314",
						mapByEmailAliases: ["fengying@oom-wg.dev"],
					},
					{
						name: "悠栾",
						username: "NuoFang6",
						mapByEmailAliases: ["ark@oom-wg.dev"],
					},
				],
			}),
			GitChangelogMarkdownSection({
				excludes: ["index.md"],
			}),
			PageProperties(),
			PagePropertiesMarkdownSection({
				excludes: ["index.md"],
			}),
			...(process.env.ANALYZE
				? [
						visualizer({
							filename: "dist/stats.html",
							open: true,
							gzipSize: true,
							brotliSize: true,
						}),
				  ]
				: []),
		],
		optimizeDeps: {
			exclude: [
				"@nolebase/vitepress-plugin-enhanced-readabilities",
				"@nolebase/vitepress-plugin-enhanced-readabilities/client",
				"@nolebase/vitepress-plugin-inline-link-preview/client",
				"@nolebase/vitepress-plugin-breadcrumbs/client",
				"@nolebase/vitepress-plugin-git-changelog/client",
				"vitepress",
				"@nolebase/ui",
			],
		},
		ssr: {
			noExternal: [
				"@nolebase/vitepress-plugin-enhanced-readabilities",
				"@nolebase/vitepress-plugin-enhanced-readabilities/client",
				"@nolebase/vitepress-plugin-breadcrumbs/client",
				"@nolebase/vitepress-plugin-inline-link-preview",
				"@nolebase/vitepress-plugin-highlight-targeted-heading",
				"@nolebase/vitepress-plugin-git-changelog/client",
				"vitepress",
				"@nolebase/ui",
				"naive-ui",
				"date-fns",
				"vueuc",
				"vitepress-plugin-nprogress",
			],
		},
	},
});
