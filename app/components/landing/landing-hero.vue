<template>
  <section ref="heroSection" class="relative overflow-hidden">
    <div class="absolute inset-0 opacity-80 transition-transform duration-700 ease-out" :style="heroBackgroundStyle" />
    <div class="layout-container relative flex flex-col items-center pb-18 pt-20 text-center">
      <p
        class="mb-5 rounded-full border border-(--ui-primary) bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--ui-primary) transition-all duration-700 ease-out dark:bg-slate-900"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
      >
        {{ t("landing.hero.tagline") }}
      </p>
      <h1
        class="min-h-[3.3em] max-w-5xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight transition-all duration-700 ease-out md:min-h-[2.2em] md:max-w-6xl md:text-7xl"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ transitionDelay: sectionVisible ? '70ms' : '0ms' }"
      >
        {{ t("landing.hero.title") }}
      </h1>
      <p
        class="mt-6 min-h-14 max-w-3xl text-lg text-[#64748b] transition-all duration-700 ease-out dark:text-slate-300"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ transitionDelay: sectionVisible ? '130ms' : '0ms' }"
      >
        {{ t("landing.hero.subtitle") }}
      </p>
      <div ref="trustCardsSection" class="mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        <article
          v-for="(item, index) in trustItems"
          :key="item.label"
          class="group rounded-2xl border border-emerald-100/70 bg-white/90 p-4 text-left shadow-[0_12px_26px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.12)] dark:border-emerald-300/15 dark:bg-slate-900/85"
          :style="getTrustCardStyle(index)"
        >
          <div class="flex items-start justify-between gap-3 text-[#334155] dark:text-slate-300">
            <div class="flex items-center gap-2">
              <div class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                <UIcon :name="item.icon" class="h-4 w-4" />
              </div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em]">{{ item.trigger }}</p>
            </div>
            <p class="text-[1.7rem] font-extrabold leading-none text-[#0f172a] dark:text-slate-100">
              {{ formatMetricValue(item, index) }}
            </p>
          </div>
          <p class="mt-2 min-h-10 text-sm leading-5 text-[#475569] dark:text-slate-300">
            {{ item.label }}
          </p>
          <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-50 dark:bg-emerald-900/35">
            <div class="h-full w-full rounded-full bg-linear-to-r from-emerald-500 to-cyan-500" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type HeroTrustItem = {
  value: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
  trigger: string
  icon: string
}

const props = defineProps<{
  heroLinesStyle: Record<string, string>
  trustItems: HeroTrustItem[]
}>()

const { t } = useI18n()

const heroSection = ref<HTMLElement | null>(null)
const trustCardsSection = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)
const trustCardsVisible = ref(false)
const hasAnimated = ref(false)
const animatedSources = props.trustItems.map(() => ref(0))
const animatedValues = animatedSources.map((source) => useTransition(source, { duration: 1200 }))

useIntersectionObserver(heroSection, ([entry]) => {
  if (!entry?.isIntersecting) {
    return
  }

  sectionVisible.value = true
}, { threshold: 0.18 })

useIntersectionObserver(trustCardsSection, ([entry]) => {
  if (!entry?.isIntersecting || trustCardsVisible.value) {
    return
  }

  trustCardsVisible.value = true
  hasAnimated.value = true
}, { threshold: 0.42, rootMargin: "0px 0px -12% 0px" })

watch(hasAnimated, (isActive) => {
  if (!isActive) {
    return
  }

  props.trustItems.forEach((item, index) => {
    const source = animatedSources[index]
    if (source) source.value = item.value
  })
})

const heroBackgroundStyle = computed(() => ({
  ...props.heroLinesStyle,
}))

const getTrustCardStyle = (index: number) => {
  if (!trustCardsVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 18px, 0)",
      transitionDelay: "0ms",
    }
  }

  return {
    opacity: "1",
    transform: "translate3d(0, 0, 0)",
    transitionDelay: `${index * 100 + 180}ms`,
  }
}

const formatMetricValue = (item: HeroTrustItem, index: number) => {
  const metricValue = animatedValues[index]?.value ?? 0
  return `${item.prefix ?? ""}${metricValue.toFixed(item.decimals)}${item.suffix ?? ""}`
}
</script>
