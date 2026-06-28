<template>
  <div
    class="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
  >
    <div
      class="relative h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 dark:from-emerald-700 dark:via-teal-800 dark:to-cyan-800"
    >
      <span
        class="absolute right-4 top-4 inline-flex items-center gap-1 rounded-md border border-white/30 bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm"
      >
        <UIcon :name="roleIcon" class="h-3 w-3" />
        {{ roleBadgeLabel }}
      </span>
    </div>

    <div class="px-6 pt-6 pb-6">
      <div class="flex items-end gap-4">
        <div
          class="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-[2.25rem] font-bold leading-none text-emerald-700 ring-1 ring-black/5 shadow-lg dark:border-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:ring-white/10"
        >
          {{ initials }}
        </div>
        <div class="min-w-0 pb-3">
          <h1 class="text-xl font-bold tracking-tight">{{ name }}</h1>
          <p class="mt-0.5 flex items-center gap-1.5 text-sm text-[#64748b] dark:text-slate-400">
            <UIcon name="i-lucide-mail" class="h-3.5 w-3.5 shrink-0" />
            {{ email }}
          </p>
        </div>
      </div>

      <slot name="after" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  initials: string
  name: string
  email: string
  roleIcon: string
  roleBadgeLabel: string
}>()
</script>
