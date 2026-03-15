<template>
  <section ref="sectionRef" class="bg-primary py-20 text-white">
    <div class="layout-container transition-all duration-700 ease-out" :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
      <h2 class="text-center text-4xl font-extrabold tracking-tight" :style="titleStyle">{{ t("landing.loop.title") }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-white/90" :style="subtitleStyle">
        {{ t("landing.loop.subtitle") }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3" :style="ctaStyle">
        <UButton color="primary" variant="solid" size="xl" class="rounded-full bg-white px-8 text-base text-[#0f172a] hover:bg-white/90">
          {{ t("landing.header.startForFree") }}
        </UButton>
        <UButton color="neutral" variant="outline" size="xl" class="rounded-full border-white/40 px-8 text-base text-white hover:bg-white/10">
          {{ t("landing.hero.viewDemo") }}
        </UButton>
      </div>
      <div class="mt-10 rounded-3xl border border-white/20 bg-[#111827] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out" :style="panelStyle">
        <div class="grid gap-4 md:grid-cols-4">
          <div
            v-for="(card, index) in dashboardCards"
            :key="card"
            class="rounded-xl border border-white/10 bg-[#0f172a] p-4 transition-all duration-500 ease-out"
            :style="getCardStyle(index)"
          >
            <p class="text-sm font-semibold">{{ card }}</p>
            <div class="mt-3 h-10 rounded-md bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  dashboardCards: string[]
}>()

const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)

const { top } = useElementBounding(sectionRef)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (!entry?.isIntersecting || sectionVisible.value) {
    return
  }

  sectionVisible.value = true
}, { threshold: 0.2 })

const parallaxOffset = computed(() => {
  const motion = (top.value - 340) * -0.03
  return Math.max(-20, Math.min(20, motion))
})

const titleStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? `translate3d(0, ${parallaxOffset.value * 0.18}px, 0)` : "translate3d(0, 14px, 0)",
  transition: "all 640ms ease",
}))

const subtitleStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? `translate3d(0, ${parallaxOffset.value * 0.1}px, 0)` : "translate3d(0, 16px, 0)",
  transition: "all 680ms ease",
  transitionDelay: sectionVisible.value ? "80ms" : "0ms",
}))

const ctaStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
  transition: "all 700ms ease",
  transitionDelay: sectionVisible.value ? "140ms" : "0ms",
}))

const panelStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? `translate3d(0, ${parallaxOffset.value}px, 0)` : "translate3d(0, 18px, 0)",
  transitionDelay: sectionVisible.value ? "180ms" : "0ms",
}))

const getCardStyle = (index: number) => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 14px, 0)",
      transitionDelay: "0ms",
    }
  }

  const direction = index % 2 === 0 ? 1 : -1

  return {
    opacity: "1",
    transform: `translate3d(0, ${parallaxOffset.value * direction * 0.22}px, 0)`,
    transitionDelay: `${index * 70 + 260}ms`,
  }
}
</script>
