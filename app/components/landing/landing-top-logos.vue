<template>
  <section class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container grid grid-cols-2 items-center gap-8 py-8 text-center sm:grid-cols-4 lg:grid-cols-8">
      <p v-for="logo in logos" :key="logo" class="text-sm font-semibold tracking-wide text-[#1e293b] dark:text-slate-300">
        {{ logo }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  logos: string[]
}>()
</script>
