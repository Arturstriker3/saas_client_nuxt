<template>
  <ContentPageLayout
    :eyebrow="t('technologiesPage.tagline')"
    :title="t('technologiesPage.title')"
    :subtitle="t('technologiesPage.subtitle')"
    :hide-hero-on-mobile="true"
    :back-label="t('technologiesPage.backHome')"
    :final-cta-title="t('technologiesPage.ethics.title')"
    :final-cta-description="t('technologiesPage.ethics.description')"
    :final-cta-label="t('landing.header.startForFree')"
    final-cta-to="/registro"
  >
    <div class="layout-container space-y-12 py-12 md:space-y-16 md:py-16">
      <section class="rounded-3xl border border-black/10 bg-white/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors sm:p-6 md:p-8 dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_16px_50px_rgba(2,6,23,0.45)]">
        <div class="flex items-start gap-3 sm:items-center sm:gap-4">
          <span class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:h-11 sm:w-11 dark:bg-emerald-500/20 dark:text-emerald-300">
            <UIcon name="i-lucide-cpu" class="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <h2 class="text-[1.95rem] leading-[1.1] font-extrabold tracking-tight sm:text-2xl md:text-3xl">{{ t("technologiesPage.tech.title") }}</h2>
        </div>
        <p class="mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-[#64748b] sm:text-sm dark:text-slate-300">{{ t("technologiesPage.tech.subtitle") }}</p>
        <div class="mt-8 md:hidden">
          <div
            ref="mobileTechBoardRef"
            class="grid cursor-grab grid-cols-4 gap-3 touch-none rounded-2xl border border-black/10 bg-white/70 p-4 active:cursor-grabbing dark:border-white/10 dark:bg-slate-900/50"
            @pointerdown="handleMobileTechPointerDown"
            @pointermove="handleMobileTechPointerMove"
            @pointerup="handleMobileTechPointerUp"
            @pointercancel="handleMobileTechPointerCancel"
            @pointerleave="handleMobileTechPointerLeave"
          >
            <button
              v-for="(technology, index) in technologies"
              :key="`mobile-tech-${technology.name}`"
              type="button"
              class="flex h-14 w-14 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition-all duration-200 active:scale-95 dark:border-white/10 dark:bg-slate-900"
              :class="{
                'col-start-2': index === 8,
                'col-start-3': index === 9,
                'col-start-4': index === 10,
              }"
              :style="getMobileTechTileStyle(index)"
            >
              <UIcon :name="technology.icon" class="h-6 w-6" :style="{ color: technology.color }" />
            </button>
          </div>
        </div>
        <div class="mt-8 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="technology in technologies"
            :key="technology.name"
            class="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-slate-900">
                  <UIcon :name="technology.icon" class="h-5 w-5" :style="{ color: technology.color }" />
                </span>
                <h3 class="text-lg font-bold tracking-tight">{{ technology.name }}</h3>
              </div>
              <UIcon name="i-lucide-zap" class="h-4 w-4 text-emerald-500/70 transition group-hover:text-emerald-500" />
            </div>
            <p class="mt-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">{{ technology.impact }}</p>
            <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">{{ technology.reason }}</p>
          </article>
        </div>
      </section>

      <section class="rounded-3xl border border-black/10 bg-[#0f172a] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] transition-colors sm:p-6 md:p-8 dark:border-white/10">
        <div class="flex items-start gap-3 sm:items-center sm:gap-4">
          <span class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 sm:h-11 sm:w-11">
            <UIcon name="i-lucide-shield-check" class="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <h2 class="text-[1.95rem] leading-[1.1] font-extrabold tracking-tight sm:text-2xl md:text-3xl">{{ t("technologiesPage.bias.title") }}</h2>
        </div>
        <p class="mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-white/75 sm:text-sm">{{ t("technologiesPage.bias.subtitle") }}</p>
        <div class="mt-8 hidden gap-4 md:grid md:grid-cols-2">
          <article
            v-for="item in biases"
            :key="item.name"
            class="rounded-2xl border border-white/10 bg-[#111b30] p-5 transition hover:border-emerald-300/35"
          >
            <p class="text-base font-bold">{{ item.name }}</p>
            <p class="mt-2 text-sm text-white/85">{{ item.trigger }}</p>
            <p class="mt-2 text-sm text-emerald-200/90">{{ item.outcome }}</p>
          </article>
        </div>
        <div class="mt-8 h-[248px] md:hidden">
          <Transition name="mobile-bias-carousel" mode="out-in">
            <article
              v-if="activeMobileBias"
              :key="`mobile-bias-${activeMobileBias.name}`"
              class="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111b30] p-5"
            >
              <p class="mobile-bias-name text-base font-bold">{{ activeMobileBias.name }}</p>
              <p class="mobile-bias-trigger mt-2 text-sm text-white/85">{{ activeMobileBias.trigger }}</p>
              <p class="mobile-bias-outcome mt-auto pt-3 text-sm text-emerald-200/90">{{ activeMobileBias.outcome }}</p>
            </article>
          </Transition>
        </div>
      </section>

    </div>
  </ContentPageLayout>
