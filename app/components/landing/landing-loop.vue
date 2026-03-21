<template>
  <section ref="sectionRef" class="bg-primary py-20 text-white">
    <div class="layout-container transition-all duration-700 ease-out" :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
      <h2 class="text-center text-4xl font-extrabold tracking-tight" :style="titleStyle">{{ t("landing.pricing.title") }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-white/90" :style="subtitleStyle">
        {{ t("landing.pricing.subtitle") }}
      </p>
      <div class="mt-8 flex flex-col items-center" :style="ctaStyle">
        <div class="grid w-full max-w-lg grid-cols-3 gap-1 rounded-2xl border border-white/25 bg-[#0f172a]/40 p-1.5 sm:gap-1.5">
          <button
            v-for="option in billingOptions"
            :key="option.value"
            type="button"
            class="flex min-w-0 items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-[0.8rem] font-semibold transition-all duration-200 sm:gap-2 sm:px-4 sm:text-sm"
            :class="selectedCycle === option.value ? 'bg-white text-[#0f172a]' : 'text-white/85 hover:bg-white/10'"
            @click="selectedCycle = option.value"
          >
            <span>{{ option.label }}</span>
            <sup
              v-if="option.savings"
              class="relative -top-1 text-[0.62rem] font-extrabold tracking-tight sm:text-[0.68rem]"
              :class="selectedCycle === option.value ? 'text-emerald-600' : 'text-emerald-200'"
            >
              {{ t("landing.pricing.saveShort", { value: option.savings }) }}
            </sup>
          </button>
        </div>
        <p class="mt-3 hidden text-center text-sm text-white/85 md:block">{{ t(`landing.pricing.framing.${selectedCycle}`) }}</p>
      </div>
      <div class="mt-10 rounded-3xl border border-white/20 bg-[#111827] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out" :style="panelStyle">
        <div class="mb-6 hidden gap-2 lg:grid lg:grid-cols-3">
          <div v-for="pillar in trustPillars" :key="pillar.label" class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
            <UIcon :name="pillar.icon" class="h-4 w-4 text-emerald-300" />
            <span>{{ pillar.label }}</span>
          </div>
        </div>
        <div class="hidden gap-4 lg:grid lg:grid-cols-3">
          <article
            v-for="(plan, index) in pricingPlans"
            :key="plan.id"
            class="relative rounded-2xl border p-6 transition-all duration-500 ease-out"
            :class="plan.highlight ? 'border-emerald-300/70 bg-[#0e1c2f]' : 'border-white/10 bg-[#0f172a]'"
            :style="getCardStyle(index)"
          >
            <span v-if="plan.badge" class="absolute right-4 top-4 rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-semibold text-emerald-200">
              {{ plan.badge }}
            </span>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{{ plan.name }}</p>
            <p class="mt-2 text-sm text-white/80">{{ plan.description }}</p>
            <div class="mt-5 flex items-end gap-2">
              <p class="text-4xl font-extrabold leading-none">{{ plan.price }}</p>
              <p class="pb-1 text-sm text-white/70">
                {{ t("landing.pricing.perMonth") }}
                <sup v-if="plan.cycleBadge" class="ml-1.5 text-[0.68rem] font-extrabold text-emerald-200">{{ plan.cycleBadge }}</sup>
              </p>
            </div>
            <p class="mt-1 text-xs text-white/70">{{ plan.totalCycleLabel }}</p>
            <p class="mt-2 text-xs text-emerald-200/90">{{ plan.commitment }}</p>
            <ul class="mt-5 space-y-2 text-sm text-white/85">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
                <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>{{ feature }}</span>
              </li>
            </ul>
            <NuxtLink v-if="plan.ctaTo" :to="plan.ctaTo" class="mt-6 block">
              <UButton
                class="w-full justify-center rounded-xl"
                :color="plan.highlight ? 'primary' : 'neutral'"
                :variant="plan.highlight ? 'solid' : 'outline'"
                size="lg"
              >
                {{ plan.cta }}
              </UButton>
            </NuxtLink>
            <UButton
              v-else
              class="mt-6 w-full justify-center rounded-xl"
              :color="plan.highlight ? 'primary' : 'neutral'"
              :variant="plan.highlight ? 'solid' : 'outline'"
              size="lg"
            >
              {{ plan.cta }}
            </UButton>
          </article>
        </div>
        <div class="touch-pan-y select-none lg:hidden" @pointerdown="handlePlanPointerDown" @pointermove="handlePlanPointerMove" @pointerup="handlePlanPointerUp" @pointercancel="handlePlanPointerCancel" @pointerleave="handlePlanPointerLeave">
          <Transition name="mobile-plan-fade" mode="out-in" appear :duration="{ enter: 340, leave: 180 }">
            <article
              v-if="activeMobilePlan"
              :key="activeMobilePlan.id"
              class="relative rounded-2xl border p-6 transition-all duration-500 ease-out"
              :class="activeMobilePlan.highlight ? 'border-emerald-300/70 bg-[#0e1c2f]' : 'border-white/10 bg-[#0f172a]'"
              :style="mobileCardStyle"
            >
              <span v-if="activeMobilePlan.badge" class="absolute right-4 top-4 rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                {{ activeMobilePlan.badge }}
              </span>
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{{ activeMobilePlan.name }}</p>
              <p class="mt-2 text-sm text-white/80">{{ activeMobilePlan.description }}</p>
              <div class="mt-5 flex items-end gap-2">
                <p class="text-4xl font-extrabold leading-none">{{ activeMobilePlan.price }}</p>
                <p class="pb-1 text-sm text-white/70">
                  {{ t("landing.pricing.perMonth") }}
                  <sup v-if="activeMobilePlan.cycleBadge" class="ml-1.5 text-[0.68rem] font-extrabold text-emerald-200">{{ activeMobilePlan.cycleBadge }}</sup>
                </p>
              </div>
              <p class="mt-1 text-xs text-white/70">{{ activeMobilePlan.totalCycleLabel }}</p>
              <p class="mt-2 text-xs text-emerald-200/90">{{ activeMobilePlan.commitment }}</p>
              <ul class="mt-5 space-y-2 text-sm text-white/85">
                <li v-for="feature in activeMobilePlan.features" :key="feature" class="flex items-start gap-2">
                  <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <NuxtLink v-if="activeMobilePlan.ctaTo" :to="activeMobilePlan.ctaTo" class="mt-6 block">
                <UButton
                  class="w-full justify-center rounded-xl"
                  :color="activeMobilePlan.highlight ? 'primary' : 'neutral'"
                  :variant="activeMobilePlan.highlight ? 'solid' : 'outline'"
                  size="lg"
                >
                  {{ activeMobilePlan.cta }}
                </UButton>
              </NuxtLink>
              <UButton
                v-else
                class="mt-6 w-full justify-center rounded-xl"
                :color="activeMobilePlan.highlight ? 'primary' : 'neutral'"
                :variant="activeMobilePlan.highlight ? 'solid' : 'outline'"
                size="lg"
              >
                {{ activeMobilePlan.cta }}
              </UButton>
            </article>
          </Transition>
        </div>
        <div class="mt-4 flex items-center justify-center gap-2 lg:hidden">
          <div class="flex items-center gap-2">
            <button
              v-for="(plan, index) in pricingPlans"
              :key="`dot-${plan.id}`"
              type="button"
              class="h-2.5 rounded-full transition-all duration-200"
              :class="index === mobilePlanIndex ? 'w-6 bg-emerald-300' : 'w-2.5 bg-white/35'"
              @click="goToPlan(index)"
            />
          </div>
        </div>
        <div class="mt-4 lg:hidden">
          <Transition name="mobile-pillar-carousel" mode="out-in">
            <div v-if="activeTrustPillar" :key="`mobile-${activeTrustPillar.label}`" class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
              <UIcon :name="activeTrustPillar.icon" class="h-4 w-4 text-emerald-300" />
              <span>{{ activeTrustPillar.label }}</span>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type BillingCycle = "monthly" | "quarterly" | "semiannual"

type PricingPlan = {
  id: "basic" | "pro" | "team"
  name: string
  description: string
  price: string
  cycleBadge?: string
  totalCycleLabel: string
  commitment: string
  features: string[]
  cta: string
  ctaTo?: string
  badge?: string
  highlight: boolean
}

type TrustPillar = {
  label: string
  icon: string
}

type DragStart = {
  x: number
  y: number
  pointerId: number
}

const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)
const selectedCycle = ref<BillingCycle>("monthly")
const mobilePlanIndex = ref(0)
const planDragStart = ref<DragStart | null>(null)
const planDragOffsetX = ref(0)
const planDragAxis = ref<"horizontal" | "vertical" | null>(null)
const swipeReleaseDirection = ref<"next" | "prev" | null>(null)
const activeTrustPillarIndex = ref(0)
let trustPillarCycleInterval: ReturnType<typeof setInterval> | null = null
let swipeSwitchTimeout: ReturnType<typeof setTimeout> | null = null

