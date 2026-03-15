<template>
  <section ref="sectionRef" class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container overflow-x-hidden pb-10 pt-3">
      <div
        class="transition-all duration-700 ease-out"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-7 flex items-center justify-center gap-2.5 text-[0.62rem] font-medium tracking-[0.12em] text-slate-400/85 dark:text-slate-500">
          <span class="h-px w-12 bg-slate-200/70 dark:bg-slate-800/60 sm:w-24" />
          <span>{{ t("landing.brands.poweredBy") }}</span>
          <span class="h-px w-12 bg-slate-200/70 dark:bg-slate-800/60 sm:w-24" />
        </div>
        <div class="landing-marquee-mask">
          <div class="landing-marquee-motion" :style="motionStyle">
            <div class="landing-marquee-track">
              <article
                v-for="(logo, index) in repeatedLogos"
                :key="`${logo.name}-${index}`"
                class="landing-logo-chip"
                :style="getLogoStyle(index)"
              >
                <UIcon :name="logo.icon" class="h-5 w-5" />
                <span class="text-sm font-semibold tracking-wide">{{ logo.name }}</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TopLogoItem = {
  name: string
  icon: string
  color: string
}

const props = defineProps<{
  logos: TopLogoItem[]
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
  const motion = (top.value - 320) * -0.03
  return Math.max(-14, Math.min(14, motion))
})

const repeatedLogos = computed<TopLogoItem[]>(() => [...props.logos, ...props.logos])

const motionStyle = computed(() => ({
  transform: `translate3d(0, ${parallaxOffset.value * 0.35}px, 0)`,
}))

const getLogoStyle = (index: number) => {
  const logo = repeatedLogos.value[index]

  if (!logo) {
    return {}
  }

  return {
    color: logo.color,
  }
}
</script>
