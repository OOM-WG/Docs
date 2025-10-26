<!--
  - Copyright (c) YumeYuka 2025.
  -->

<!-- .vitepress/theme/MyLayout.vue -->

<script lang="ts" setup>
import {useData} from "vitepress";
import DefaultTheme from "vitepress/theme";
import {nextTick, onMounted, provide, ref} from "vue";

import backtotop from "../components/backtotop.vue";

const {isDark} = useData();

const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
});

const enableTransitions = () =>
    "startViewTransition" in document && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({clientX: x, clientY: y}: MouseEvent) => {
  // 直接切换主题，不使用视图过渡动画以避免与滑动动画冲突
  isDark.value = !isDark.value;
});
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <template #layout-top>
      <slot name="layout-top"></slot>
    </template>
    <template #doc-footer-before>
      <slot name="doc-footer-before"></slot>
      <backtotop/>
    </template>
    <template #nav-bar-content-after>
      <slot name="nav-bar-content-after"></slot>
    </template>
    <template #nav-screen-content-after>
      <slot name="nav-screen-content-after"></slot>
    </template>
    <template #sidebar-nav-before>
      <slot name="sidebar-nav-before"></slot>
    </template>
    <template #sidebar-nav-after>
      <slot name="sidebar-nav-after"></slot>
    </template>
    <template #aside-outline-after>
      <slot name="aside-outline-after"></slot>
    </template>
    <template #aside-top>
      <slot name="aside-top"></slot>
    </template>
    <template #aside-bottom>
      <slot name="aside-bottom"></slot>
    </template>
    <template #aside-outline-before>
      <slot name="aside-outline-before"></slot>
    </template>

    <template #layout-bottom>
      <bsz/>
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 修正因视图过渡导致的按钮图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}
</style>