useIntersectionObserver(sectionRef, ([entry]) => {
  if (!entry?.isIntersecting || sectionVisible.value) {
    return
  }

  sectionVisible.value = true
}, { threshold: 0.2 })

const titleStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
  transition: "all 640ms ease",
}))

const subtitleStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
  transition: "all 680ms ease",
  transitionDelay: sectionVisible.value ? "80ms" : "0ms",
}))

const ctaStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
  transition: "all 700ms ease",
  transitionDelay: sectionVisible.value ? "140ms" : "0ms",
}))

const billingOptions = computed<{ value: BillingCycle, label: string, savings?: number }[]>(() => [
  { value: "monthly", label: t("landing.pricing.cycles.monthly") },
  { value: "quarterly", label: t("landing.pricing.cycles.quarterly"), savings: 11 },
  { value: "semiannual", label: t("landing.pricing.cycles.semiannual"), savings: 22 },
])

const trustPillars = computed<TrustPillar[]>(() => [
  { label: t("landing.pricing.trust.item1"), icon: "i-lucide-shield-check" },
  { label: t("landing.pricing.trust.item2"), icon: "i-lucide-eye" },
  { label: t("landing.pricing.trust.item3"), icon: "i-lucide-undo-2" },
])

const pricingPlans = computed<PricingPlan[]>(() => {
  const cycleKey = selectedCycle.value.charAt(0).toUpperCase() + selectedCycle.value.slice(1)
  const selectedBillingOption = billingOptions.value.find((option) => option.value === selectedCycle.value)
  const cycleSavings = selectedBillingOption?.savings
  const cycleLabel = t(`landing.pricing.cycles.${selectedCycle.value}`)
  const cycleTotalLabel = t("landing.pricing.totalForCycle", { cycle: cycleLabel })
  const cycleDiscount = cycleSavings ? t("landing.pricing.saveShort", { value: cycleSavings }) : ""

  return [
    {
      id: "basic",
      name: t("landing.pricing.plans.basic.name"),
      description: t("landing.pricing.plans.basic.description"),
      price: t(`landing.pricing.plans.basic.price${cycleKey}`),
      cycleBadge: cycleDiscount || undefined,
      totalCycleLabel: cycleTotalLabel,
      commitment: t(`landing.pricing.commitment.${selectedCycle.value}`),
      features: [
        t("landing.pricing.plans.basic.features.item1"),
        t("landing.pricing.plans.basic.features.item2"),
        t("landing.pricing.plans.basic.features.item3"),
      ],
      cta: t("landing.pricing.plans.basic.cta"),
      ctaTo: "/registro",
      highlight: false,
    },
    {
      id: "pro",
      name: t("landing.pricing.plans.pro.name"),
      description: t("landing.pricing.plans.pro.description"),
      price: t(`landing.pricing.plans.pro.price${cycleKey}`),
      cycleBadge: cycleDiscount || undefined,
      totalCycleLabel: cycleTotalLabel,
      commitment: t(`landing.pricing.commitment.${selectedCycle.value}`),
      features: [
        t("landing.pricing.plans.pro.features.item1"),
        t("landing.pricing.plans.pro.features.item2"),
        t("landing.pricing.plans.pro.features.item3"),
      ],
      cta: t("landing.pricing.plans.pro.cta"),
      badge: t("landing.pricing.popularBadge"),
      highlight: true,
    },
    {
      id: "team",
      name: t("landing.pricing.plans.team.name"),
      description: t("landing.pricing.plans.team.description"),
      price: t(`landing.pricing.plans.team.price${cycleKey}`),
      cycleBadge: cycleDiscount || undefined,
      totalCycleLabel: cycleTotalLabel,
      commitment: t(`landing.pricing.commitment.${selectedCycle.value}`),
      features: [
        t("landing.pricing.plans.team.features.item1"),
        t("landing.pricing.plans.team.features.item2"),
        t("landing.pricing.plans.team.features.item3"),
      ],
      cta: t("landing.pricing.plans.team.cta"),
      highlight: false,
    },
  ]
})

