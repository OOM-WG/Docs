<!--
  - Copyright (c) YumeYuka 2025.
  -->

<script lang="ts" setup>
import {useData} from "vitepress";
import {computed, onMounted, ref} from "vue";

import {countWord} from "../utils/functions";

const {page} = useData();
const date = computed(() => new Date(page.value.lastUpdated!));

const wordCount = ref(0);
const imageCount = ref(0);

const wordTime = computed(() => {
  return (wordCount.value / 275) * 60;
});

const imageTime = computed(() => {
  const n = imageCount.value;
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2;
  }
  return 175 + (n - 10) * 3;
});

// 阅读时间
const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60);
});

function analyze() {
  document.querySelectorAll(".meta-des").forEach((v) => v.remove());
  const docDomContainer = window.document.querySelector("#VPContent");
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(".content-container .main img");
  imageCount.value = imgs?.length || 0;
  const words = docDomContainer?.querySelector(".content-container .main")?.textContent || "";
  wordCount.value = countWord(words);
}

onMounted(() => {
  // 初始化时执行一次
  analyze();
});
</script>

<template>
  <div class="article-metadata">
    <div class="metadata-content">
      <!-- 左侧：字数和时长 -->
      <div class="metadata-left">
				<span class="metadata-item">
					<svg
              class="icon"
              fill="none"
              height="16"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg">
						<path d="M13 21h8"/>
						<path
                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
					</svg>
					字数: {{ wordCount }} 字
				</span>
        <span class="metadata-item">
					<svg
              class="icon"
              height="16"
              p-id="15031"
              t="1724572797268"
              version="1.1"
              viewBox="0 0 1060 1024"
              width="16"
              xmlns="http://www.w3.org/2000/svg">
						<path
                d="M556.726857 0.256A493.933714 493.933714 0 0 0 121.929143 258.998857L0 135.021714v350.390857h344.649143L196.205714 334.482286a406.820571 406.820571 0 1 1-15.908571 312.649143H68.937143A505.819429 505.819429 0 1 0 556.726857 0.256z m-79.542857 269.531429v274.907428l249.197714 150.966857 42.422857-70.070857-212.114285-129.389714V269.787429h-79.542857z"
                fill="#8a8a8a"
                p-id="15032"></path>
					</svg>
					时长: {{ readTime }} 分钟
				</span>
      </div>

      <!-- 右侧：更新时间 -->
      <div class="metadata-right">
				<span class="metadata-item">
					<svg
              class="icon"
              height="16"
              p-id="18131"
              t="1724572866572"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="16"
              xmlns="http://www.w3.org/2000/svg">
						<path
                d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z"
                fill="#8a8a8a"
                p-id="18132"></path>
					</svg>
					更新: {{ date.toLocaleDateString() }}
				</span>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="metadata-divider"></div>
  </div>
</template>

<style scoped>
.article-metadata {
  margin-top: 24px;
  margin-bottom: 24px;
}

.metadata-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
  padding: 8px 0;
  flex-wrap: wrap;
  gap: 12px;
}

.metadata-left {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.metadata-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.metadata-divider {
  width: 100%;
  height: 1px;
  background: var(--vp-c-divider);
  margin-top: 8px;
}

/* 响应式：移动端垂直排列 */
@media (max-width: 768px) {
  .metadata-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .metadata-right {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
