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
      <LandingLoop />
    </main>

    <div>
      <LandingFooter :app-name="appName" :footer-links="footerLinks" :current-year="currentYear" />
    </div>
    <LandingBackToTop :visible="isBackToTopVisible" />
  </div>
</template>

<script setup lang="ts">
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

definePageMeta({
  name: "public-home",
})

type FooterColumn = {
  title: string
  items: FooterLinkItem[]
}

type FooterLinkItem = {
  label: string
  href?: string
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

type TopLogoItem = {
  name: string
  icon: string
  color: string
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
const isBackToTopVisible = ref(false)

const updateBackToTopVisibility = () => {
  const currentBottom = window.scrollY + window.innerHeight
  const pageBottom = document.documentElement.scrollHeight
  isBackToTopVisible.value = currentBottom >= pageBottom - 120
}

onMounted(() => {
  updateBackToTopVisibility()
  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true })
  window.addEventListener("resize", updateBackToTopVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateBackToTopVisibility)
  window.removeEventListener("resize", updateBackToTopVisibility)
})

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

const topLogos: TopLogoItem[] = [
  { name: "Bun", icon: "i-simple-icons-bun", color: "#D2A35C" },
  { name: "Nuxt", icon: "i-simple-icons-nuxt", color: "#00DC82" },
  { name: "MongoDB", icon: "i-simple-icons-mongodb", color: "#47A248" },
  { name: "TypeScript", icon: "i-simple-icons-typescript", color: "#3178C6" },
  { name: "RabbitMQ", icon: "i-simple-icons-rabbitmq", color: "#FF6600" },
  { name: "Resend", icon: "i-simple-icons-resend", color: "#111111" },
  { name: "Docker", icon: "i-simple-icons-docker", color: "#2496ED" },
  { name: "Cloudflare", icon: "i-simple-icons-cloudflare", color: "#F38020" },
  { name: "WhatsApp Business", icon: "i-simple-icons-whatsapp", color: "#25D366" },
  { name: "NestJS", icon: "i-simple-icons-nestjs", color: "#E0234E" },
  { name: "Vue", icon: "i-simple-icons-vuedotjs", color: "#4FC08D" },
]

const feedbackPreview = computed<FeedbackPreviewItem[]>(() => [
  { title: t("landing.feedbackPreview.item1.title"), subtitle: t("landing.feedbackPreview.item1.subtitle"), score: "+18%" },
  { title: t("landing.feedbackPreview.item2.title"), subtitle: t("landing.feedbackPreview.item2.subtitle"), score: "+12%" },
  { title: t("landing.feedbackPreview.item3.title"), subtitle: t("landing.feedbackPreview.item3.subtitle"), score: "+6%" },
])

const notifications = computed<NotificationItem[]>(() => [
  { title: t("landing.notifications.item1.title"), description: t("landing.notifications.item1.description") },
  { title: t("landing.notifications.item2.title"), description: t("landing.notifications.item2.description") },
  { title: t("landing.notifications.item3.title"), description: t("landing.notifications.item3.description") },
  { title: t("landing.notifications.item4.title"), description: t("landing.notifications.item4.description") },
  { title: t("landing.notifications.item5.title"), description: t("landing.notifications.item5.description") },
  { title: t("landing.notifications.item6.title"), description: t("landing.notifications.item6.description") },
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

const footerLinks = computed<FooterColumn[]>(() => [
  {
    title: t("landing.footer.links.product.title"),
    items: [
      { label: t("landing.footer.links.product.features") },
      { label: t("landing.footer.links.product.pricing") },
      { label: t("landing.footer.links.product.integrations") },
    ],
  },
  {
    title: t("landing.footer.links.company.title"),
    items: [
      { label: t("landing.footer.links.company.about") },
      { label: t("landing.footer.links.company.careers") },
      { label: t("landing.footer.links.company.press") },
    ],
  },
  {
    title: t("landing.footer.links.resources.title"),
    items: [
      { label: t("landing.footer.links.resources.blog") },
      { label: t("landing.footer.links.resources.docs") },
      { label: t("landing.footer.links.resources.support") },
      { label: t("landing.footer.links.resources.technologies"), href: "/technologies" },
    ],
  },
  {
    title: t("landing.footer.links.legal.title"),
    items: [
      { label: t("landing.footer.links.legal.terms") },
      { label: t("landing.footer.links.legal.privacy") },
      { label: t("landing.footer.links.legal.cookies") },
    ],
  },
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
