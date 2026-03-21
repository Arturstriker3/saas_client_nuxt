<template>
  <div class="pointer-events-none absolute -z-10 opacity-0" aria-hidden="true">
    <UIcon v-for="icon in preloadedIcons" :key="icon" :name="icon" class="h-5 w-5" />
  </div>
</template>

<script setup lang="ts">
const preloadedIcons = [
  "i-circle-flags-br",
  "i-circle-flags-us",
  "i-circle-flags-es",
  "i-lucide-menu",
  "i-lucide-x",
  "i-lucide-package",
  "i-lucide-house",
  "i-lucide-shopping-bag",
  "i-lucide-files",
  "i-lucide-moon",
  "i-lucide-sun",
  "i-lucide-globe",
  "i-lucide-arrow-left",
  "i-lucide-cpu",
  "i-logos-google-icon",
] as const
</script>
