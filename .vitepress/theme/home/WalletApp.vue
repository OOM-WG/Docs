<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <div class="vp-home">
    <!-- 主标题区域 -->
    <HeroSection/>

    <!-- 特性卡片区域 -->
    <FeaturesGrid>
      <FeatureCard
          v-for="(card, index) in cards"
          :key="index"
          :description="card.description"
          :image-alt="card.imageAlt"
          :image-src="card.imageSrc"
          :size="card.size"
          :title="card.title"/>
      <AuthorCard :authors="authors" title="开发者"/>
    </FeaturesGrid>

    <!-- 页脚区域 -->
    <FooterSection/>
  </div>
</template>

<script lang="ts" setup>
import HeroSection from "./HeroSection.vue";
import FeaturesGrid from "./FeaturesGrid.vue";
import FeatureCard from "./FeatureCard.vue";
import AuthorCard from "./AuthorCard.vue";
import FooterSection from "./FooterSection.vue";

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  size: "small" | "large";
}

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

const cards: CardData[] = [
  {
    title: '使用 <span class="highlight">C/C++ Kotlin ...</span> 多种语言开发',
    description: "多语言协作，让工具具备更高的灵活性与可扩展性",
    imageSrc: "/assets/img/kotlin.png",
    imageAlt: "VitePress Logo",
    size: "small",
  },
  {
    title: '<span class="highlight">ShiroSU / SSU</span>',
    description:
        "Android root 实现：简易上手的开始 --- ShiroSU 将继续坚持 NGA 和 CU 一贯的简洁设计理念， 您只需要享受 SSU 带来的权能，繁琐的底层细节交给我们就好",
    imageSrc: "/assets/img/ssu.jpg",
    imageAlt: "VitePress Logo",
    size: "large",
  },
  {
    title: '<span class="highlight">苏柚 - SUU</span>',
    description: "做最棒的超级用户工具 ---  Super User Utils，简称SUU，中文名称就是苏柚啦！",
    imageSrc: "/assets/img/suu.jpg",
    imageAlt: "VitePress Logo",
    size: "large",
  },
  {
    title: '使用 <span class="highlight">VitePress</span> 构建',
    description: "由最著名的 Vue 框架优化，vite 为提供构建速度、高性能 SEO 友好的文档所需的一切。",
    imageSrc: "https://vitepress.dev/vitepress-logo-large.svg",
    imageAlt: "VitePress Logo",
    size: "small",
  },
];

const authors: Author[] = [
  {
    name: "悠栾",
    avatar: "https://oom-wg.dev/developers/ark.webp",
    role: "摸鱼人",
    socials: [{type: "github", url: "https://github.com/NuoFang6"}],
  },
  {
    name: "Linso",
    avatar: "https://oom-wg.dev/developers/linso.webp",
    role: "雇佣开发者",
    socials: [
      {type: "github", url: "https://github.com/Linso05"},
      {type: "website", url: "https://linso.top"},
    ],
  },
  {
    name: "枫莹",
    avatar: "https://oom-wg.dev/developers/fengying.webp",
    role: "喵喵喵",
    socials: [
      {type: "github", url: "https://github.com/FengYing1314"},
      {type: "website", url: "https://www.fengying.xin"},
    ],
  },
  {
    name: "白彩恋",
    avatar: "https://oom-wg.dev/developers/shiro.webp",
    role: "浅草开发者",
    socials: [
      {type: "github", url: "https://github.com/ShIroRRen"},
      {type: "website", url: "https://shiror.ren"},
    ],
  },
  {
    name: "梦璃酱",
    avatar: "https://oom-wg.dev/developers/yumeyuka.webp",
    role: "泠熙子",
    socials: [
      {type: "github", url: "https://github.com/YumeYuka"},
      {type: "website", url: "https://www.yumeyuka.plus"},
    ],
  },
];
</script>

<style scoped>
.vp-home {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px;
}

/* 移动端减小边距 */
@media (max-width: 768px) {
  .vp-home {
    padding: 0 24px;
  }
}

/* 响应式 */
@media (min-width: 769px) and (max-width: 1024px) {
  .vp-home {
    padding: 0 32px;
  }
}
</style>
