<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div class="features-section">
    <div class="features-grid">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";

// 全局鼠标位置
const globalMouseX = ref<number>(0);
const globalMouseY = ref<number>(0);
const SPOTLIGHT_RADIUS = 200; // 探照灯半径（像素）

// 存储所有卡片的引用
const cardRefs = ref<Set<HTMLElement>>(new Set());

// 计算点到矩形的最短距离
const getDistanceToRect = (mouseX: number, mouseY: number, rect: DOMRect): number => {
  // 如果鼠标在矩形内部，距离为 0
  if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
    return 0;
  }

  // 计算到最近边缘的距离
  const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
  const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);

  return Math.sqrt(dx * dx + dy * dy);
};

// 更新卡片光晕效果（接受鼠标坐标）
const updateCardSpotlight = (card: HTMLElement, mouseX: number, mouseY: number) => {
  const rect = card.getBoundingClientRect();
  const x = mouseX - rect.left;
  const y = mouseY - rect.top;

  // 计算百分比位置
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  card.style.setProperty("--mouse-x", `${xPercent}%`);
  card.style.setProperty("--mouse-y", `${yPercent}%`);
};

// 更新所有卡片 - 检查探照灯范围
const updateAllCards = (mouseX: number, mouseY: number) => {
  cardRefs.value.forEach((card) => {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const distance = getDistanceToRect(mouseX, mouseY, rect);

    // 如果卡片在探照灯范围内
    if (distance <= SPOTLIGHT_RADIUS) {
      updateCardSpotlight(card, mouseX, mouseY);

      // 显示效果
      const border = card.querySelector(".card-border") as HTMLElement;
      const borderHighlight = card.querySelector(".card-border-highlight") as HTMLElement;
      if (border) border.style.opacity = "1";
      if (borderHighlight) borderHighlight.style.opacity = "1";
    } else {
      // 隐藏效果
      const border = card.querySelector(".card-border") as HTMLElement;
      const borderHighlight = card.querySelector(".card-border-highlight") as HTMLElement;
      if (border) border.style.opacity = "0";
      if (borderHighlight) borderHighlight.style.opacity = "0";
    }
  });
};

// 卡片鼠标移动处理
const handleCardMouseMove = (e: MouseEvent) => {
  globalMouseX.value = e.clientX;
  globalMouseY.value = e.clientY;
  updateAllCards(e.clientX, e.clientY);
};

// 卡片鼠标离开处理
const handleCardMouseLeave = () => {
  // 不立即隐藏，让全局鼠标移动来处理
};

// 滚动处理 - 使用全局鼠标位置更新所有卡片
const handleScroll = () => {
  updateAllCards(globalMouseX.value, globalMouseY.value);
};

// 全局鼠标移动 - 持续追踪鼠标位置并更新所有卡片
const handleGlobalMouseMove = (e: MouseEvent) => {
  globalMouseX.value = e.clientX;
  globalMouseY.value = e.clientY;
  updateAllCards(e.clientX, e.clientY);
};

// 使用 requestAnimationFrame 优化滚动性能
let scrollTicking = false;
const onScroll = () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      handleScroll();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
};

// 注册卡片
const registerCard = (card: HTMLElement) => {
  cardRefs.value.add(card);
};

// 组件挂载后收集所有卡片引用
onMounted(() => {
  // 收集所有 .feature-card 和 .author-card 元素
  const cards = document.querySelectorAll(".feature-card, .author-card");
  cards.forEach((card) => {
    if (card instanceof HTMLElement) {
      registerCard(card);
    }
  });

  window.addEventListener("scroll", onScroll, {passive: true});
  window.addEventListener("mousemove", handleGlobalMouseMove, {passive: true});
});

// 组件卸载时移除监听
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("mousemove", handleGlobalMouseMove);
  cardRefs.value.clear();
});

// 暴露方法供子组件使用
defineExpose({
  handleCardMouseMove,
  handleCardMouseLeave,
});
</script>

<style scoped>
/* 特性卡片区域 */
.features-section {
  margin-bottom: 120px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4等分列 */
  grid-auto-rows: auto; /* 每行根据内容自适应高度 */
  gap: 24px;
  align-items: stretch;
}

/* 第一排正常 - card1（小）在左，card2（大）在右 */
.features-grid :deep(.feature-card:nth-child(1)) {
  grid-column: 1 / 2; /* card1（小）占第1列（1/4宽度） */
  grid-row: 1;
}

.features-grid :deep(.feature-card:nth-child(2)) {
  grid-column: 2 / 5; /* card2（大）占第2-4列（3/4宽度） */
  grid-row: 1;
}

/* 第二排反转 - card3（大）在左，card4（小）在右 */
.features-grid :deep(.feature-card:nth-child(3)) {
  grid-column: 1 / 4; /* card3（大）占第1-3列（3/4宽度） */
  grid-row: 2;
}

.features-grid :deep(.feature-card:nth-child(4)) {
  grid-column: 4 / 5; /* card4（小）占第4列（1/4宽度） */
  grid-row: 2;
}

/* 作者卡片 - 占据整行 */
.features-grid :deep(.author-card) {
  grid-column: 1 / 5; /* 占据所有4列 */
  grid-row: 3; /* 第3行 */
  align-self: start; /* 不拉伸到行高，根据内容自适应 */
}

/* 响应式 */
@media (max-width: 768px) {
  .features-section {
    margin-bottom: 80px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* 移动端重置 grid 位置 - 让卡片垂直排列 */
  .features-grid :deep(.feature-card:nth-child(1)),
  .features-grid :deep(.feature-card:nth-child(2)),
  .features-grid :deep(.feature-card:nth-child(3)),
  .features-grid :deep(.feature-card:nth-child(4)) {
    grid-column: 1;
    grid-row: auto;
  }

  /* 移动端作者卡片重置 */
  .features-grid :deep(.author-card) {
    grid-column: 1;
    grid-row: auto;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1025px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
