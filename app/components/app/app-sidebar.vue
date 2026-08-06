<template>
  <aside
    class="hidden shrink-0 flex-col border-r border-black/5 bg-white transition-all duration-300 ease-in-out lg:flex dark:border-white/10 dark:bg-slate-950"
    :class="isCollapsed ? 'w-[72px]' : 'w-[260px]'"
  >
    <div class="flex h-16 items-center border-b border-black/5 dark:border-white/10" :class="isCollapsed ? 'justify-center px-2' : 'px-4'">
      <button type="button" class="flex shrink-0 items-center overflow-hidden" @click="isCollapsed = !isCollapsed">
        <img
          v-if="isCollapsed"
          src="/favicon.svg"
          alt="Marcato"
          class="h-8 w-8 shrink-0 object-contain"
        >
        <div v-else class="flex items-center gap-3">
          <img src="/marcato.logo.png" alt="Marcato" class="h-9 w-auto shrink-0 object-contain">
        </div>
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto py-4" :class="isCollapsed ? 'px-0' : 'px-3'">
      <ul class="space-y-1">
        <li v-for="item in items" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center rounded-xl text-sm font-medium transition-colors"
            :class="[
              isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5',
              $route.path === item.to ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'text-[#64748b] hover:bg-black/5 hover:text-[#0f172a] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200',
            ]"
            :title="isCollapsed ? item.label : undefined"
          >
            <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
            <span
              class="whitespace-nowrap transition-opacity duration-200"
              :class="isCollapsed ? 'hidden' : 'opacity-100'"
            >{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="border-t border-black/5 py-4 dark:border-white/10" :class="isCollapsed ? 'px-0' : 'px-3'">
      <UDropdownMenu :items="userMenuItems" :content="{ align: 'start', side: 'right' }">
        <button
          type="button"
          class="flex items-center rounded-xl text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          :class="isCollapsed ? 'mx-auto p-1' : 'w-full gap-3 px-2 py-1.5 -mx-2'"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            {{ initials }}
          </div>
          <div
            class="min-w-0 flex-1"
            :class="isCollapsed ? 'hidden' : ''"
          >
            <p class="truncate text-sm font-semibold">{{ me?.name ?? t("app.user") }}</p>
            <p class="truncate text-xs text-[#64748b] dark:text-slate-400">{{ me?.email }}</p>
          </div>
        </button>
      </UDropdownMenu>
    </div>
  </aside>

  <USlideover :open="isMobileOpen" side="left" title="Menu" @update:open="isMobileOpen = $event">
    <template #body="{ close }">
      <div class="space-y-1">
        <div class="mb-4 flex items-center gap-3 border-b border-black/10 pb-4 dark:border-white/10">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">{{ initials }}</div>
          <div class="min-w-0">
            <p class="truncate text-base font-semibold">{{ me?.name ?? t("app.user") }}</p>
            <p class="truncate text-sm text-[#64748b] dark:text-slate-400">{{ me?.email }}</p>
          </div>
        </div>
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
          :class="$route.path === item.to ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'text-[#64748b] hover:bg-black/5 hover:text-[#0f172a] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'"
          @click="close()"
        >
          <UIcon :name="item.icon" class="h-5 w-5 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
        <div class="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
          <UButton
            color="neutral"
            variant="ghost"
            size="lg"
            class="w-full justify-start gap-3 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
            @click="close(); handleSignOut()"
          >
            <UIcon name="i-lucide-log-out" class="h-5 w-5" />
            <span>{{ t("app.signOut") }}</span>
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { useLogoutMutation } from "~/modules/auth/mutations/use-logout.mutation"
import { useMeQuery } from "~/modules/auth/queries/use-me.query"

const { t, locale, locales, setLocale } = useI18n()
const { data: me } = useMeQuery()
const logoutMutation = useLogoutMutation()
const colorMode = useColorMode()

const isCollapsed = ref(false)
const isMobileOpen = ref(false)

type SupportedLocale = "pt" | "en" | "es"
const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const items = computed(() => [
  { to: "/app", label: t("app.nav.dashboard"), icon: "i-lucide-layout-dashboard" },
  { to: "/app/schedule", label: t("app.nav.schedule"), icon: "i-lucide-calendar-days" },
  { to: "/app/clients", label: t("app.nav.clients"), icon: "i-lucide-users" },
  { to: "/app/messages", label: t("app.nav.messages"), icon: "i-lucide-message-square" },
  { to: "/app/reports", label: t("app.nav.reports"), icon: "i-lucide-bar-chart-3" },
  { to: "/app/settings", label: t("app.nav.settings"), icon: "i-lucide-settings" },
])

const initials = computed(() => {
  const name = me.value?.name ?? ""
  return name
    ? name.split(" ").map((p) => p.charAt(0).toUpperCase()).slice(0, 2).join("")
    : "?"
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

const themeIcon = computed(() => colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon")
const toggleTheme = () => { colorMode.preference = colorMode.value === "dark" ? "light" : "dark" }
const handleSignOut = async () => { await logoutMutation.mutateAsync() }

const userMenuItems = computed(() => [
  { label: t("app.userMenu.profile"), icon: "i-lucide-user", to: "/app/profile" },
  { label: t("app.userMenu.language"), icon: "i-lucide-globe", children: localeMenuItems.value },
  { label: t("app.userMenu.theme"), icon: themeIcon.value, onSelect: toggleTheme },
  { label: t("app.userMenu.signOut"), icon: "i-lucide-log-out", onSelect: handleSignOut, color: "error" as const },
])

const openMobile = () => { isMobileOpen.value = true }
provide("app:openMobile", openMobile)
</script>
