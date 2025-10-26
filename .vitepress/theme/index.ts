/*
 * Copyright (c) YumeYuka 2025.
 */

// .vitepress/theme/index.ts
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import mediumZoom from "medium-zoom";
import {NConfigProvider} from "naive-ui";
import "nprogress-v2/dist/index.css";
import {NProgress} from "nprogress-v2/dist/index.js";
import "virtual:group-icons.css";
import {inBrowser} from "vitepress";
import "vitepress-markdown-timeline/dist/theme/index.css";
import "vitepress-theme-teek/index.css";
import type {Theme} from "vitepress/client";
import {useData, useRoute} from "vitepress/client";
import DefaultTheme from "vitepress/theme-without-fonts";
import {defineComponent, h, inject, nextTick, onMounted, watch} from "vue";

import {setup} from "@css-render/vue3-ssr";
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css";
import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesPlugin,
    NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import {NolebaseGitChangelogPlugin, NolebaseGitContributors} from "@nolebase/vitepress-plugin-git-changelog/client";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
import {NolebaseHighlightTargetedHeading} from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import {NolebaseInlineLinkPreviewPlugin} from "@nolebase/vitepress-plugin-inline-link-preview/client";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";
import {
    NolebasePageProperties,
    NolebasePagePropertiesEditor,
} from "@nolebase/vitepress-plugin-page-properties/client";
import "@nolebase/vitepress-plugin-page-properties/client/style.css";
import {NolebaseUnlazyImg} from "@nolebase/vitepress-plugin-thumbnail-hash/client";
import "@nolebase/vitepress-plugin-thumbnail-hash/client/style.css";
import "@theojs/lumen";

import Downloaded from "./attached/Downloaded.vue";
import MyLayout from "./attached/MyLayout.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";
import ArticleShare from "./components/ArticleShare.vue";
import AsideCommunity from "./components/AsideCommunity.vue";
import Confetti from "./components/Confetti.vue";
import RainbowAnimationSwitcher from "./components/RainbowAnimationSwitcher.vue";
import SakuraLinkCard from "./components/SakuraLinkCard.vue";
import Update from "./components/Update.vue";
import UnderConstructionBanner from "./components/Width.vue";
import WalletApp from "./home/WalletApp.vue";
import Linkcard from "./components/Linkcard.vue";

import "./styles/main.scss";

// 进度条样式

let homePageStyle: HTMLStyleElement | undefined;

// CssRenderStyle 组件：用于 SSR 时注入 css-render 生成的样式。
const CssRenderStyle = defineComponent({
    setup() {
        const collect = inject("css-render-collect") as (() => string) | undefined;
        return {style: collect ? collect() : ""};
    },
    render() {
        return h("css-render-style", {innerHTML: this.style});
    },
});

// VitepressPath 组件：用于 SSR 时输出当前路由路径。
const VitepressPath = defineComponent({
    setup() {
        const route = useRoute();
        return () => h("vitepress-path", null, [route.path]);
    },
});

export default {
    extends: DefaultTheme,

    Layout() {
        return h(
            NConfigProvider,
            {abstract: true, inlineThemeDisabled: true},
            {
                default: () => [
                    // 使用自定义MyLayout
                    h(MyLayout, null, {
                        "layout-top": () => [
                            h(UnderConstructionBanner),
                            // h(
                            //     defineAsyncComponent(
                            //         () => import("./components/Banner.vue"),
                            //     ),
                            // ),
                            h(NolebaseHighlightTargetedHeading),
                            // h(Mouse),
                        ],
                        // "doc-footer-before": () => h(backtotop),
                        // 在导航栏内容后面添加增强可读性菜单
                        "nav-bar-content-after": () => [h(NolebaseEnhancedReadabilitiesMenu)],
                        // 在屏幕导航内容后面添加增强可读性菜单
                        "nav-screen-content-after": () => h(NolebaseEnhancedReadabilitiesScreenMenu),
                        // 在侧边栏导航前面添加鼠标切换
                        // "sidebar-nav-before": () => h(MouseToggle),
                        // 在侧边栏下方添加分享按钮（使用包装组件解决 SSR 问题）
                        // "aside-outline-after": () => h(ArticleShare),

                        // 在布局顶部添加其他组件
                        // "page-top": () => h(Banner),
                        // "aside-top": () => [h(ArticleShare)],
                        "aside-outline-after": () => [h(AsideCommunity), h(ArticleShare)],
                    }),

                    // SSR 相关组件
                    import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
                ],
            }
        );
    },

    enhanceApp({app, router}) {
        if (import.meta.env.SSR) {
            const {collect} = setup(app);
            app.provide("css-render-collect", collect);
        }

        // 注册所有第三方库和插件
        app.use(ElementPlus);
        app.use(NolebaseGitChangelogPlugin);
        app.use(NolebaseInlineLinkPreviewPlugin);
        app.use(NolebaseEnhancedReadabilitiesPlugin, {
            spotlight: {
                defaultToggle: true,
                disableHelp: true,
                defaultStyle: 2,
                hoverBlockColor: "rgb(240 197 52 / 10%)",
            },
        });

        // 注册所有自定义全局组件
        app.component("WalletApp", WalletApp);
        app.component("Linkcard", Linkcard);
        app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
        app.component("Confetti", Confetti);
        app.component("Update", Update);
        app.component("ArticleMetadata", ArticleMetadata);
        app.component("SakuraLinkCard", SakuraLinkCard);
        app.component("Downloaded", Downloaded);
        app.component("NolebaseUnlazyImg", NolebaseUnlazyImg);
        app.component("NolebaseGitContributors", NolebaseGitContributors);
        app.component("NolebasePagePropertiesEditor", NolebasePagePropertiesEditor);
        app.component("NolebasePageProperties", NolebasePageProperties);

        // 客户端逻辑
        if (typeof window !== "undefined") {
            watch(
                () => router.route.data.relativePath,
                () => updateHomePageStyle(location.pathname === "/"),
                {immediate: true}
            );

            // 处理路由变化时的动画重置
            watch(
                () => router.route.path,
                () => {
                    nextTick(() => {
                        window.scrollTo({top: 0, behavior: "auto"});
                    });
                },
                {flush: "post"}
            );

            // 页面进度条与访问统计
            if (inBrowser) {
                NProgress.configure({showSpinner: false});
                router.onBeforeRouteChange = () => {
                    NProgress.start(); // 开始进度条
                };
                router.onAfterRouteChange = () => {
                    NProgress.done(); // 停止进度条
                };
            }
        }
    },

    setup() {
        const route = useRoute();
        const initZoom = () => {
            mediumZoom(".main img", {background: "var(--vp-c-bg)"});
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
        const {frontmatter} = useData();
    },
} satisfies Theme;

function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return;
        homePageStyle = document.createElement("style");
        homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
        document.body.appendChild(homePageStyle);
    } else {
        if (!homePageStyle) return;
        homePageStyle.remove();
        homePageStyle = undefined;
    }
}
