<!--
  - Copyright (c) YumeYuka 2025.
  -->

<script lang="ts" setup>
import type {DefaultTheme} from "vitepress/theme";
import {onBeforeUnmount, onMounted, ref} from "vue";
import VPSidebarItem from "./VPSidebarItem.vue";

defineProps<{
  items: DefaultTheme.SidebarItem[];
}>();

const disableTransition = ref(true);

let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  timer = setTimeout(() => {
    timer = null;
    disableTransition.value = false;
  }, 300);
});

onBeforeUnmount(() => {
  if (timer != null) {
    clearTimeout(timer);
    timer = null;
  }
});
</script>

<template>
  <div v-for="item in items" :key="item.text" :class="{ 'no-transition': disableTransition }" class="group">
    <VPSidebarItem :depth="0" :item/>
  </div>
</template>

<style scoped>
.no-transition :deep(.caret-icon) {
  transition: none;
}

/* 移除分组间的 border 和额外的 padding */
.group + .group {
  border-top: none;
  padding-top: 0;
}

@media (min-width: 960px) {
  .group {
    padding-top: 10px;
    width: calc(var(--vp-sidebar-width) - 64px);
  }

  /* 第一个分组不需要上边距 */
  .group:first-child {
    padding-top: 0;
  }
}
</style>
