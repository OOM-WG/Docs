/*
 * Copyright (c) YumeYuka 2025.
 *
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
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

