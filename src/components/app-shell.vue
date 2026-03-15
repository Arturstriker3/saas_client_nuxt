<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
    <header class="flex items-center justify-between gap-4">
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <slot name="actions" />
    </header>
    <section>
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
