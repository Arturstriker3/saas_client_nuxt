<template>
  <ClientOnly>
    <div class="flex h-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
      <!-- Sidebar -->
      <aside
        class="hidden shrink-0 flex-col border-r border-black/5 bg-white transition-all duration-300 ease-in-out lg:flex dark:border-white/10 dark:bg-slate-950"
        :class="isSidebarCollapsed ? 'w-[72px]' : 'w-[260px]'"
      >
        <div class="flex h-16 items-center border-b border-black/5 px-4 dark:border-white/10">
          <button type="button" class="flex shrink-0 items-center overflow-hidden" @click="isSidebarCollapsed = !isSidebarCollapsed">
            <img
              v-if="isSidebarCollapsed"
              src="/favicon.svg"
              alt="Marcato"
              class="h-8 w-8 shrink-0 object-contain"
            >
            <div v-else class="flex items-center gap-3">
              <img src="/marcato.logo.png" alt="Marcato" class="h-9 w-auto shrink-0 object-contain">
            </div>
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <ul class="space-y-1">
            <li v-for="item in navItems" :key="item.key">
              <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors" :class="activeNav === item.key ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'text-[#64748b] hover:bg-black/5 hover:text-[#0f172a] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'" :title="isSidebarCollapsed ? item.label : undefined" @click.prevent="activeNav = item.key">
                <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
                <span class="whitespace-nowrap transition-opacity duration-200" :class="isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="border-t border-black/5 px-3 py-4 dark:border-white/10">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">{{ userInitials }}</div>
            <div class="min-w-0 flex-1 transition-opacity duration-200" :class="isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'">
              <p class="truncate text-sm font-semibold">{{ me?.name ?? t("app.user") }}</p>
              <p class="truncate text-xs text-[#64748b] dark:text-slate-400">{{ me?.email }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex min-w-0 flex-1 flex-col">
        <header class="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-black/5 bg-white px-4 dark:border-white/10 dark:bg-slate-950 lg:px-6">
          <div class="flex items-center gap-3">
            <UButton color="neutral" variant="ghost" size="xl" square class="lg:hidden" @click="isMobileMenuOpen = true"><UIcon name="i-lucide-menu" class="h-5 w-5" /></UButton>
            <h1 class="text-lg font-bold tracking-tight">{{ currentNavLabel }}</h1>
          </div>
          <div class="flex items-center gap-2">
            <UDropdownMenu :items="localeMenuItems" :content="{ align: 'end' }">
              <UButton color="neutral" variant="ghost" size="lg" square><UIcon :name="selectedLocaleIcon" class="h-5 w-5" /></UButton>
            </UDropdownMenu>
            <UButton color="neutral" variant="ghost" size="lg" square @click="toggleTheme"><UIcon :name="themeIcon" class="h-5 w-5" /></UButton>
            <UButton color="neutral" variant="ghost" size="lg" class="hidden gap-2 sm:inline-flex" @click="handleSignOut"><UIcon name="i-lucide-log-out" class="h-5 w-5" /><span>{{ t("app.signOut") }}</span></UButton>
          </div>
        </header>
        <main class="flex-1 overflow-y-auto p-4 lg:p-6">
          <div class="space-y-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-slate-900">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase tracking-[0.12em] text-[#64748b] dark:text-slate-400">{{ stat.label }}</span>
                  <span class="flex h-8 w-8 items-center justify-center rounded-lg" :class="stat.iconBg"><UIcon :name="stat.icon" class="h-4 w-4" :class="stat.iconColor" /></span>
                </div>
                <p class="mt-3 text-2xl font-extrabold tracking-tight">{{ stat.value }}</p>
                <p v-if="stat.change" class="mt-1 text-xs font-medium" :class="stat.changeColor">{{ stat.change }}</p>
              </article>
            </div>
            <div class="grid gap-4 lg:grid-cols-3">
              <div class="rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:col-span-2 dark:border-white/10 dark:bg-slate-900">
                <h2 class="text-lg font-bold tracking-tight">{{ t("app.activity.title") }}</h2>
                <p class="mt-1 text-sm text-[#64748b] dark:text-slate-400">{{ t("app.activity.subtitle") }}</p>
                <div class="mt-6 flex flex-col items-center justify-center py-10 text-center">
                  <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10"><UIcon name="i-lucide-calendar-check" class="h-8 w-8 text-emerald-500" /></div>
                  <p class="mt-4 text-sm font-medium text-[#64748b] dark:text-slate-400">{{ t("app.activity.empty") }}</p>
                  <UButton color="primary" size="sm" class="mt-3 rounded-xl">{{ t("app.activity.cta") }}</UButton>
                </div>
              </div>
              <div class="space-y-4">
                <div class="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                  <h2 class="text-sm font-bold tracking-tight">{{ t("app.quickActions.title") }}</h2>
                  <div class="mt-4 space-y-2">
                    <UButton v-for="action in quickActions" :key="action.key" color="neutral" variant="outline" size="lg" block class="justify-start gap-3 rounded-xl"><UIcon :name="action.icon" class="h-5 w-5 text-emerald-500" /><span class="text-sm font-medium">{{ action.label }}</span></UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <USlideover :open="isMobileMenuOpen" side="left" title="Menu" @update:open="isMobileMenuOpen = $event">
      <template #body="{ close }">
        <div class="space-y-1">
          <div class="mb-4 flex items-center gap-3 border-b border-black/10 pb-4 dark:border-white/10">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">{{ userInitials }}</div>
            <div class="min-w-0"><p class="truncate text-base font-semibold">{{ me?.name ?? t("app.user") }}</p><p class="truncate text-sm text-[#64748b] dark:text-slate-400">{{ me?.email }}</p></div>
          </div>
          <a v-for="item in navItems" :key="item.key" href="#" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors" :class="activeNav === item.key ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'text-[#64748b] hover:bg-black/5 hover:text-[#0f172a] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'" @click="activeNav = item.key; close()"><UIcon :name="item.icon" class="h-5 w-5 shrink-0" /><span>{{ item.label }}</span></a>
          <div class="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
            <UButton color="neutral" variant="ghost" size="lg" class="w-full justify-start gap-3 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300" @click="close(); handleSignOut()"><UIcon name="i-lucide-log-out" class="h-5 w-5" /><span>{{ t("app.signOut") }}</span></UButton>
          </div>
        </div>
      </template>
    </USlideover>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useLogoutMutation } from "~/modules/auth/mutations/use-logout.mutation"
import { useMeQuery } from "~/modules/auth/queries/use-me.query"

definePageMeta({ name: "dashboard" })

const { t, locale, locales, setLocale } = useI18n()
const { data: me } = useMeQuery()
const logoutMutation = useLogoutMutation()
const colorMode = useColorMode()

const isSidebarCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const activeNav = ref("dashboard")

type NavItem = { key: string; label: string; icon: string }

const navItems = computed<NavItem[]>(() => [
  { key: "dashboard", label: t("app.nav.dashboard"), icon: "i-lucide-layout-dashboard" },
  { key: "schedule", label: t("app.nav.schedule"), icon: "i-lucide-calendar-days" },
  { key: "clients", label: t("app.nav.clients"), icon: "i-lucide-users" },
  { key: "messages", label: t("app.nav.messages"), icon: "i-lucide-message-square" },
  { key: "reports", label: t("app.nav.reports"), icon: "i-lucide-bar-chart-3" },
  { key: "settings", label: t("app.nav.settings"), icon: "i-lucide-settings" },
])

const currentNavLabel = computed(() => navItems.value.find((n) => n.key === activeNav.value)?.label ?? t("app.nav.dashboard"))

const userInitials = computed(() => {
  const name = me.value?.name ?? ""
  return name ? name.split(" ").map((p) => p.charAt(0).toUpperCase()).slice(0, 2).join("") : "?"
})

type SupportedLocale = "pt" | "en" | "es"
const localeFlagIcons: Record<SupportedLocale, string> = { pt: "i-circle-flags-br", en: "i-circle-flags-us", es: "i-circle-flags-es" }

const localeMenuItems = computed(() => locales.value.map((l) => {
  const code = l.code as SupportedLocale
  return { label: l.name ?? code, icon: localeFlagIcons[code] ?? "i-lucide-globe", onSelect: async () => { if (code !== locale.value) await setLocale(code) } }
}))

const selectedLocaleIcon = computed(() => localeFlagIcons[(locale.value as SupportedLocale)] ?? "i-lucide-globe")
const themeIcon = computed(() => colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon")
const toggleTheme = () => { colorMode.preference = colorMode.value === "dark" ? "light" : "dark" }
const handleSignOut = async () => { await logoutMutation.mutateAsync() }

type StatItem = { label: string; value: string; change?: string; changeColor?: string; icon: string; iconBg: string; iconColor: string }

const stats = computed<StatItem[]>(() => [
  { label: t("app.stats.agendamentos"), value: "0", icon: "i-lucide-calendar-check", iconBg: "bg-emerald-50 dark:bg-emerald-500/10", iconColor: "text-emerald-500" },
  { label: t("app.stats.clientes"), value: "0", change: "+0%", changeColor: "text-emerald-600 dark:text-emerald-400", icon: "i-lucide-users", iconBg: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-500" },
  { label: t("app.stats.confirmacoes"), value: "0%", icon: "i-lucide-check-check", iconBg: "bg-amber-50 dark:bg-amber-500/10", iconColor: "text-amber-500" },
  { label: t("app.stats.faturamento"), value: "R$ 0", change: "+0%", changeColor: "text-emerald-600 dark:text-emerald-400", icon: "i-lucide-trending-up", iconBg: "bg-rose-50 dark:bg-rose-500/10", iconColor: "text-rose-500" },
])

const quickActions = computed(() => [
  { key: "schedule", label: t("app.quickActions.newSchedule"), icon: "i-lucide-plus-circle" },
  { key: "client", label: t("app.quickActions.addClient"), icon: "i-lucide-user-plus" },
  { key: "share", label: t("app.quickActions.shareLink"), icon: "i-lucide-share-2" },
])
</script>
