<template>
  <header class="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-4 dark:border-white/10 dark:bg-slate-950 lg:px-6">
    <div class="flex min-w-0 items-center gap-2">
      <UButton color="neutral" variant="ghost" size="xl" square class="lg:hidden" @click="openMobileSidebar()">
        <UIcon name="i-lucide-menu" class="h-5 w-5" />
      </UButton>

      <nav aria-label="Breadcrumb" class="flex min-w-0 items-center gap-1.5 text-sm">
        <NuxtLink
          v-for="(crumb, i) in crumbs"
          :key="crumb.to"
          :to="crumb.to"
          class="truncate transition-colors"
          :class="i === crumbs.length - 1
            ? 'font-semibold text-[#0f172a] dark:text-slate-100'
            : 'font-medium text-[#94a3b8] hover:text-[#64748b] dark:text-slate-500 dark:hover:text-slate-400'"
        >
          {{ crumb.label }}
        </NuxtLink>
        <UIcon
          v-if="crumbs.length > 0"
          name="i-lucide-chevron-right"
          class="h-3.5 w-3.5 shrink-0 text-[#cbd5e1] dark:text-slate-600"
        />
        <span class="truncate font-semibold text-[#0f172a] dark:text-slate-100">{{ current }}</span>
      </nav>
    </div>

    <div class="flex shrink-0 items-center gap-2">
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

const routeSegments = computed(() => route.path.split("/").filter(Boolean))

const crumbMap = computed(() => ({
  dashboard: t("app.nav.dashboard"),
  schedule: t("app.nav.schedule"),
  clients: t("app.nav.clients"),
  messages: t("app.nav.messages"),
  reports: t("app.nav.reports"),
  settings: t("app.nav.settings"),
  profile: t("app.profile.title"),
} as Record<string, string>))

const crumbs = computed(() => {
  const segments = routeSegments.value
  const map = crumbMap.value
  if (segments.length <= 1) return []

  const parents = segments.slice(0, -1)
  let path = ""
  return parents.map((seg) => {
    path += `/${seg}`
    return { label: map[seg] ?? seg, to: path }
  })
})

const current = computed(() => {
  const segments = routeSegments.value
  const map = crumbMap.value
  const last = segments[segments.length - 1] ?? "dashboard"
  return map[last] ?? last
})

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
