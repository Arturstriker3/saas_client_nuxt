<template>
  <footer class="border-t border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container py-12">
      <div class="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <div class="flex items-center gap-2">
            <svg viewBox="0 0 128 128" class="h-10 w-10 shrink-0" aria-label="Logo" role="img" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="120" height="120" rx="24" fill="url(#footerLogoBg)" />
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
                <linearGradient id="footerLogoBg" x1="14" y1="8" x2="114" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0E5A78" />
                  <stop offset="1" stop-color="#0A3957" />
                </linearGradient>
              </defs>
            </svg>
            <span class="text-sm font-extrabold tracking-tight">{{ appName }}</span>
          </div>
          <p class="mt-4 max-w-md text-sm text-[#64748b] dark:text-slate-300">
            {{ t("landing.footer.description") }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div v-for="column in footerLinks" :key="column.title">
            <p class="font-semibold">{{ column.title }}</p>
            <ul class="mt-3 space-y-2 text-[#64748b] dark:text-slate-300">
              <li v-for="item in column.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-10 border-t text-center border-black/10 pt-6 text-sm text-[#64748b] dark:border-white/10 dark:text-slate-300">
        <p>{{ t("landing.footer.copyright", { year: currentYear, appName }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type FooterColumn = {
  title: string
  items: string[]
}

defineProps<{
  appName: string
  footerLinks: FooterColumn[]
  currentYear: number
}>()

const { t } = useI18n()
</script>
