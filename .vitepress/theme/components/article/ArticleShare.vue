<!--
  - Copyright (c) YumeYuka 2025.
  -->

<script lang="ts" setup>
import {computed, nextTick, onUnmounted, ref} from "vue";

const props = defineProps({
  shareText: {
    type: String,
    default: "分享链接",
  },
  copiedText: {
    type: String,
    default: "已复制!",
  },
  includeQuery: {
    type: Boolean,
    default: false,
  },
  includeHash: {
    type: Boolean,
    default: false,
  },
  copiedTimeout: {
    type: Number,
    default: 2000,
    validator: (value: number) => value > 0 && value <= 10000,
  },
});

defineOptions({name: "ArticleShare"});

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | null = null;
const isClient = typeof window !== "undefined" && typeof document !== "undefined";

const shareLink = computed(() => {
  if (!isClient) return "";

  try {
    const {origin, pathname, search, hash} = window.location;
    const finalSearch = props.includeQuery ? search : "";
    const finalHash = props.includeHash ? hash : "";
    return `${origin}${pathname}${finalSearch}${finalHash}`;
  } catch (error) {
    console.warn("获取分享链接失败:", error);
    return "";
  }
});

const clearCopiedTimer = () => {
  if (copiedTimer) {
    clearTimeout(copiedTimer);
    copiedTimer = null;
  }
};

async function copyToClipboard() {
  if (copied.value || !isClient || !shareLink.value) return;

  clearCopiedTimer();

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareLink.value);
    } else {
      await fallbackCopyToClipboard(shareLink.value);
    }

    copied.value = true;
    await nextTick();

    copiedTimer = setTimeout(() => {
      copied.value = false;
      copiedTimer = null;
    }, props.copiedTimeout);
  } catch (error) {
    console.error("复制链接失败:", error);
  }
}

async function fallbackCopyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement("input");
      input.style.position = "fixed";
      input.style.opacity = "0";
      input.style.left = "-9999px";
      input.setAttribute("readonly", "readonly");
      input.value = text;

      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);

      const success = document.execCommand("copy");
      document.body.removeChild(input);

      if (success) {
        resolve();
      } else {
        reject(new Error("execCommand failed"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

onUnmounted(() => {
  clearCopiedTimer();
});

const shareIconSvg = computed(
    () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
`
);

const copiedIconSvg = computed(
    () => `
  <svg xmlns="http://www.w3.2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`
);
</script>

<template>
  <div class="article-share">
    <button
        :aria-label="copied ? props.copiedText : props.shareText"
        :class="['article-share__button', { copied: copied }]"
        :disabled="!shareLink"
        aria-live="polite"
        @click="copyToClipboard">
      <div v-if="!copied" class="content-wrapper">
        <span class="icon" v-html="shareIconSvg"></span>
        {{ props.shareText }}
      </div>

      <div v-else class="content-wrapper">
        <span class="icon" v-html="copiedIconSvg"></span>
        {{ props.copiedText }}
      </div>
    </button>
  </div>
</template>

<style scoped>
.article-share {
  padding: 14px 0;
}

.article-share__button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  z-index: 1;
  transition: all 0.4s var(--ease-out-cubic, cubic-bezier(0.33, 1, 0.68, 1));
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 7px 14px;
  width: 100%;
  overflow: hidden;
  color: var(--vp-c-text-1, #333);
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  will-change: transform, box-shadow;
}

.article-share__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.article-share__button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  z-index: -1;
  transition: left 0.6s ease;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
  width: 100%;
  height: 100%;
}

.article-share__button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-soft, #ddf4ff);
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button:active:not(:disabled) {
  transform: scale(0.95);
  transition-duration: 0.1s;
}

.article-share__button.copied {
  color: var(--vp-c-brand-1, #007acc);
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.article-share__button.copied::before {
  left: 0;
  background-color: var(--vp-c-brand-soft, #ddf4ff);
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1.2em;
}

.icon {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  flex-shrink: 0;
}

.icon svg {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .article-share__button {
    transition: none;
  }

  .article-share__button::before {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .article-share__button {
    border: 2px solid;
  }
}
</style>
