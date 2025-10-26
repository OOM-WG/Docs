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

import Downloaded from "./components/layout/Downloaded.vue";
import MyLayout from "./components/layout/MyLayout.vue";
import ArticleMetadata from "./components/article/ArticleMetadata.vue";
import ArticleShare from "./components/article/ArticleShare.vue";
import Update from "./components/article/Update.vue";
import AsideCommunity from "./components/navigation/AsideCommunity.vue";
import Confetti from "./components/common/Confetti.vue";
import UnderConstructionBanner from "./components/common/Width.vue";
import RainbowAnimationSwitcher from "./components/theme/RainbowAnimationSwitcher.vue";
import Linkcard from "./components/card/Linkcard.vue";
import SakuraLinkCard from "./components/card/SakuraLinkCard.vue";
import WalletApp from "./home/WalletApp.vue";

import "./styles/main.scss";

let homePageStyle: HTMLStyleElement | undefined;

const CssRenderStyle = defineComponent({
    setup() {
        const collect = inject("css-render-collect") as (() => string) | undefined;
        return {style: collect ? collect() : ""};
    },
    render() {
        return h("css-render-style", {innerHTML: this.style});
    },
});

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
                    h(MyLayout, null, {
                        "layout-top": () => [h(UnderConstructionBanner), h(NolebaseHighlightTargetedHeading)],
                        "nav-bar-content-after": () => [h(NolebaseEnhancedReadabilitiesMenu)],
                        "nav-screen-content-after": () => h(NolebaseEnhancedReadabilitiesScreenMenu),
                        "aside-outline-after": () => [h(AsideCommunity), h(ArticleShare)],
                    }),
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

        if (typeof window !== "undefined") {
            watch(
                () => router.route.data.relativePath,
                () => updateHomePageStyle(location.pathname === "/"),
                {immediate: true}
            );

            watch(
                () => router.route.path,
                () => {
                    nextTick(() => {
                        window.scrollTo({top: 0, behavior: "auto"});
                    });
                },
                {flush: "post"}
            );

            if (inBrowser) {
                NProgress.configure({showSpinner: false});
                router.onBeforeRouteChange = () => {
                    NProgress.start();
                };
                router.onAfterRouteChange = () => {
                    NProgress.done();
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
