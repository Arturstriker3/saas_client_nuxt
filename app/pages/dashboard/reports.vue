<template>
  <div class="flex flex-1 items-center justify-center p-4 lg:p-6">
    <div class="text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
        <UIcon name="i-lucide-bar-chart-3" class="h-8 w-8 text-amber-500" />
      </div>
      <p class="mt-4 text-sm font-medium text-[#64748b] dark:text-slate-400">{{ t("app.nav.reports") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "dashboard", name: "dashboard-reports" })
const { t } = useI18n()
</script>
