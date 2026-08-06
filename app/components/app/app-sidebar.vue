<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden shrink-0 flex-col border-r border-black/[0.06] bg-white transition-all duration-300 ease-in-out lg:flex dark:border-white/5 dark:bg-slate-900"
    :class="isCollapsed ? 'w-[68px]' : 'w-[256px]'"
  >
    <!-- Logo -->
    <div
      class="flex h-14 items-center border-b border-black/[0.06] dark:border-white/[0.08]"
      :class="isCollapsed ? 'justify-center px-0' : 'px-5'"
    >
      <button
        type="button"
        class="group flex shrink-0 items-center overflow-hidden rounded-lg p-1 -ml-1 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        @click="isCollapsed = !isCollapsed"
      >
        <img
          v-if="isCollapsed"
          src="/favicon.svg"
          alt="Marcato"
          class="h-7 w-7 shrink-0 object-contain"
        >
        <div v-else class="flex items-center gap-2.5">
          <img src="/marcato.logo.png" alt="Marcato" class="h-8 w-auto shrink-0 object-contain">
          <UIcon name="i-lucide-panel-left" class="h-4 w-4 shrink-0 text-[#94a3b8] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto py-3" :class="isCollapsed ? 'px-2' : 'px-3'">

      <!-- Main Section -->
      <div v-if="!isCollapsed" class="mb-1 px-2 py-1">
        <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] dark:text-slate-400">Principal</p>
      </div>
      <ul class="space-y-0.5">
        <li v-for="item in mainItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="group relative flex items-center rounded-lg text-[13px] font-medium transition-colors"
            :class="[
              isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-2.5 py-2',
              $route.path === item.to
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/[0.12] dark:text-emerald-300'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200',
            ]"
            :title="isCollapsed ? item.label : undefined"
          >
            <UIcon :name="item.icon" class="h-[18px] w-[18px] shrink-0" />
            <span
              class="truncate whitespace-nowrap transition-opacity duration-200"
              :class="isCollapsed ? 'hidden' : 'opacity-100'"
            >{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Workspace Section -->
      <div v-if="!isCollapsed" class="mb-1 mt-4 px-2 py-1">
        <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] dark:text-slate-400">Área de trabalho</p>
      </div>
      <div v-if="isCollapsed" class="my-2 border-t border-black/[0.06] dark:border-white/[0.08]" />
      <ul class="space-y-0.5">
        <li v-for="item in workspaceItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="group relative flex items-center rounded-lg text-[13px] font-medium transition-colors"
            :class="[
              isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-2.5 py-2',
              $route.path === item.to
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/[0.12] dark:text-emerald-300'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200',
            ]"
            :title="isCollapsed ? item.label : undefined"
          >
            <UIcon :name="item.icon" class="h-[18px] w-[18px] shrink-0" />
            <span
              class="truncate whitespace-nowrap transition-opacity duration-200"
              :class="isCollapsed ? 'hidden' : 'opacity-100'"
            >{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- User Area -->
    <div class="border-t border-black/[0.06] dark:border-white/[0.08]" :class="isCollapsed ? 'px-2 py-3' : 'p-3'">
      <UDropdownMenu :items="userMenuItems" :content="{ align: 'start', side: 'right', sideOffset: 8 }">
        <button
          type="button"
          class="group flex items-center rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.04]"
          :class="isCollapsed ? 'justify-center p-1.5' : 'w-full gap-2.5 px-2 py-2'"
        >
          <div class="relative shrink-0">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 ring-1 ring-black/[0.06] dark:bg-emerald-500/[0.15] dark:text-emerald-300 dark:ring-white/[0.08]">
              {{ initials }}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-950" />
          </div>
          <div
            class="min-w-0 flex-1 text-left"
            :class="isCollapsed ? 'hidden' : ''"
          >
            <p class="truncate text-[13px] font-semibold leading-tight">{{ me?.name ?? t("app.user") }}</p>
            <p class="truncate text-[11px] leading-tight text-slate-400 dark:text-slate-400">{{ me?.email }}</p>
          </div>
        </button>
      </UDropdownMenu>
    </div>
  </aside>

  <!-- Mobile Drawer -->
  <Teleport to="body">
    <Transition name="drawer-slide">
      <div v-if="isMobileOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/70" @click="close()" />
        <div class="absolute inset-y-0 left-0 flex w-full max-w-[300px] flex-col bg-white shadow-2xl dark:bg-slate-900">

          <!-- Logo + close -->
          <div class="flex h-14 items-center justify-between border-b border-black/[0.06] px-5 dark:border-white/[0.08]">
            <img src="/marcato.logo.png" alt="Marcato" class="h-7 w-auto object-contain">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-200"
              @click="close()"
            >
              <UIcon name="i-lucide-x" class="h-4 w-4" />
            </button>
          </div>

          <!-- Nav -->
          <nav class="flex-1 overflow-y-auto px-3 py-3">

            <p class="mb-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] dark:text-slate-400">Principal</p>
            <ul class="mb-4 space-y-0.5">
              <li v-for="item in mainItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
                  :class="$route.path === item.to ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/[0.12] dark:text-emerald-300' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200'"
                  @click="close()"
                >
                  <UIcon :name="item.icon" class="h-[18px] w-[18px] shrink-0" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </li>
            </ul>

            <p class="mb-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] dark:text-slate-400">Área de trabalho</p>
            <ul class="mb-4 space-y-0.5">
              <li v-for="item in workspaceItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
                  :class="$route.path === item.to ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/[0.12] dark:text-emerald-300' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200'"
                  @click="close()"
                >
                  <UIcon :name="item.icon" class="h-[18px] w-[18px] shrink-0" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </li>
            </ul>

            <div class="border-t border-black/[0.06] pt-2 dark:border-white/[0.08]">
              <button
                type="button"
                class="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/[0.10]"
                @click="close(); handleSignOut()"
              >
                <UIcon name="i-lucide-log-out" class="h-[18px] w-[18px] shrink-0" />
                <span>{{ t("app.signOut") }}</span>
              </button>
            </div>
          </nav>

          <!-- Bottom: locale + theme + user -->
          <div class="border-t border-black/[0.06] px-5 py-3 dark:border-white/[0.08]">
            <div class="flex items-center justify-between">
              <div class="relative">
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
                  @click="isLocalePickerOpen = !isLocalePickerOpen"
                >
                  <UIcon :name="selectedLocaleIcon" class="h-3.5 w-3.5 shrink-0" />
                  {{ localeLabel }}
                  <UIcon :name="isLocalePickerOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="h-3 w-3 shrink-0" />
                </button>
                <Transition name="popover">
                  <div
                    v-if="isLocalePickerOpen"
                    class="absolute bottom-full left-0 z-10 mb-1 min-w-[140px] rounded-xl border border-black/[0.08] bg-white p-1 shadow-lg dark:border-white/[0.08] dark:bg-slate-900"
                  >
                    <button
                      v-for="l in localeMenuItems"
                      :key="l.label"
                      type="button"
                      class="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.06]"
                      :class="String(locale) === l.label?.toLowerCase() ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'"
                      @click="l.onSelect(); isLocalePickerOpen = false"
                    >
                      <UIcon :name="l.icon!" class="h-4 w-4 shrink-0" />
                      {{ l.label }}
                    </button>
                  </div>
                </Transition>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
                @click="toggleTheme"
              >
                <UIcon :name="themeIcon" class="h-3.5 w-3.5" />
                {{ t("app.userMenu.theme") }}
              </button>
            </div>

            <div class="mt-3 flex items-center gap-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
              <div class="relative shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 ring-1 ring-black/[0.06] dark:bg-emerald-500/[0.15] dark:text-emerald-300 dark:ring-white/[0.08]">
                  {{ initials }}
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-950" />
              </div>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold">{{ me?.name ?? t("app.user") }}</p>
                <p class="truncate text-[11px] text-slate-400 dark:text-slate-400">{{ me?.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useLogoutMutation } from "~/modules/auth/mutations/use-logout.mutation"
import { useMeQuery } from "~/modules/auth/queries/use-me.query"

const { t, locale, locales, setLocale } = useI18n()
const { data: me } = useMeQuery()
const logoutMutation = useLogoutMutation()
const colorMode = useColorMode()

const isCollapsed = ref(false)
const isLocalePickerOpen = ref(false)
const { isOpen: isMobileOpen, close } = useMobileSidebar()

type SupportedLocale = "pt" | "en" | "es"
const localeFlagIcons: Record<SupportedLocale, string> = {
  pt: "i-circle-flags-br",
  en: "i-circle-flags-us",
  es: "i-circle-flags-es",
}

const localeLabels: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
}

const mainItems = computed(() => [
  { to: "/app", label: t("app.nav.dashboard"), icon: "i-lucide-layout-dashboard" },
  { to: "/app/schedule", label: t("app.nav.schedule"), icon: "i-lucide-calendar-days" },
])

const workspaceItems = computed(() => [
  { to: "/app/clients", label: t("app.nav.clients"), icon: "i-lucide-users" },
  { to: "/app/messages", label: t("app.nav.messages"), icon: "i-lucide-message-square" },
  { to: "/app/reports", label: t("app.nav.reports"), icon: "i-lucide-bar-chart-3" },
  { to: "/app/settings", label: t("app.nav.settings"), icon: "i-lucide-settings" },
])

const localeLabel = computed(() => localeLabels[locale.value] ?? locale.value)

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

const selectedLocaleIcon = computed(() =>
  localeFlagIcons[(locale.value as SupportedLocale)] ?? "i-lucide-globe",
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
</script>

<style scoped>
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: opacity 250ms ease;
}
.drawer-slide-enter-active > :last-child,
.drawer-slide-leave-active > :last-child {
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from {
  opacity: 0;
}
.drawer-slide-enter-from > :last-child {
  transform: translateX(-100%);
}
.drawer-slide-leave-to {
  opacity: 0;
}
.drawer-slide-leave-to > :last-child {
  transform: translateX(-100%);
}
.popover-enter-active,
.popover-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
