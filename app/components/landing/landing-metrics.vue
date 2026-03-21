<template>
  <section ref="sectionRef" class="layout-container py-20">
    <h2
      class="text-center text-4xl font-extrabold tracking-tight transition-all duration-700 ease-out"
      :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      {{ t("landing.metrics.title") }}
    </h2>
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <UCard
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="rounded-3xl border border-black/10 transition-all duration-600 ease-out dark:border-white/10"
        :style="getMetricCardStyle(index)"
      >
        <div class="space-y-4">
          <p class="text-sm text-[#64748b] dark:text-slate-300">{{ metric.label }}</p>
          <p class="text-4xl font-extrabold">{{ metric.value }}</p>
          <div class="h-20 rounded-xl bg-linear-to-r from-[#fff1ec] to-[#ffe8e2]" :style="getMetricBarStyle(index)" />
        </div>
      </UCard>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <UCard
        v-for="(quote, index) in quotes"
        :key="quote.author"
        class="rounded-3xl border border-black/10 transition-all duration-600 ease-out dark:border-white/10"
        :style="getQuoteCardStyle(index)"
      >
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

const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (!entry?.isIntersecting || sectionVisible.value) {
    return
  }

  sectionVisible.value = true
}, { threshold: 0.2 })

const getMetricCardStyle = (index: number) => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 18px, 0)",
      transitionDelay: "0ms",
    }
  }

  return {
    opacity: "1",
    transform: "translate3d(0, 0, 0)",
    transitionDelay: `${index * 100 + 120}ms`,
  }
}

const getMetricBarStyle = (_index: number) => {
  return {
    transform: `translate3d(0, 0, 0) scaleX(${sectionVisible.value ? 1 : 0.92})`,
    opacity: sectionVisible.value ? "1" : "0.7",
    transition: "transform 760ms ease, opacity 760ms ease",
  }
}

const getQuoteCardStyle = (index: number) => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 20px, 0)",
      transitionDelay: "0ms",
    }
  }

  return {
    opacity: "1",
    transform: "translate3d(0, 0, 0)",
    transitionDelay: `${index * 100 + 300}ms`,
  }
}
</script>
