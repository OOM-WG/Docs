<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div class="aside-community">
    <h3 class="community-title">更多</h3>
    <nav class="community-links">
      <a class="community-link" href="https://oom-wg.dev/" rel="noopener" target="_blank">
        <svg
            class="link-icon"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>
        <span class="link-text">回忆溢出工作组</span>
        <svg class="external-link-icon" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"/>
        </svg>
      </a>
      <a class="community-link" href="https://oom-wg.dev/join" rel="noopener" target="_blank">
        <svg
            class="link-icon"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
        <span class="link-text">加入我们</span>
        <svg class="external-link-icon" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"/>
        </svg>
      </a>
    </nav>
  </div>
</template>

<style scoped>
.aside-community {
  padding: 0;
  margin-top: 28px;
}

.community-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
  padding: 0;
  letter-spacing: 0.4px;
}

.community-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  text-decoration: none;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 20px;
  transition: color 0.25s;
  position: relative;
}

.community-link:hover {
  color: var(--vp-c-brand-1);
}

.link-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.25s;
}

.community-link:hover .link-icon {
  color: var(--vp-c-brand-1);
}

.link-text {
  flex: 1;
}

.external-link-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-left: 4px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.25s, color 0.25s;
}

.community-link:hover .external-link-icon {
  opacity: 1;
  color: var(--vp-c-brand-1);
}
</style>
