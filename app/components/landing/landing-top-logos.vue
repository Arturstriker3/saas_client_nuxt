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
          <div ref="trackRef" class="landing-marquee-track">
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
const trackRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)
let rafId: number | null = null
const scrollPos = ref(0)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (!entry?.isIntersecting || sectionVisible.value) {
    return
  }
  sectionVisible.value = true
}, { threshold: 0.2 })

const repeatedLogos = computed<TopLogoItem[]>(() => [...props.logos, ...props.logos])

const getLogoStyle = (index: number) => {
  const logo = repeatedLogos.value[index]
  if (!logo) return {}
  return { color: logo.color }
}

const animateMarquee = () => {
  if (!trackRef.value) return

  const halfWidth = trackRef.value.scrollWidth / 2
  scrollPos.value -= 0.8

  if (Math.abs(scrollPos.value) >= halfWidth) {
    scrollPos.value += halfWidth
  }

  trackRef.value.style.transform = `translateX(${scrollPos.value}px)`
  rafId = requestAnimationFrame(animateMarquee)
}

onMounted(() => {
  rafId = requestAnimationFrame(animateMarquee)
})

onBeforeUnmount(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<style>
.landing-marquee-mask {
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  padding-top: 0.2rem;
  padding-bottom: 0.25rem;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.landing-marquee-track {
  display: flex;
  width: max-content;
  gap: 1rem;
  will-change: transform;
}

.landing-logo-chip {
  display: inline-flex;
  min-width: 168px;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgb(15 23 42 / 0.08);
  background: rgb(255 255 255 / 0.96);
  padding: 0.65rem 1rem;
  backdrop-filter: blur(2px);
}

.dark .landing-logo-chip {
  border-color: rgb(15 23 42 / 0.14);
  background: rgb(248 250 252 / 0.96);
}

@media (prefers-reduced-motion: reduce) {
  .landing-marquee-track {
    animation: none;
  }
}
</style>