const planCount = computed(() => pricingPlans.value.length)
const activeMobilePlan = computed(() => pricingPlans.value[mobilePlanIndex.value] ?? null)
const activeTrustPillar = computed(() => trustPillars.value[activeTrustPillarIndex.value] ?? null)
const mobileCardStyle = computed(() => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 14px, 0)",
      transitionDelay: "0ms",
    }
  }

  if (swipeReleaseDirection.value) {
    const targetX = swipeReleaseDirection.value === "next" ? -84 : 84

    return {
      opacity: "0",
      transform: `translate3d(${targetX}px, 0, 0) scale(0.985)`,
      transitionDelay: "0ms",
      transition: "transform 190ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 190ms ease",
    }
  }

  const dragDistance = Math.max(Math.min(planDragOffsetX.value, 160), -160)
  const dragOpacity = 1 - Math.min(Math.abs(dragDistance) / 260, 0.45)
  const dragRotation = dragDistance / 24

  return {
    opacity: dragOpacity.toFixed(3),
    transform: `translate3d(${dragDistance}px, 0, 0) rotate(${dragRotation.toFixed(2)}deg)`,
    transitionDelay: "260ms",
    transition: planDragStart.value ? "none" : "transform 220ms ease, opacity 220ms ease",
  }
})

const goToPlan = (index: number) => {
  if (!planCount.value) {
    return
  }

  mobilePlanIndex.value = (index + planCount.value) % planCount.value
}

