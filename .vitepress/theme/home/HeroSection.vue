<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div class="hero-section">
    <h1 class="hero-title">回忆溢出工作组 · 综合文档</h1>
    <div class="hero-description">
      <p>我们致力于以精炼与专业的方式，呈现最优质的内容。</p>
      <p>本文档将简要介绍工作组所开展的主要项目。</p>
    </div>

    <!-- CTA 按钮组 -->
    <div class="cta-group">
      <a class="cta-primary" href="/base">
        开始阅读
        <svg class="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
          <path
              clip-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              fill-rule="evenodd"/>
        </svg>
      </a>
      <a class="cta-secondary" href="https://github.com/OOM-WG" rel="noopener" target="_blank">
        <svg class="github-icon" fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub 上的项目
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 主标题区域 */
.hero-section {
  text-align: center;
  margin-bottom: 100px;
  padding-top: 200px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 24px;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 auto 40px;
  max-width: 700px;
}

.hero-description p {
  margin: 8px 0;
}

/* CTA 按钮组 */
.cta-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: #000;
  color: #fff;
  border-radius: 50px;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
}

.cta-primary:hover {
  opacity: 0.85;
}

.arrow-icon {
  width: 18px;
  height: 18px;
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50px;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
}

.cta-secondary:hover {
  background: var(--vp-c-bg-soft);
}

.github-icon {
  width: 18px;
  height: 18px;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-section {
    margin-bottom: 60px;
    padding-top: 140px;
  }

  .hero-description {
    font-size: 16px;
  }

  .cta-group {
    flex-direction: row;
    gap: 10px;
  }

  .cta-primary,
  .cta-secondary {
    flex: 1;
    justify-content: center;
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>

