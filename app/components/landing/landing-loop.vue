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
        <p class="mt-3 text-center text-sm text-white/85">{{ t(`landing.pricing.framing.${selectedCycle}`) }}</p>
      </div>
      <div class="mt-10 rounded-3xl border border-white/20 bg-[#111827] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out" :style="panelStyle">
        <div class="mb-6 grid gap-2 md:grid-cols-3">
          <div v-for="pillar in trustPillars" :key="pillar.label" class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
            <UIcon :name="pillar.icon" class="h-4 w-4 text-emerald-300" />
            <span>{{ pillar.label }}</span>
          </div>
        </div>
        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="(plan, index) in pricingPlans"
            :key="plan.id"
            class="relative rounded-2xl border p-6 transition-all duration-500 ease-out"
            :class="plan.highlight ? 'border-emerald-300/70 bg-[#0e1c2f]' : 'border-white/10 bg-[#0f172a]'"
            :style="getCardStyle(index)"
          >
            <span v-if="plan.discountSeal" class="absolute left-4 top-4 rounded-full border border-emerald-200/30 bg-emerald-300/15 px-3 py-1 text-[0.7rem] font-bold text-emerald-100">
              {{ plan.discountSeal }}
            </span>
            <span v-if="plan.badge" class="absolute right-4 top-4 rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-semibold text-emerald-200">
              {{ plan.badge }}
            </span>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/60" :class="plan.discountSeal ? 'mt-8' : ''">{{ plan.name }}</p>
            <p class="mt-2 text-sm text-white/80">{{ plan.description }}</p>
            <div class="mt-5 flex items-end gap-2">
              <p class="text-4xl font-extrabold leading-none">{{ plan.price }}</p>
              <p class="pb-1 text-sm text-white/70">{{ t("landing.pricing.perMonth") }}</p>
            </div>
            <p v-if="plan.cycleSavings" class="mt-2 text-xs font-semibold text-emerald-200">{{ plan.cycleSavings }}</p>
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
  cycleSavings?: string
  discountSeal?: string
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

const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)
const selectedCycle = ref<BillingCycle>("monthly")

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
  const cycleDiscountSeal = cycleSavings ? `${cycleLabel} ${cycleDiscount}` : ""

  return [
    {
      id: "basic",
      name: t("landing.pricing.plans.basic.name"),
      description: t("landing.pricing.plans.basic.description"),
      price: t(`landing.pricing.plans.basic.price${cycleKey}`),
      cycleSavings: cycleSavings ? t("landing.pricing.savingsTag", { value: cycleSavings }) : undefined,
      discountSeal: cycleDiscountSeal || undefined,
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
      cycleSavings: cycleSavings ? t("landing.pricing.savingsTag", { value: cycleSavings }) : undefined,
      discountSeal: cycleDiscountSeal || undefined,
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
      cycleSavings: cycleSavings ? t("landing.pricing.savingsTag", { value: cycleSavings }) : undefined,
      discountSeal: cycleDiscountSeal || undefined,
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

  const direction = index === 1 ? -1 : 1

  return {
    opacity: "1",
    transform: `translate3d(0, ${parallaxOffset.value * direction * 0.18}px, 0)`,
    transitionDelay: `${index * 70 + 260}ms`,
  }
}
</script>