const goToPreviousPlan = () => {
  goToPlan(mobilePlanIndex.value - 1)
}

const goToNextPlan = () => {
  goToPlan(mobilePlanIndex.value + 1)
}

const resetPlanDrag = (resetOffset = true) => {
  planDragStart.value = null
  planDragAxis.value = null

  if (resetOffset) {
    planDragOffsetX.value = 0
  }
}

const handlePlanPointerDown = (event: PointerEvent) => {
  if (swipeReleaseDirection.value) {
    return
  }

  if (event.button !== 0) {
    return
  }

  planDragStart.value = {
    x: event.clientX,
    y: event.clientY,
    pointerId: event.pointerId,
  }

  planDragAxis.value = null
  planDragOffsetX.value = 0

  const target = event.currentTarget as HTMLElement | null
  target?.setPointerCapture?.(event.pointerId)
}

const handlePlanPointerMove = (event: PointerEvent) => {
  if (!planDragStart.value || event.pointerId !== planDragStart.value.pointerId) {
    return
  }

  const deltaX = event.clientX - planDragStart.value.x
  const deltaY = event.clientY - planDragStart.value.y

  if (!planDragAxis.value && (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6)) {
    planDragAxis.value = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical"
  }

  if (planDragAxis.value !== "horizontal") {
    return
  }

  if (event.cancelable) {
    event.preventDefault()
  }

  planDragOffsetX.value = deltaX
}

