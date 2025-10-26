/*
 * Copyright (c) YumeYuka 2025.
 */

import type {DefaultTheme} from "vitepress";

import {footer} from "./footer";
import {nav} from "./nav";
import {searchOptions} from "./search";
import {sidebarSsu, sidebarSuu} from "./sidebar";

export const themeConfig: DefaultTheme.Config = {
    nav,
    sidebar: {
        "/ssu/": {base: "/ssu/", items: sidebarSsu},
        "/suu/": {base: "/suu/", items: sidebarSuu},
    },

    logo: "oom.webp",
    siteTitle: "OOM-WG",

    socialLinks: [
        {
            icon: "github",
            link: "https://github.com/OOM-WG",
        },
    ],

    search: {provider: "local", options: searchOptions},

    editLink: {
        pattern: "https://github.com/OOM-WG/ShiroSU/edit/nga/docs/src/:path",
        text: "在 GitHub 上编辑此页面",
    },

    docFooter: {prev: "上一页", next: "下一页"},

    outline: {label: "页面导航"},

    lastUpdated: {text: "最后更新于"},

    notFound: {
        title: "页面未找到",
        quote: "抱歉，我们无法找到您要查找的页面。",
        linkLabel: "前往首页",
        linkText: "带我回首页",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",

    customFooter: footer,
};