</template>

<script setup lang="ts">
type TechnologyItem = {
  name: string
  icon: string
  color: string
  impact: string
  reason: string
}

type BiasItem = {
  name: string
  trigger: string
  outcome: string
}

type PointerDragState = {
  x: number
  y: number
  pointerId: number
}

type SpringPoint = {
  x: number
  y: number
  vx: number
  vy: number
}

const { public: { appName } } = useRuntimeConfig()
const { t } = useI18n()
const mobileBiasIndex = ref(0)
const mobileTechBoardRef = ref<HTMLElement | null>(null)
const mobileTechSprings = ref<SpringPoint[]>([])
const mobileTechDrag = ref<PointerDragState | null>(null)
const mobileTechDragTarget = reactive({ x: 0, y: 0 })
let mobileBiasInterval: ReturnType<typeof setInterval> | null = null
let mobileTechRaf: number | null = null

const technologies = computed<TechnologyItem[]>(() => [
  { name: "Bun", icon: "i-simple-icons-bun", color: "#D2A35C", impact: t("technologiesPage.tech.items.item1.impact"), reason: t("technologiesPage.tech.items.item1.reason") },
  { name: "Nuxt", icon: "i-simple-icons-nuxt", color: "#00DC82", impact: t("technologiesPage.tech.items.item2.impact"), reason: t("technologiesPage.tech.items.item2.reason") },
  { name: "MongoDB", icon: "i-simple-icons-mongodb", color: "#47A248", impact: t("technologiesPage.tech.items.item3.impact"), reason: t("technologiesPage.tech.items.item3.reason") },
  { name: "TypeScript", icon: "i-simple-icons-typescript", color: "#3178C6", impact: t("technologiesPage.tech.items.item4.impact"), reason: t("technologiesPage.tech.items.item4.reason") },
  { name: "RabbitMQ", icon: "i-simple-icons-rabbitmq", color: "#FF6600", impact: t("technologiesPage.tech.items.item5.impact"), reason: t("technologiesPage.tech.items.item5.reason") },
  { name: "WhatsApp Business", icon: "i-simple-icons-whatsapp", color: "#25D366", impact: t("technologiesPage.tech.items.item6.impact"), reason: t("technologiesPage.tech.items.item6.reason") },
  { name: "NestJS", icon: "i-simple-icons-nestjs", color: "#E0234E", impact: t("technologiesPage.tech.items.item7.impact"), reason: t("technologiesPage.tech.items.item7.reason") },
  { name: "Resend", icon: "i-simple-icons-resend", color: "#000000", impact: t("technologiesPage.tech.items.item8.impact"), reason: t("technologiesPage.tech.items.item8.reason") },
  { name: "Docker", icon: "i-simple-icons-docker", color: "#2496ED", impact: t("technologiesPage.tech.items.item9.impact"), reason: t("technologiesPage.tech.items.item9.reason") },
  { name: "Cloudflare", icon: "i-simple-icons-cloudflare", color: "#F38020", impact: t("technologiesPage.tech.items.item10.impact"), reason: t("technologiesPage.tech.items.item10.reason") },
  { name: "Vue", icon: "i-simple-icons-vuedotjs", color: "#4FC08D", impact: t("technologiesPage.tech.items.item11.impact"), reason: t("technologiesPage.tech.items.item11.reason") },
])

const biases = computed<BiasItem[]>(() => [
  { name: t("technologiesPage.bias.items.item1.name"), trigger: t("technologiesPage.bias.items.item1.trigger"), outcome: t("technologiesPage.bias.items.item1.outcome") },
  { name: t("technologiesPage.bias.items.item2.name"), trigger: t("technologiesPage.bias.items.item2.trigger"), outcome: t("technologiesPage.bias.items.item2.outcome") },
  { name: t("technologiesPage.bias.items.item3.name"), trigger: t("technologiesPage.bias.items.item3.trigger"), outcome: t("technologiesPage.bias.items.item3.outcome") },
  { name: t("technologiesPage.bias.items.item4.name"), trigger: t("technologiesPage.bias.items.item4.trigger"), outcome: t("technologiesPage.bias.items.item4.outcome") },
])

