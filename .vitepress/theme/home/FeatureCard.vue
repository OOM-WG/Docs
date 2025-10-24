<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div
      :class="[`feature-card-${size}`]"
      class="feature-card"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove">
    <div class="card-border"></div>
    <div class="card-border-highlight"></div>
    <div class="card-content">
      <h3 class="card-title" v-html="title"></h3>
      <p class="card-description">{{ description }}</p>
      <div class="card-image card-image-centered">
        <img :alt="imageAlt" :src="imageSrc"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  size: "small" | "large";
}>();

const emit = defineEmits<{
  (e: "mousemove", event: MouseEvent): void;
  (e: "mouseleave"): void;
}>();

const handleMouseMove = (event: MouseEvent) => {
  emit("mousemove", event);
};

const handleMouseLeave = () => {
  emit("mouseleave");
};
</script>

<style scoped>
.feature-card {
  position: relative;
  padding: 40px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 左侧卡片（大） */
.feature-card-large {
  padding: 40px;
}

/* 右侧卡片（小） */
.feature-card-small {
  padding: 40px;
}

/* 探照灯光晕背景层 - 跟随鼠标的颜色区域 */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(
      300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent),
      color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent) 40%,
      transparent 70%
  );
}

.feature-card:hover .card-border {
  opacity: 1;
}

/* 边框高亮层 - 只在探照灯范围内显示品牌色边框 */
.card-border-highlight {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;

  /* 创建渐变边框：只在探照灯区域内显示品牌色 */
  background: radial-gradient(
      150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      var(--vp-c-brand-1),
      transparent 100%
  );

  /* 使用 mask 只显示边框（内部裁剪掉） */
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.feature-card:hover .card-border-highlight {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
}

.feature-card-large .card-title {
  font-size: 24px;
  margin: 0 0 16px;
}

.card-title :deep(.highlight) {
  color: var(--vp-c-brand-1);
}

.card-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 20px 0;
}

.feature-card-large .card-description {
  font-size: 15px;
  margin: 0 0 32px 0;
}

.card-image {
  margin-top: auto;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 300px;
  flex-shrink: 0;
}

/* 左侧卡片的图片 - 居中显示 */
.card-image-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 0;
  height: 300px;
}

.card-image-centered img {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: contain;
  object-position: center center;
  display: block;
  padding: 0;
}

/* 大卡片的图片 - 放大填充并裁剪 */
.feature-card-large .card-image-centered img {
  object-fit: cover;
  object-position: top center;
}

/* 响应式 */
@media (max-width: 768px) {
  .feature-card {
    padding: 32px 24px;
  }

  .card-image {
    height: 260px;
  }

  .card-image-centered {
    height: 260px;
  }
}
</style>
