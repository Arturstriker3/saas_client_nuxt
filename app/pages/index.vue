<template>
  <div class="bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-slate-950/90">
      <div class="layout-container grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4 lg:hidden">
        <img src="/app-logo.svg" alt="Logo" class="h-11 w-11 shrink-0" >
        <div class="flex items-center justify-center">
          <UButton color="primary" size="sm" class="rounded-full px-4 text-sm whitespace-nowrap">
            {{ t("landing.header.startForFree") }}
          </UButton>
        </div>
        <div class="flex shrink-0 items-center justify-end">
          <UButton color="neutral" variant="outline" size="xl" square @click="isMobileMenuOpen = true">
            <UIcon name="i-lucide-menu" class="h-5 w-5" />
          </UButton>
        </div>
      </div>

      <div class="layout-container hidden items-center justify-between gap-6 py-4 lg:flex">
        <div class="flex min-w-0 items-center gap-10">
          <img src="/app-logo.svg" alt="Logo" class="h-12 w-12 shrink-0" >
          <nav class="hidden min-w-0 items-center gap-7 text-base font-semibold text-[#334155] lg:flex dark:text-slate-300">
            <a v-for="item in navItems" :key="item" href="#" class="whitespace-nowrap transition hover:text-[#0f172a] dark:hover:text-slate-100">{{ item }}</a>
          </nav>
        </div>
        <div class="flex shrink-0 items-center gap-3">
          <UButton color="neutral" variant="ghost" size="lg" class="min-w-24 justify-center text-base whitespace-nowrap">{{ t("landing.header.login") }}</UButton>
          <UButton color="primary" size="lg" class="min-w-36 justify-center rounded-full px-6 text-base whitespace-nowrap">
            {{ t("landing.header.startForFree") }}
          </UButton>
          <div class="h-6 w-px bg-black/10 dark:bg-white/15" />
          <UDropdownMenu :items="localeMenuItems" :content="{ align: 'start' }">
            <UButton color="neutral" variant="outline" size="xl" square>
              <UIcon :name="selectedLocaleIcon" class="h-5 w-5" />
            </UButton>
          </UDropdownMenu>
          <UButton color="neutral" variant="outline" size="xl" square @click="toggleTheme">
            <UIcon :name="themeIcon" class="h-5 w-5" />
          </UButton>
        </div>
      </div>

      <USlideover v-model:open="isMobileMenuOpen" side="right" :close="false">
        <template #header="{ close }">
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center gap-2">
              <UDropdownMenu :items="localeMenuItems" :content="{ align: 'end' }">
                <UButton color="neutral" variant="outline" size="xl" square>
                  <UIcon :name="selectedLocaleIcon" class="h-5 w-5" />
                </UButton>
              </UDropdownMenu>
              <UButton color="neutral" variant="outline" size="xl" square @click="toggleTheme">
                <UIcon :name="themeIcon" class="h-5 w-5" />
              </UButton>
            </div>
            <UButton color="neutral" variant="outline" size="xl" square class="ml-auto" @click="close">
              <UIcon name="i-lucide-x" class="h-5 w-5" />
            </UButton>
          </div>
        </template>

        <template #body="{ close }">
          <div class="space-y-6">
            <div class="space-y-2">
              <a
                v-for="item in mobileNavItems"
                :key="item.label"
                href="#"
                class="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-base font-semibold text-[#334155] transition hover:border-black/20 hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/10"
                @click="close"
              >
                <UIcon :name="item.icon" class="h-5 w-5 text-primary" />
                <span>{{ item.label }}</span>
              </a>
            </div>

            <div class="space-y-3 border-t border-black/10 pt-4 dark:border-white/15">
              <UButton color="neutral" variant="ghost" size="lg" block class="justify-center gap-2 text-base" @click="close">
                <UIcon name="i-lucide-log-in" class="h-5 w-5" />
                {{ t("landing.header.login") }}
              </UButton>
            </div>
          </div>
        </template>
      </USlideover>
    </header>

    <main>
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 opacity-80" :style="heroLinesStyle" />
        <div class="layout-container relative flex flex-col items-center pb-18 pt-20 text-center">
          <p class="mb-5 rounded-full border border-(--ui-primary) bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--ui-primary) dark:bg-slate-900">
            {{ t("landing.hero.tagline") }}
          </p>
          <h1 class="min-h-[3.3em] max-w-5xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight md:min-h-[2.2em] md:max-w-6xl md:text-7xl">
            {{ t("landing.hero.title") }}
          </h1>
          <p class="mt-6 min-h-14 max-w-3xl text-lg text-[#64748b] dark:text-slate-300">
            {{ t("landing.hero.subtitle") }}
          </p>
        </div>
      </section>

      <section class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
        <div class="layout-container grid grid-cols-2 items-center gap-8 py-8 text-center sm:grid-cols-4 lg:grid-cols-8">
          <p v-for="logo in topLogos" :key="logo" class="text-sm font-semibold tracking-wide text-[#1e293b] dark:text-slate-300">
            {{ logo }}
          </p>
        </div>
      </section>

      <section class="layout-container space-y-16 py-20">
        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">{{ t("landing.features.workflowsLabel") }}</p>
            <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.shareTitle") }}</h2>
            <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
              {{ t("landing.features.shareSubtitle") }}
            </p>
            <div class="mt-6 flex items-center gap-3 text-sm font-semibold text-[#0f172a] dark:text-slate-100">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">→</span>
              {{ t("landing.features.seeAllFeatures") }}
            </div>
          </div>
          <div class="rounded-3xl bg-[#0f111a] p-6 shadow-2xl">
            <div class="rounded-2xl border border-white/10 bg-[#121826] p-5 text-left text-xs text-white/70">
              <p class="text-white/40">index.ts</p>
              <div class="mt-4 space-y-2 font-mono">
                <p><span class="text-[#f97316]">const</span> cloudhub = <span class="text-[#22d3ee]">create</span>()</p>
                <p><span class="text-[#22c55e]">monitor</span>(users, workflows)</p>
                <p><span class="text-[#a78bfa]">share</span>(reports)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div class="order-2 rounded-3xl bg-[#0f111a] p-6 shadow-2xl lg:order-1">
            <div class="space-y-3 rounded-2xl border border-white/10 bg-[#161b2c] p-4">
              <div v-for="feedback in feedbackPreview" :key="feedback.title" class="flex items-center justify-between rounded-xl bg-[#0f1322] p-3">
                <div>
                  <p class="text-sm font-semibold text-white">{{ feedback.title }}</p>
                  <p class="text-xs text-white/60">{{ feedback.subtitle }}</p>
                </div>
                <UBadge color="success" variant="soft">{{ feedback.score }}</UBadge>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">{{ t("landing.features.commentsLabel") }}</p>
            <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.feedbackTitle") }}</h2>
            <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
              {{ t("landing.features.feedbackSubtitle") }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-primary py-20 text-white">
        <div class="layout-container">
          <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.notifications.title") }}</h2>
          <div class="mt-10 rounded-3xl bg-[#111827] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div class="grid gap-4 md:grid-cols-3">
              <div v-for="notification in notifications" :key="notification.title" class="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                <p class="text-sm font-semibold">{{ notification.title }}</p>
                <p class="mt-1 text-xs text-white/70">{{ notification.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
        <div class="layout-container py-16">
          <h3 class="text-center text-3xl font-extrabold tracking-tight">{{ t("landing.brands.title") }}</h3>
          <div class="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div v-for="brand in brands" :key="brand" class="rounded-xl border border-black/10 px-4 py-4 text-sm font-bold text-[#334155] dark:border-white/10 dark:text-slate-300">
              {{ brand }}
            </div>
          </div>
        </div>
      </section>

      <section class="bg-primary py-20 text-white">
        <div class="layout-container">
          <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.loop.title") }}</h2>
          <p class="mx-auto mt-4 max-w-2xl text-center text-white/90">
            {{ t("landing.loop.subtitle") }}
          </p>
          <div class="mt-10 rounded-3xl border border-white/20 bg-[#111827] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div class="grid gap-4 md:grid-cols-4">
              <div v-for="card in dashboardCards" :key="card" class="rounded-xl border border-white/10 bg-[#0f172a] p-4">
                <p class="text-sm font-semibold">{{ card }}</p>
                <div class="mt-3 h-10 rounded-md bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
      <div class="layout-container py-12">
        <div class="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <img src="/app-logo.svg" alt="Logo" class="h-11 w-11" >
              <span class="text-sm font-extrabold tracking-tight">{{ appName }}</span>
            </div>
            <p class="mt-4 max-w-xs text-sm text-[#64748b] dark:text-slate-300">
              {{ t("landing.footer.description") }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-10 text-sm sm:grid-cols-4">
            <div v-for="column in footerLinks" :key="column.title">
              <p class="font-semibold">{{ column.title }}</p>
              <ul class="mt-3 space-y-2 text-[#64748b] dark:text-slate-300">
                <li v-for="item in column.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

type FooterColumn = {
  title: string
  items: string[]
}

const { public: { appName } } = useRuntimeConfig()
const { t } = useI18n()
const { locale, availableLocales, changeLocale } = useLocaleSwitcher()
const colorMode = useColorMode()
const isMobileMenuOpen = ref(false)

const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const localeMenuItems = computed(() =>
  availableLocales.value.map((localeOption) => {
    const localeCode = localeOption.code as SupportedLocale
    const icon = localeFlagIcons[localeCode] ?? "i-lucide-globe"

    return {
      label: localeOption.name,
      icon,
      onSelect: async () => {
        await changeLocale(localeCode)
      },
    }
  }),
)

const selectedLocaleIcon = computed(() => {
  const localeCode = locale.value as SupportedLocale
  return localeFlagIcons[localeCode] ?? "i-lucide-globe"
})

const navItems = computed(() => [
  t("landing.nav.product"),
  t("landing.nav.home"),
  t("landing.nav.shop"),
  t("landing.nav.pages"),
])

const mobileNavItems = computed(() => [
  { label: t("landing.nav.product"), icon: "i-lucide-package" },
  { label: t("landing.nav.home"), icon: "i-lucide-house" },
  { label: t("landing.nav.shop"), icon: "i-lucide-shopping-bag" },
  { label: t("landing.nav.pages"), icon: "i-lucide-files" },
])
const topLogos = ["PATREON", "airbnb", "Topticals", "cobana", "Griffin", "hipcast", "RAYO", "Snyk"]

const feedbackPreview = computed(() => [
  { title: t("landing.feedbackPreview.item1.title"), subtitle: t("landing.feedbackPreview.item1.subtitle"), score: "+18%" },
  { title: t("landing.feedbackPreview.item2.title"), subtitle: t("landing.feedbackPreview.item2.subtitle"), score: "+12%" },
  { title: t("landing.feedbackPreview.item3.title"), subtitle: t("landing.feedbackPreview.item3.subtitle"), score: "+6%" },
])

const notifications = computed(() => [
  { title: t("landing.notifications.item1.title"), description: t("landing.notifications.item1.description") },
  { title: t("landing.notifications.item2.title"), description: t("landing.notifications.item2.description") },
  { title: t("landing.notifications.item3.title"), description: t("landing.notifications.item3.description") },
])

const metrics = computed(() => [
  { label: t("landing.metrics.item1.label"), value: "$240" },
  { label: t("landing.metrics.item2.label"), value: "1739" },
])

const quotes = computed(() => [
  {
    message: t("landing.quotes.item1.message"),
    author: t("landing.quotes.item1.author"),
  },
  {
    message: t("landing.quotes.item2.message"),
    author: t("landing.quotes.item2.author"),
  },
])

const brands = ["UPWORK", "AIRBUS", "HAYS", "SENTRY", "MEDWING", "AUTO DESK", "Linear", "Autolader"]
const dashboardCards = computed(() => [
  t("landing.dashboardCards.projects"),
  t("landing.dashboardCards.design"),
  t("landing.dashboardCards.development"),
  t("landing.dashboardCards.testing"),
])

const footerLinks = computed<FooterColumn[]>(() => [
  { title: t("landing.footer.links.product.title"), items: [t("landing.footer.links.product.features"), t("landing.footer.links.product.pricing"), t("landing.footer.links.product.integrations")] },
  { title: t("landing.footer.links.company.title"), items: [t("landing.footer.links.company.about"), t("landing.footer.links.company.careers"), t("landing.footer.links.company.press")] },
  { title: t("landing.footer.links.resources.title"), items: [t("landing.footer.links.resources.blog"), t("landing.footer.links.resources.docs"), t("landing.footer.links.resources.support")] },
  { title: t("landing.footer.links.legal.title"), items: [t("landing.footer.links.legal.terms"), t("landing.footer.links.legal.privacy"), t("landing.footer.links.legal.cookies")] },
])

const themeIcon = computed(() => (colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon"))

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}

const heroLinesStyle = {
  background: `
    radial-gradient(circle at 50% 8%, rgba(16,185,129,0.17), transparent 52%),
    repeating-linear-gradient(
      170deg,
      rgba(16,185,129,0.18) 0px,
      rgba(16,185,129,0.18) 1px,
      transparent 1px,
      transparent 36px
    )
  `,
}

useSeoMeta({
  title: () => `${appName} — ${t("landing.seo.title")}`,
  description: () => t("landing.seo.description"),
})

</script>
