<template>
  <section class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container py-16">
      <h3 class="text-center text-3xl font-extrabold tracking-tight">{{ t("landing.brands.title") }}</h3>
      <div class="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <div v-for="brand in brands" :key="brand" class="rounded-xl border border-black/10 px-4 py-4 text-sm font-bold text-[#334155] dark:border-white/10 dark:text-slate-300">
          {{ brand }}
        </div>
      </div>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <UButton color="primary" size="xl" class="rounded-full px-8 text-base">
          {{ t("landing.header.startForFree") }}
        </UButton>
        <UButton color="neutral" variant="outline" size="xl" class="rounded-full px-8 text-base">
          {{ t("landing.hero.viewDemo") }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  brands: string[]
}>()

const { t } = useI18n()
</script>