const activeMobileBias = computed<BiasItem | null>(() => biases.value[mobileBiasIndex.value] ?? null)

const resetMobileTechSprings = () => {
  mobileTechSprings.value = technologies.value.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
}

const clampValue = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const handleMobileTechPointerDown = (event: PointerEvent) => {
  if (!mobileTechBoardRef.value) {
    return
  }

  mobileTechDrag.value = { x: event.clientX, y: event.clientY, pointerId: event.pointerId }
  mobileTechBoardRef.value.setPointerCapture(event.pointerId)
}

const handleMobileTechPointerMove = (event: PointerEvent) => {
  const drag = mobileTechDrag.value

  if (!drag || event.pointerId !== drag.pointerId) {
    return
  }

  const deltaX = event.clientX - drag.x
  const deltaY = event.clientY - drag.y
  mobileTechDragTarget.x = clampValue(deltaX, -48, 48)
  mobileTechDragTarget.y = clampValue(deltaY, -48, 48)
}

const releaseMobileTechDrag = (event: PointerEvent) => {
  const drag = mobileTechDrag.value

  if (!drag || event.pointerId !== drag.pointerId) {
    return
  }

  mobileTechDrag.value = null
  mobileTechDragTarget.x = 0
  mobileTechDragTarget.y = 0

  if (mobileTechBoardRef.value?.hasPointerCapture(event.pointerId)) {
    mobileTechBoardRef.value.releasePointerCapture(event.pointerId)
  }
}

const handleMobileTechPointerUp = (event: PointerEvent) => {
  releaseMobileTechDrag(event)
}

const handleMobileTechPointerCancel = (event: PointerEvent) => {
  releaseMobileTechDrag(event)
}

const handleMobileTechPointerLeave = (event: PointerEvent) => {
  releaseMobileTechDrag(event)
}

const runMobileTechSpring = () => {
  const stiffness = 0.11
  const damping = 0.86

  mobileTechSprings.value = mobileTechSprings.value.map((point, index) => {
    const followFactor = Math.max(0.36, 1 - index * 0.06)
    const targetX = mobileTechDragTarget.x * followFactor
    const targetY = mobileTechDragTarget.y * followFactor
    const vx = (point.vx + (targetX - point.x) * stiffness) * damping
    const vy = (point.vy + (targetY - point.y) * stiffness) * damping

    return {
      x: point.x + vx,
      y: point.y + vy,
      vx,
      vy,
    }
  })

  mobileTechRaf = requestAnimationFrame(runMobileTechSpring)
}

const getMobileTechTileStyle = (index: number) => {
  const point = mobileTechSprings.value[index]

  if (!point) {
    return {}
  }

  return {
    transform: `translate3d(${point.x}px, ${point.y}px, 0)`,
  }
}

onMounted(() => {
  resetMobileTechSprings()
  runMobileTechSpring()

  if (biases.value.length < 2) {
    return
  }

  mobileBiasInterval = setInterval(() => {
    mobileBiasIndex.value = (mobileBiasIndex.value + 1) % biases.value.length
  }, 2600)
})

onBeforeUnmount(() => {
  if (mobileTechRaf) {
    cancelAnimationFrame(mobileTechRaf)
  }

  if (!mobileBiasInterval) {
    return
  }

  clearInterval(mobileBiasInterval)
})

useSeoMeta({
  title: () => `${appName} | ${t("technologiesPage.seo.title")}`,
  description: () => t("technologiesPage.seo.description"),
})
</script>

<style scoped>
.mobile-bias-carousel-enter-active,
.mobile-bias-carousel-leave-active {
  transition: transform 280ms ease, opacity 280ms ease;
}

.mobile-bias-carousel-enter-from {
  opacity: 0;
  transform: translate3d(18px, 0, 0);
}

.mobile-bias-carousel-leave-to {
  opacity: 0;
  transform: translate3d(-18px, 0, 0);
}

.mobile-bias-name,
.mobile-bias-trigger,
.mobile-bias-outcome {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mobile-bias-name {
  -webkit-line-clamp: 2;
}

.mobile-bias-trigger {
  -webkit-line-clamp: 4;
}

.mobile-bias-outcome {
  -webkit-line-clamp: 3;
}
</style>
