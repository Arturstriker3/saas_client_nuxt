<template>
  <header class="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-4 dark:border-white/10 dark:bg-slate-950 lg:px-6">
    <div class="flex items-center gap-3">
      <UButton color="neutral" variant="ghost" size="xl" square class="lg:hidden" @click="openMobileSidebar()">
        <UIcon name="i-lucide-menu" class="h-5 w-5" />
      </UButton>
      <h1 class="text-lg font-bold tracking-tight">{{ title }}</h1>
    </div>
    <div class="flex items-center gap-2">
      <UDropdownMenu :items="localeMenuItems" :content="{ align: 'end' }">
        <UButton color="neutral" variant="ghost" size="lg" square>
          <UIcon :name="selectedLocaleIcon" class="h-5 w-5" />
        </UButton>
      </UDropdownMenu>
      <UButton color="neutral" variant="ghost" size="lg" square @click="toggleTheme">
        <UIcon :name="themeIcon" class="h-5 w-5" />
      </UButton>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()
const route = useRoute()

const openMobileSidebar = inject<() => void>("dashboard:openMobile", () => {})

type SupportedLocale = "pt" | "en" | "es"
const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const routeTitles: Record<string, string> = {
  "/dashboard": t("app.nav.dashboard"),
  "/dashboard/schedule": t("app.nav.schedule"),
  "/dashboard/clients": t("app.nav.clients"),
  "/dashboard/messages": t("app.nav.messages"),
  "/dashboard/reports": t("app.nav.reports"),
  "/dashboard/settings": t("app.nav.settings"),
  "/dashboard/profile": t("app.profile.title"),
}

const title = computed(() => routeTitles[route.path] ?? t("app.nav.dashboard"))

const localeMenuItems = computed(() =>
  locales.value.map((l) => {
    const code = l.code as SupportedLocale
    return {
      label: l.name ?? code,
      icon: localeFlagIcons[code] ?? "i-lucide-globe",
      onSelect: async () => { if (code !== locale.value) await setLocale(code) },
    }
  }),
)

const selectedLocaleIcon = computed(() =>
  localeFlagIcons[(locale.value as SupportedLocale)] ?? "i-lucide-globe",
)

const themeIcon = computed(() => (colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon"))
const toggleTheme = () => { colorMode.preference = colorMode.value === "dark" ? "light" : "dark" }
</script>
