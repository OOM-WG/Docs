<!--
  - Copyright (c) YumeYuka 2025.
  -->

<template>
  <UButton
      v-if="$route.path == '/'"
      class="hidden lg:inline-flex"
      color="neutral"
      size="sm"
      to="/getting-started/installation"
  >
    Get Started
  </UButton>
</template>
