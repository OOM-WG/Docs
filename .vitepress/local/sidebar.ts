/*
 * Copyright (c) YumeYuka 2025.
 *
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
 */

import type {DefaultTheme} from "vitepress";

export const sidebarSsu: DefaultTheme.SidebarItem[] = [
    {
        text: "使用指南",
        items: [
            {
                items: [
                    {text: "什么是 SSU", link: "/base/overview"},
                    {text: "安装指南", link: "/base/install"},
                    {text: "常见问题", link: "/base/faq"}
                ],
            },
        ],
    },
    {
        text: "面向开发者",
        items: [
            {
                items: [
                    {text: "概述", link: "/dev/module/"},
                    {text: "管理器特性开发", link: "/dev/module/manager"},
                    {text: "ConfigUI", link: "/dev/module/cfgui"},
                    {text: "WebUI", link: "/dev/module/webui"},
                    {text: "原生特性开发", link: "/dev/module/root"},
                    {text: "内核接口开发", link: "/dev/module/kernel"},
                    {text: "模块构建工具", link: "/dev/module/builder"},
                    {text: "Scheme 调用", link: "/dev/scheme"}
                ],
            },
        ],
    },
    {
        text: "关于 SSU",
        items: [
            {
                items: [
                    {text: "root 实现适配", link: "/ssu/compat"},
                    {text: "一切的起源", link: "/ssu/origin"},
                    {text: "内核工作原理", link: "/ssu/principle"},
                    {text: "面对质疑", link: "/ssu/defense"},
                    {text: "开发致谢", link: "/ssu/3q"}
                ],
            },
        ],
    },
];

export const sidebarSuu: DefaultTheme.SidebarItem[] = [
    {
        text: "快速开始",
        items: [
            {
                items: [
                    {text: "Android", link: "/start/android"},
                    {text: "Windows", link: "/start/windows"},
                ],
            },
        ],
    },
    {
        text: "功能特性",
        items: [
            {
                items: [
                    {text: "C&C", link: "/feat/android/c&c"},
                    {text: "GBB", link: "/feat/android/gbb"},
                    {text: "Modify My ID", link: "/feat/android/modify.my.id"},
                    {text: "Nyanya", link: "/feat/android/nyanya"},
                    {text: "Toybox", link: "/feat/android/toybox"},
                    {text: "Xposed", link: "/feat/android/xposed"},
                ],
            },
        ],
    },
    {
        text: "附录",
        items: [
            {
                items: [
                    {text: "模式", link: "/appendix/android/mode"},
                    {text: "路径", link: "/appendix/android/path"},
                    {text: "提示", link: "/appendix/android/tip"},
                ],
            },
        ],
    },
    {
        text: "更新日志",
        items: [
            {
                items: [
                    {text: "Android", link: "/changelog/android"},
                    {text: "Windows", link: "/changelog/windows"},
                ],
            },
        ],
    },
    {
        text: "更多",
        items: [
            {
                items: [
                    {text: "用户协议", link: "/more/agreement"},
                    {text: "许可证", link: "/more/license"},
                    {text: "隐私政策", link: "/more/privacy"},
                ],
            },
        ],
    },
];
