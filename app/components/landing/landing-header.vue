<template>
  <header
    class="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-slate-950/90"
    :class="isHeaderElevated ? 'shadow-sm shadow-black/10 dark:shadow-black/40' : ''"
  >
    <div class="layout-container grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4 lg:hidden">
      <svg viewBox="0 0 128 128" class="h-9 w-9 shrink-0" aria-label="Logo" role="img" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="120" height="120" rx="24" fill="url(#headerLogoBgMobile)" />
        <rect x="20" y="30" width="66" height="56" rx="10" fill="white" />
        <rect x="20" y="30" width="66" height="14" rx="10" fill="#1F7A59" />
        <rect x="27" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
        <rect x="43" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
        <rect x="59" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
        <rect x="27" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
        <rect x="43" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
        <rect x="59" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
        <circle cx="84" cy="52" r="24" fill="white" stroke="#2E6D86" stroke-width="6" />
        <path d="M84 41V52H73" stroke="#0B365B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M72 36L69 31" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
        <path d="M96 36L99 31" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
        <path d="M66 52H62" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
        <path d="M106 52H102" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
        <defs>
          <linearGradient id="headerLogoBgMobile" x1="14" y1="8" x2="114" y2="120" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0E5A78" />
            <stop offset="1" stop-color="#0A3957" />
          </linearGradient>
        </defs>
      </svg>
      <div class="flex items-center justify-center">
        <UButton color="primary" size="sm" class="rounded-full px-4 text-sm whitespace-nowrap">
          {{ t("landing.header.startForFree") }}
        </UButton>
      </div>
      <div class="flex shrink-0 items-center justify-end">
        <UButton color="neutral" variant="outline" size="xl" square @click="openMobileMenu">
          <UIcon name="i-lucide-menu" class="h-5 w-5" />
        </UButton>
      </div>
    </div>

    <div class="layout-container hidden items-center justify-between gap-6 py-4 lg:flex">
      <div class="flex min-w-0 items-center gap-10">
        <svg viewBox="0 0 128 128" class="h-10 w-10 shrink-0" aria-label="Logo" role="img" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="120" height="120" rx="24" fill="url(#headerLogoBgDesktop)" />
          <rect x="20" y="30" width="66" height="56" rx="10" fill="white" />
          <rect x="20" y="30" width="66" height="14" rx="10" fill="#1F7A59" />
          <rect x="27" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
          <rect x="43" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
          <rect x="59" y="52" width="12" height="10" rx="2" fill="#DDE9EE" />
          <rect x="27" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
          <rect x="43" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
          <rect x="59" y="66" width="12" height="10" rx="2" fill="#DDE9EE" />
          <circle cx="84" cy="52" r="24" fill="white" stroke="#2E6D86" stroke-width="6" />
          <path d="M84 41V52H73" stroke="#0B365B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M72 36L69 31" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
          <path d="M96 36L99 31" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
          <path d="M66 52H62" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
          <path d="M106 52H102" stroke="#0B365B" stroke-width="4" stroke-linecap="round" />
          <defs>
            <linearGradient id="headerLogoBgDesktop" x1="14" y1="8" x2="114" y2="120" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0E5A78" />
              <stop offset="1" stop-color="#0A3957" />
            </linearGradient>
          </defs>
        </svg>
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
        <UButton color="neutral" variant="outline" size="xl" square @click="emit('toggleTheme')">
          <UIcon :name="themeIcon" class="h-5 w-5" />
        </UButton>
      </div>
    </div>

    <USlideover :open="isMobileMenuOpen" side="right" :close="false" @update:open="updateMobileMenuOpen">
      <template #header="{ close }">
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-2">
            <UDropdownMenu :items="localeMenuItems" :content="{ align: 'end' }">
              <UButton color="neutral" variant="outline" size="xl" square>
                <UIcon :name="selectedLocaleIcon" class="h-5 w-5" />
              </UButton>
            </UDropdownMenu>
            <UButton color="neutral" variant="outline" size="xl" square @click="emit('toggleTheme')">
              <UIcon :name="themeIcon" class="h-5 w-5" />
            </UButton>
          </div>
          <UButton color="neutral" variant="outline" size="xl" square class="ml-auto" @click="closeAndSync(close)">
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
              @click="closeAndSync(close)"
            >
              <UIcon :name="item.icon" class="h-5 w-5 text-primary" />
              <span>{{ item.label }}</span>
            </a>
          </div>

          <div class="space-y-3 border-t border-black/10 pt-4 dark:border-white/15">
            <UButton color="neutral" variant="ghost" size="lg" block class="justify-center gap-2 text-base" @click="closeAndSync(close)">
              <UIcon name="i-lucide-log-in" class="h-5 w-5" />
              {{ t("landing.header.login") }}
            </UButton>
          </div>
        </div>
      </template>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
type MobileNavItem = {
  label: string
  icon: string
}

type LocaleMenuItem = {
  label: string
  icon: string
  onSelect: () => Promise<void> | void
}

defineProps<{
  isHeaderElevated: boolean
  navItems: string[]
  mobileNavItems: MobileNavItem[]
  localeMenuItems: LocaleMenuItem[]
  selectedLocaleIcon: string
  themeIcon: string
  isMobileMenuOpen: boolean
}>()

const emit = defineEmits<{
  toggleTheme: []
  "update:isMobileMenuOpen": [value: boolean]
}>()

const { t } = useI18n()

const openMobileMenu = () => {
  emit("update:isMobileMenuOpen", true)
}

const updateMobileMenuOpen = (value: boolean) => {
  emit("update:isMobileMenuOpen", value)
}

const closeAndSync = (close: () => void) => {
  close()
  emit("update:isMobileMenuOpen", false)
}
</script>
