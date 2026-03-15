<template>
  <section ref="sectionRef" class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container py-16">
      <h3
        class="text-center text-3xl font-extrabold tracking-tight transition-all duration-700 ease-out"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
      >
        {{ t("landing.brands.title") }}
      </h3>
      <div class="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <div
          v-for="(brand, index) in brands"
          :key="brand"
          class="rounded-xl border border-black/10 px-4 py-4 text-sm font-bold text-[#334155] transition-all duration-500 ease-out dark:border-white/10 dark:text-slate-300"
          :style="getBrandStyle(index)"
        >
          {{ brand }}
        </div>
      </div>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-out" :style="ctaStyle">
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
  const motion = (top.value - 340) * -0.025
  return Math.max(-12, Math.min(12, motion))
})

const getBrandStyle = (index: number) => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 16px, 0)",
      transitionDelay: "0ms",
    }
  }

  return {
    opacity: "1",
    transform: `translate3d(0, ${parallaxOffset.value * ((index % 3) - 1) * 0.28}px, 0)`,
    transitionDelay: `${index * 70 + 120}ms`,
  }
}

const ctaStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? `translate3d(0, ${parallaxOffset.value * -0.2}px, 0)` : "translate3d(0, 16px, 0)",
  transitionDelay: sectionVisible.value ? "300ms" : "0ms",
}))
</script>
