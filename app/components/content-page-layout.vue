<template>
  <div class="relative min-h-screen bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 opacity-80 dark:opacity-70" :style="backgroundStyle" />
      <div class="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-emerald-100/60 via-cyan-100/30 to-transparent dark:from-emerald-700/25 dark:via-cyan-700/15 dark:to-transparent" />
    </div>

    <header class="sticky top-0 z-40 w-full border-b border-black/5 bg-white/90 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-slate-950/90">
      <div class="layout-container flex items-center justify-between gap-3 py-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-100">
          <UIcon name="i-lucide-arrow-left" class="h-4 w-4" />
          {{ backLabel }}
        </NuxtLink>
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
      </div>
    </header>

    <section :class="heroSectionClass">
      <div class="layout-container py-10 md:py-14">
        <div class="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors md:p-10 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_70px_rgba(2,6,23,0.45)]">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-primary">{{ eyebrow }}</p>
          <h1 class="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight md:text-5xl">{{ title }}</h1>
          <p class="mt-4 max-w-3xl text-base text-[#475569] dark:text-slate-300">{{ subtitle }}</p>
        </div>
      </div>
    </section>

    <main class="relative">
      <slot />
    </main>

    <section v-if="showFinalCta" class="relative">
      <div class="layout-container py-4 md:py-6">
        <div class="rounded-3xl bg-primary p-8 text-center text-white shadow-[0_20px_60px_rgba(16,185,129,0.28)]">
          <h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">{{ finalCtaTitle }}</h2>
          <p class="mx-auto mt-3 max-w-3xl text-sm text-white/90">{{ finalCtaDescription }}</p>
          <NuxtLink :to="finalCtaTo" class="mt-6 inline-flex justify-center">
            <UButton color="primary" variant="solid" size="xl" class="rounded-full bg-white px-8 text-base text-[#0f172a] hover:bg-white/90">
              {{ finalCtaLabel }}
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <LandingFooter :app-name="appName" :footer-links="footerLinks" :current-year="currentYear" />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"
import type { SupportedLocale } from "~/composables/use-locale-switcher.composable"

const props = withDefaults(defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  hideHeroOnMobile?: boolean
  backLabel?: string
  finalCtaTitle?: string
  finalCtaDescription?: string
  finalCtaLabel?: string
  finalCtaTo?: RouteLocationRaw
}>(), {
  hideHeroOnMobile: false,
  backLabel: "",
  finalCtaTitle: "",
  finalCtaDescription: "",
  finalCtaLabel: "",
  finalCtaTo: () => ({ name: "auth-register" }),
})

const { t } = useI18n()
const { locale, availableLocales, changeLocale } = useLocaleSwitcher()
const colorMode = useColorMode()
const { public: { appName } } = useRuntimeConfig()

const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const localeMenuItems = computed(() =>
  availableLocales.value.map((localeOption) => {
    const localeCode = localeOption.code as SupportedLocale

    return {
      label: localeOption.name,
      icon: localeFlagIcons[localeCode] ?? "i-lucide-globe",
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

const themeIcon = computed(() => (colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon"))

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}

const backLabel = computed(() => props.backLabel || t("landing.nav.home"))
const finalCtaTitle = computed(() => props.finalCtaTitle)
const finalCtaDescription = computed(() => props.finalCtaDescription)
const finalCtaLabel = computed(() => props.finalCtaLabel || t("landing.header.startForFree"))
const finalCtaTo = computed(() => props.finalCtaTo || { name: "auth-register" })
const showFinalCta = computed(() => Boolean(finalCtaTitle.value && finalCtaDescription.value))
const heroSectionClass = computed(() => (props.hideHeroOnMobile ? "relative hidden md:block" : "relative"))
const currentYear = new Date().getFullYear()

type FooterLinkItem = {
  label: string
  href?: string
}

type FooterColumn = {
  title: string
  items: FooterLinkItem[]
}

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
      { label: t("landing.footer.links.resources.technologies"), href: "/tecnologias" },
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

const backgroundStyle = {
  background: `
    radial-gradient(circle at 8% 6%, rgba(16,185,129,0.16), transparent 38%),
    radial-gradient(circle at 92% 10%, rgba(14,165,233,0.14), transparent 34%),
    repeating-linear-gradient(
      170deg,
      rgba(16,185,129,0.07) 0px,
      rgba(16,185,129,0.07) 1px,
      transparent 1px,
      transparent 34px
    )
  `,
}
</script>
