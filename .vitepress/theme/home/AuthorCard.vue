<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div class="author-card" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove">
    <div class="card-border"></div>
    <div class="card-border-highlight"></div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div class="authors-grid">
        <div v-for="(author, index) in authors" :key="index" class="author-item">
          <img :alt="author.name" :src="author.avatar" class="author-avatar"/>
          <div class="author-info">
            <div class="author-name">{{ author.name }}</div>
            <div v-if="author.role" class="author-role">{{ author.role }}</div>
            <div v-if="author.socials && author.socials.length" class="author-socials">
              <a
                  v-for="(social, idx) in author.socials"
                  :key="idx"
                  :href="social.url"
                  class="author-social"
                  rel="noopener"
                  target="_blank">
                <svg v-if="social.type === 'github'" class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <svg v-else-if="social.type === 'twitter'" class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <svg v-else-if="social.type === 'email'" class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <svg v-else-if="social.type === 'website'" class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SocialLink {
  type: "github" | "twitter" | "email" | "website";
  url: string;
}

interface Author {
  name: string;
  avatar: string;
  role?: string;
  socials?: SocialLink[];
}

const props = defineProps<{
  title: string;
  authors: Author[];
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
.author-card {
  position: relative;
  padding: 32px 40px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

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

.author-card:hover .card-border {
  opacity: 1;
}

.card-border-highlight {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
      150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      var(--vp-c-brand-1),
      transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.author-card:hover .card-border-highlight {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: var(--vp-c-text-1);
  text-align: center;
}

.authors-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
}

.author-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  width: 180px;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-divider);
  transition: transform 0.3s ease;
}

.author-item:hover .author-avatar {
  transform: scale(1.1);
}

.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.author-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.author-role {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.author-socials {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.author-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.author-social:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.social-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .author-card {
    padding: 24px;
  }

  .authors-grid {
    gap: 20px;
  }

  .author-item {
    width: 140px;
  }

  .author-avatar {
    width: 64px;
    height: 64px;
  }

  .author-name {
    font-size: 14px;
  }

  .author-role {
    font-size: 12px;
  }

  .author-social {
    width: 32px;
    height: 32px;
  }

  .social-icon {
    width: 16px;
    height: 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .author-item {
    width: 160px;
  }
}
</style>
