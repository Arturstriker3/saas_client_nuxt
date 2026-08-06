<template>
  <div class="flex flex-1 items-center justify-center p-4 lg:p-6">
    <div class="text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
        <UIcon name="i-lucide-calendar-days" class="h-8 w-8 text-emerald-500" />
      </div>
      <p class="mt-4 text-sm font-medium text-[#64748b] dark:text-slate-400">{{ t("app.nav.schedule") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "app", name: "app-schedule" })
const { t } = useI18n()
</script>
