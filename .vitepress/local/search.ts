/*
 * Copyright (c) YumeYuka 2025.
 */

import type {DefaultTheme} from "vitepress";

export const searchOptions: Partial<DefaultTheme.LocalSearchOptions> = {
    translations: {
        button: {buttonText: "搜索文档", buttonAriaLabel: "搜索文档"},
        modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {selectText: "选择", navigateText: "切换", closeText: "关闭"},
        },
    },
};

