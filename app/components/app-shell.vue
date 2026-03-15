<template>
  <div class="layout-container flex max-w-5xl flex-col gap-6 py-8">
    <header class="flex items-center justify-between gap-4">
      <div class="flex flex-col">
        <span class="text-xs text-(--ui-text-muted)">{{ appName }}</span>
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </div>
      <slot name="actions" />
    </header>
    <section>
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
const { public: { appName } } = useRuntimeConfig()

defineProps<{
  title: string
}>()
</script>
