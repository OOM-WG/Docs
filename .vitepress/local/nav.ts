/*
 * Copyright (c) YumeYuka 2025.
 */

import type {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
    {
        text: "关于 SSU",
        items: [
            {text: "特色功能", link: "/ssu/base/feats"},
            {text: "开发致谢", link: "/ssu/ssu/3q"},
            {text: "交流反馈", link: "/ssu/https://oom-wg.dev/join"},
        ],
    },
    {
        text: "版本更新",
        items: [
            {text: "历史版本", link: "/ssu/update/history"},
            {text: "更新日志", link: "/ssu/update/changelog"},
        ],
    },
    {text: "文档翻译", link: "/ssu/more/translation"},
];

