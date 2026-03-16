<template>
  <footer class="border-t border-black/5 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
    <div class="layout-container py-12">
      <div class="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <div class="flex items-center gap-2">
            <img src="/marcato.logo.png" alt="Logo" class="h-16 w-auto max-w-[220px] shrink-0 object-contain" >
          </div>
          <p class="mt-4 max-w-md text-sm text-[#64748b] dark:text-slate-300">
            {{ t("landing.footer.description") }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div v-for="column in footerLinks" :key="column.title">
            <p class="font-semibold">{{ column.title }}</p>
            <ul class="mt-3 space-y-2 text-[#64748b] dark:text-slate-300">
              <li v-for="item in column.items" :key="item.label">
                <NuxtLink
                  v-if="item.href"
                  :to="item.href"
                  class="transition hover:text-[#0f172a] dark:hover:text-slate-100"
                >
                  {{ item.label }}
                </NuxtLink>
                <span v-else>{{ item.label }}</span>
              </li>
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
  items: FooterLinkItem[]
}

type FooterLinkItem = {
  label: string
  href?: string
}

defineProps<{
  appName: string
  footerLinks: FooterColumn[]
  currentYear: number
}>()

const { t } = useI18n()
</script>
