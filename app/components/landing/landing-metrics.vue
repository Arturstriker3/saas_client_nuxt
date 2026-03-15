<template>
  <section class="layout-container py-20">
    <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.metrics.title") }}</h2>
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <UCard v-for="metric in metrics" :key="metric.label" class="rounded-3xl border border-black/10 dark:border-white/10">
        <div class="space-y-4">
          <p class="text-sm text-[#64748b] dark:text-slate-300">{{ metric.label }}</p>
          <p class="text-4xl font-extrabold">{{ metric.value }}</p>
          <div class="h-20 rounded-xl bg-linear-to-r from-[#fff1ec] to-[#ffe8e2]" />
        </div>
      </UCard>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <UCard v-for="quote in quotes" :key="quote.author" class="rounded-3xl border border-black/10 dark:border-white/10">
        <p class="text-sm leading-relaxed text-[#475569] dark:text-slate-300">{{ quote.message }}</p>
        <p class="mt-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">{{ quote.author }}</p>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
type MetricItem = {
  label: string
  value: string
}

type QuoteItem = {
  message: string
  author: string
}

defineProps<{
  metrics: MetricItem[]
  quotes: QuoteItem[]
}>()

const { t } = useI18n()
</script>
