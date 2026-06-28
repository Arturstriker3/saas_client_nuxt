<template>
  <div class="space-y-6 p-4 lg:p-6">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-[0.12em] text-[#64748b] dark:text-slate-400">{{ stat.label }}</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg" :class="stat.iconBg">
            <UIcon :name="stat.icon" class="h-4 w-4" :class="stat.iconColor" />
          </span>
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
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
            <UIcon name="i-lucide-calendar-check" class="h-8 w-8 text-emerald-500" />
          </div>
          <p class="mt-4 text-sm font-medium text-[#64748b] dark:text-slate-400">{{ t("app.activity.empty") }}</p>
          <UButton color="primary" size="sm" class="mt-3 rounded-xl">{{ t("app.activity.cta") }}</UButton>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <h2 class="text-sm font-bold tracking-tight">{{ t("app.quickActions.title") }}</h2>
          <div class="mt-4 space-y-2">
            <UButton
              v-for="action in quickActions"
              :key="action.key"
              color="neutral"
              variant="outline"
              size="lg"
              block
              class="justify-start gap-3 rounded-xl"
            >
              <UIcon :name="action.icon" class="h-5 w-5 text-emerald-500" />
              <span class="text-sm font-medium">{{ action.label }}</span>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  name: "dashboard",
})

const { t } = useI18n()

type StatItem = {
  label: string
  value: string
  change?: string
  changeColor?: string
  icon: string
  iconBg: string
  iconColor: string
}

const stats = computed<StatItem[]>(() => [
  {
    label: t("app.stats.agendamentos"),
    value: "0",
    icon: "i-lucide-calendar-check",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    label: t("app.stats.clientes"),
    value: "0",
    change: "+0%",
    changeColor: "text-emerald-600 dark:text-emerald-400",
    icon: "i-lucide-users",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    label: t("app.stats.confirmacoes"),
    value: "0%",
    icon: "i-lucide-check-check",
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    label: t("app.stats.faturamento"),
    value: "R$ 0",
    change: "+0%",
    changeColor: "text-emerald-600 dark:text-emerald-400",
    icon: "i-lucide-trending-up",
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-500",
  },
])

const quickActions = computed(() => [
  { key: "schedule", label: t("app.quickActions.newSchedule"), icon: "i-lucide-plus-circle" },
  { key: "client", label: t("app.quickActions.addClient"), icon: "i-lucide-user-plus" },
  { key: "share", label: t("app.quickActions.shareLink"), icon: "i-lucide-share-2" },
])
</script>
