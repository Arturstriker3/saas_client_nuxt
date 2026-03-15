<template>
  <div class="bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-slate-950/90">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-(--ui-primary) text-xs font-bold text-white">
            C
          </div>
          <span class="text-sm font-extrabold tracking-tight">{{ appName }}</span>
        </div>
        <nav class="hidden items-center gap-7 text-sm font-medium text-[#334155] lg:flex dark:text-slate-300">
          <a v-for="item in navItems" :key="item" href="#" class="transition hover:text-[#0f172a] dark:hover:text-slate-100">{{ item }}</a>
        </nav>
        <div class="flex items-center gap-2 sm:gap-3">
          <USelectMenu
            v-model="selectedLocale"
            value-key="code"
            label-key="label"
            :search-input="false"
            :items="localeOptions"
            :icon="selectedLocaleOption?.icon"
            class="w-36 sm:w-44"
          />
          <UButton color="neutral" variant="outline" size="lg" square @click="toggleTheme">
            <UIcon :name="themeIcon" class="h-5 w-5" />
          </UButton>
          <UButton color="neutral" variant="ghost" size="lg">{{ t("landing.header.login") }}</UButton>
          <UButton color="primary" size="lg" class="rounded-full px-6">
            {{ t("landing.header.startForFree") }}
          </UButton>
        </div>
      </div>
    </header>

    <main>
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 opacity-80" :style="heroLinesStyle" />
        <div class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-18 pt-20 text-center sm:px-6 lg:px-8">
          <p class="mb-5 rounded-full border border-(--ui-primary) bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--ui-primary) dark:bg-slate-900">
            {{ t("landing.hero.tagline") }}
          </p>
          <h1 class="max-w-5xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight md:max-w-6xl md:text-7xl">
            {{ t("landing.hero.title") }}
          </h1>
          <p class="mt-6 max-w-3xl text-lg text-[#64748b] dark:text-slate-300">
            {{ t("landing.hero.subtitle") }}
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <UButton color="primary" size="lg" class="rounded-full px-8">
              {{ t("landing.hero.startForFree") }}
            </UButton>
            <button class="inline-flex items-center gap-2 text-sm font-semibold text-[#334155] transition hover:text-[#0f172a] dark:text-slate-300 dark:hover:text-slate-100">
              <span class="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white dark:border-white/20 dark:bg-slate-900">
                <UIcon name="i-lucide-play" class="h-4 w-4 text-(--ui-primary)" />
              </span>
              {{ t("landing.hero.demoCta") }}
            </button>
          </div>
        </div>
      </section>

      <section class="border-y border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
        <div class="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-8 px-4 py-8 text-center sm:grid-cols-4 sm:px-6 lg:grid-cols-8 lg:px-8">
          <p v-for="logo in topLogos" :key="logo" class="text-sm font-semibold tracking-wide text-[#1e293b] dark:text-slate-300">
            {{ logo }}
          </p>
        </div>
      </section>

      <section class="mx-auto w-full max-w-7xl space-y-16 px-4 py-20 sm:px-6 lg:px-8">
        <div class="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-(--ui-primary)">{{ t("landing.features.workflowsLabel") }}</p>
            <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.shareTitle") }}</h2>
            <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
              {{ t("landing.features.shareSubtitle") }}
            </p>
            <div class="mt-6 flex items-center gap-3 text-sm font-semibold text-[#0f172a] dark:text-slate-100">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-(--ui-primary) text-white">→</span>
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
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-(--ui-primary)">{{ t("landing.features.commentsLabel") }}</p>
            <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.feedbackTitle") }}</h2>
            <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
              {{ t("landing.features.feedbackSubtitle") }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-(--ui-primary) py-20 text-white">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <section class="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.metrics.title") }}</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <UCard v-for="metric in metrics" :key="metric.label" class="rounded-3xl border border-black/10 dark:border-white/10">
            <div class="space-y-4">
              <p class="text-sm text-[#64748b] dark:text-slate-300">{{ metric.label }}</p>
              <p class="text-4xl font-extrabold">{{ metric.value }}</p>
              <div class="h-20 rounded-xl bg-gradient-to-r from-[#fff1ec] to-[#ffe8e2]" />
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
        <div class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h3 class="text-center text-3xl font-extrabold tracking-tight">{{ t("landing.brands.title") }}</h3>
          <div class="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div v-for="brand in brands" :key="brand" class="rounded-xl border border-black/10 px-4 py-4 text-sm font-bold text-[#334155] dark:border-white/10 dark:text-slate-300">
              {{ brand }}
            </div>
          </div>
        </div>
      </section>

      <section class="bg-(--ui-primary) py-20 text-white">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <div class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-(--ui-primary) text-xs font-bold text-white">
                C
              </div>
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
const selectedLocale = ref<SupportedLocale>(locale.value as SupportedLocale)
const colorMode = useColorMode()

const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const localeOptions = computed(() =>
  availableLocales.value.map((localeOption) => {
    const localeCode = localeOption.code as SupportedLocale
    const icon = localeFlagIcons[localeCode] ?? "i-lucide-globe"

    return {
      ...localeOption,
      label: localeOption.name,
      icon,
    }
  }),
)

const selectedLocaleOption = computed(() =>
  localeOptions.value.find((localeOption) => localeOption.code === selectedLocale.value),
)

const navItems = computed(() => [
  t("landing.nav.product"),
  t("landing.nav.home"),
  t("landing.nav.shop"),
  t("landing.nav.pages"),
  t("landing.nav.integrations"),
  t("landing.nav.developers"),
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

watch(selectedLocale, async (nextLocale) => {
  await changeLocale(nextLocale)
})

watch(locale, (nextLocale) => {
  selectedLocale.value = nextLocale as SupportedLocale
})
</script>
