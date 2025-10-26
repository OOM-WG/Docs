/*
 * Copyright (c) YumeYuka 2025.
 */

import {createContentLoader} from "vitepress";

interface IconData {
    [url: string]: string;
}

export default createContentLoader("**/*.md", {
    transform(rawData): IconData {
        return rawData.reduce((acc, {url, frontmatter}) => {
            if (frontmatter.icon) {
                // 规范化 URL，移除尾部斜杠和 .html 后缀
                const normalizedUrl = url.replace(/\.html$/, "").replace(/\/$/, "");
                acc[normalizedUrl] = frontmatter.icon as string;
            }
            return acc;
        }, {} as IconData);
    },
});

export {IconData};
