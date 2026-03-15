<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
    <header class="flex items-center justify-between gap-4">
      <div class="flex flex-col">
        <span class="text-xs text-(--ui-text-muted)">{{ activeTheme.brandName }}</span>
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
const appConfig = useAppConfig()
const activeTheme = computed(() => {
  const activePreset = appConfig.theme.activePreset
  return appConfig.theme.presets[activePreset]
})

defineProps<{
  title: string
}>()
</script>
