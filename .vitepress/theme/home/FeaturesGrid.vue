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

const globalMouseX = ref<number>(0);
const globalMouseY = ref<number>(0);
const SPOTLIGHT_RADIUS = 200;
const cardRefs = ref<Set<HTMLElement>>(new Set());

const getDistanceToRect = (mouseX: number, mouseY: number, rect: DOMRect): number => {
  if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
    return 0;
  }

  const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
  const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);

  return Math.sqrt(dx * dx + dy * dy);
};

const updateCardSpotlight = (card: HTMLElement, mouseX: number, mouseY: number) => {
  const rect = card.getBoundingClientRect();
  const x = mouseX - rect.left;
  const y = mouseY - rect.top;
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  card.style.setProperty("--mouse-x", `${xPercent}%`);
  card.style.setProperty("--mouse-y", `${yPercent}%`);
};

const updateAllCards = (mouseX: number, mouseY: number) => {
  cardRefs.value.forEach((card) => {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const distance = getDistanceToRect(mouseX, mouseY, rect);

    if (distance <= SPOTLIGHT_RADIUS) {
      updateCardSpotlight(card, mouseX, mouseY);

      const border = card.querySelector(".card-border") as HTMLElement;
      const borderHighlight = card.querySelector(".card-border-highlight") as HTMLElement;
      if (border) border.style.opacity = "1";
      if (borderHighlight) borderHighlight.style.opacity = "1";
    } else {
      const border = card.querySelector(".card-border") as HTMLElement;
      const borderHighlight = card.querySelector(".card-border-highlight") as HTMLElement;
      if (border) border.style.opacity = "0";
      if (borderHighlight) borderHighlight.style.opacity = "0";
    }
  });
};

const handleCardMouseMove = (e: MouseEvent) => {
  globalMouseX.value = e.clientX;
  globalMouseY.value = e.clientY;
  updateAllCards(e.clientX, e.clientY);
};

const handleCardMouseLeave = () => {
};

const handleScroll = () => {
  updateAllCards(globalMouseX.value, globalMouseY.value);
};

const handleGlobalMouseMove = (e: MouseEvent) => {
  globalMouseX.value = e.clientX;
  globalMouseY.value = e.clientY;
  updateAllCards(e.clientX, e.clientY);
};

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

const registerCard = (card: HTMLElement) => {
  cardRefs.value.add(card);
};

onMounted(() => {
  const cards = document.querySelectorAll(".feature-card, .author-card");
  cards.forEach((card) => {
    if (card instanceof HTMLElement) {
      registerCard(card);
    }
  });

  window.addEventListener("scroll", onScroll, {passive: true});
  window.addEventListener("mousemove", handleGlobalMouseMove, {passive: true});
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("mousemove", handleGlobalMouseMove);
  cardRefs.value.clear();
});

defineExpose({
  handleCardMouseMove,
  handleCardMouseLeave,
});
</script>

<style scoped>
.features-section {
  margin-bottom: 120px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 24px;
  align-items: stretch;
}

.features-grid :deep(.feature-card:nth-child(1)) {
  grid-column: 1 / 2;
  grid-row: 1;
}

.features-grid :deep(.feature-card:nth-child(2)) {
  grid-column: 2 / 5;
  grid-row: 1;
}

.features-grid :deep(.feature-card:nth-child(3)) {
  grid-column: 1 / 4;
  grid-row: 2;
}

.features-grid :deep(.feature-card:nth-child(4)) {
  grid-column: 4 / 5;
  grid-row: 2;
}

.features-grid :deep(.author-card) {
  grid-column: 1 / 5;
  grid-row: 3;
  align-self: start;
}

@media (max-width: 768px) {
  .features-section {
    margin-bottom: 80px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .features-grid :deep(.feature-card:nth-child(1)),
  .features-grid :deep(.feature-card:nth-child(2)),
  .features-grid :deep(.feature-card:nth-child(3)),
  .features-grid :deep(.feature-card:nth-child(4)) {
    grid-column: 1;
    grid-row: auto;
  }

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
