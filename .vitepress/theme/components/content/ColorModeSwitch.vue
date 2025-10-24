<!--
  - Copyright (c) YumeYuka 2025.
  -->

<script setup>
const colorMode = useColorMode()

const isLight = computed({
  get() {
    return colorMode.value === 'light'
  },
  set(_isLight) {
    colorMode.preference = _isLight ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <div class="flex-1 flex items-center justify-center">
      <USwitch
          v-model="isLight"
          :ui="{
          base: 'w-70 h-35 rounded-lg rotate-90 data-[state=checked]:bg-[var(--ui-color-neutral-200)]',
          thumb: 'data-[state=checked]:translate-x-35 data-[state=checked]:rtl:-translate-x-35 rounded-lg size-34',
          icon: 'rotate-270 size-8',
        }"
          aria-label="Toggle color mode"
          checked-icon="i-lucide-sun"
          color="neutral"
          size="xl"
          unchecked-icon="i-lucide-moon"
          @click="isDark = !isDark"
      />
    </div>
  </ClientOnly>
</template>
