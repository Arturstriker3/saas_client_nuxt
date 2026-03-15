<template>
  <div class="bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <LandingHeader
      :is-header-elevated="isHeaderElevated"
      :nav-items="navItems"
      :mobile-nav-items="mobileNavItems"
      :locale-menu-items="localeMenuItems"
      :selected-locale-icon="selectedLocaleIcon"
      :theme-icon="themeIcon"
      :is-mobile-menu-open="isMobileMenuOpen"
      @toggle-theme="toggleTheme"
      @update:is-mobile-menu-open="isMobileMenuOpen = $event"
    />

    <main>
      <LandingHero :hero-lines-style="heroLinesStyle" :trust-items="heroTrustItems" />
      <LandingTopLogos :logos="topLogos" />
      <LandingFeatures :feedback-preview="feedbackPreview" />
      <LandingNotifications :notifications="notifications" />
      <LandingMetrics :metrics="metrics" :quotes="quotes" />
      <LandingBrands :brands="brands" />
      <LandingLoop :dashboard-cards="dashboardCards" />
    </main>

    <LandingFooter :app-name="appName" :footer-links="footerLinks" :current-year="currentYear" />
  </div>
</template>

<script setup lang="ts">
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

type FooterColumn = {
  title: string
  items: string[]
}

type MobileNavItem = {
  label: string
  icon: string
}

type HeroTrustItem = {
  value: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
  trigger: string
  icon: string
}

type FeedbackPreviewItem = {
  title: string
  subtitle: string
  score: string
}

type NotificationItem = {
  title: string
  description: string
}

type MetricItem = {
  label: string
  value: string
}

type QuoteItem = {
  message: string
  author: string
}

type LocaleMenuItem = {
  label: string
  icon: string
  onSelect: () => Promise<void> | void
}

const { public: { appName } } = useRuntimeConfig()
const { t } = useI18n()
const { locale, availableLocales, changeLocale } = useLocaleSwitcher()
const colorMode = useColorMode()
const isMobileMenuOpen = ref(false)
const { y } = useWindowScroll()

const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const localeMenuItems = computed<LocaleMenuItem[]>(() =>
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

const isHeaderElevated = computed(() => y.value > 12)

const navItems = computed<string[]>(() => [
  t("landing.nav.product"),
  t("landing.nav.home"),
  t("landing.nav.shop"),
  t("landing.nav.pages"),
])

const mobileNavItems = computed<MobileNavItem[]>(() => [
  { label: t("landing.nav.product"), icon: "i-lucide-package" },
  { label: t("landing.nav.home"), icon: "i-lucide-house" },
  { label: t("landing.nav.shop"), icon: "i-lucide-shopping-bag" },
  { label: t("landing.nav.pages"), icon: "i-lucide-files" },
])

const heroTrustItems = computed<HeroTrustItem[]>(() => [
  {
    value: 37,
    decimals: 0,
    prefix: "+",
    suffix: "%",
    label: t("landing.hero.trust.item1"),
    trigger: t("landing.hero.trust.trigger1"),
    icon: "i-lucide-trending-up",
  },
  {
    value: 52,
    decimals: 0,
    prefix: "-",
    suffix: "%",
    label: t("landing.hero.trust.item2"),
    trigger: t("landing.hero.trust.trigger2"),
    icon: "i-lucide-bell-ring",
  },
  {
    value: 4,
    decimals: 0,
    suffix: " min",
    label: t("landing.hero.trust.item3"),
    trigger: t("landing.hero.trust.trigger3"),
    icon: "i-lucide-rocket",
  },
])

const topLogos = ["PATREON", "airbnb", "Topticals", "cobana", "Griffin", "hipcast", "RAYO", "Snyk"]

const feedbackPreview = computed<FeedbackPreviewItem[]>(() => [
  { title: t("landing.feedbackPreview.item1.title"), subtitle: t("landing.feedbackPreview.item1.subtitle"), score: "+18%" },
  { title: t("landing.feedbackPreview.item2.title"), subtitle: t("landing.feedbackPreview.item2.subtitle"), score: "+12%" },
  { title: t("landing.feedbackPreview.item3.title"), subtitle: t("landing.feedbackPreview.item3.subtitle"), score: "+6%" },
])

const notifications = computed<NotificationItem[]>(() => [
  { title: t("landing.notifications.item1.title"), description: t("landing.notifications.item1.description") },
  { title: t("landing.notifications.item2.title"), description: t("landing.notifications.item2.description") },
  { title: t("landing.notifications.item3.title"), description: t("landing.notifications.item3.description") },
])

const metrics = computed<MetricItem[]>(() => [
  { label: t("landing.metrics.item1.label"), value: "$240" },
  { label: t("landing.metrics.item2.label"), value: "1739" },
])

const quotes = computed<QuoteItem[]>(() => [
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

const dashboardCards = computed<string[]>(() => [
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

const currentYear = new Date().getFullYear()

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
  title: () => `${appName} | ${t("landing.seo.title")}`,
  description: () => t("landing.seo.description"),
})
</script>