const finalizePlanDrag = (shouldNavigate: boolean) => {
  if (!planDragStart.value) {
    return
  }

  const deltaX = planDragOffsetX.value
  const minSwipeDistance = 42
  const swipedNext = deltaX <= -minSwipeDistance
  const swipedPrevious = deltaX >= minSwipeDistance
  const horizontalSwipe = planDragAxis.value === "horizontal"

  if (!horizontalSwipe || !shouldNavigate) {
    resetPlanDrag()
    return
  }

  if (swipedNext) {
    resetPlanDrag(false)
    swipeReleaseDirection.value = "next"
    swipeSwitchTimeout = setTimeout(() => {
      goToNextPlan()
      swipeReleaseDirection.value = null
      planDragOffsetX.value = 0
    }, 175)
    return
  }

  if (swipedPrevious) {
    resetPlanDrag(false)
    swipeReleaseDirection.value = "prev"
    swipeSwitchTimeout = setTimeout(() => {
      goToPreviousPlan()
      swipeReleaseDirection.value = null
      planDragOffsetX.value = 0
    }, 175)
    return
  }

  resetPlanDrag()
}

const handlePlanPointerUp = (event: PointerEvent) => {
  if (!planDragStart.value || event.pointerId !== planDragStart.value.pointerId) {
    return
  }

  finalizePlanDrag(true)

  const target = event.currentTarget as HTMLElement | null
  target?.releasePointerCapture?.(event.pointerId)
}

const handlePlanPointerCancel = (event: PointerEvent) => {
  if (!planDragStart.value || event.pointerId !== planDragStart.value.pointerId) {
    return
  }

  finalizePlanDrag(false)

  const target = event.currentTarget as HTMLElement | null
  target?.releasePointerCapture?.(event.pointerId)
}

const handlePlanPointerLeave = (event: PointerEvent) => {
  if (!planDragStart.value || event.pointerId !== planDragStart.value.pointerId) {
    return
  }

  if (event.pointerType === "mouse") {
    finalizePlanDrag(false)
  }
}

watch(planCount, (count) => {
  if (!count) {
    mobilePlanIndex.value = 0
    return
  }

  if (mobilePlanIndex.value >= count) {
    mobilePlanIndex.value = 0
  }
})

watch(() => trustPillars.value.length, (count) => {
  if (!count) {
    activeTrustPillarIndex.value = 0
    return
  }

  if (activeTrustPillarIndex.value >= count) {
    activeTrustPillarIndex.value = 0
  }
})

onMounted(() => {
  trustPillarCycleInterval = setInterval(() => {
    const count = trustPillars.value.length

    if (count < 2) {
      return
    }

    activeTrustPillarIndex.value = (activeTrustPillarIndex.value + 1) % count
  }, 2600)
})

onBeforeUnmount(() => {
  if (swipeSwitchTimeout) {
    clearTimeout(swipeSwitchTimeout)
  }

  if (!trustPillarCycleInterval) {
    return
  }

  clearInterval(trustPillarCycleInterval)
})

const panelStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
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

  return {
    opacity: "1",
    transform: "translate3d(0, 0, 0)",
    transitionDelay: `${index * 70 + 260}ms`,
  }
}
</script>

<style scoped>
.mobile-plan-fade-enter-active,
.mobile-plan-fade-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}

.mobile-plan-fade-enter-from {
  opacity: 0;
  transform: scale(0.988);
}

.mobile-plan-fade-leave-to {
  opacity: 0;
  transform: scale(0.992);
}

.mobile-pillar-carousel-enter-active,
.mobile-pillar-carousel-leave-active {
  transition: transform 280ms ease, opacity 280ms ease;
}

.mobile-pillar-carousel-enter-from {
  opacity: 0;
  transform: translate3d(18px, 0, 0);
}

.mobile-pillar-carousel-leave-to {
  opacity: 0;
  transform: translate3d(-18px, 0, 0);
}
</style>
