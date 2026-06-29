<template>
  <div class="flex flex-wrap gap-3">
    <span
      class="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-white/10 dark:bg-emerald-500/15 dark:text-emerald-300"
    >
      <UIcon name="i-lucide-badge-check" class="h-3.5 w-3.5" />
      {{ plan }}
    </span>
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-[#64748b] transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
      @click="$emit('clickLanguage')"
    >
      <UIcon name="i-lucide-globe" class="h-3.5 w-3.5" />
      {{ language }}
    </button>
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-[#64748b] transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
      @click="$emit('clickBirthDate')"
    >
      <UIcon name="i-lucide-cake" class="h-3.5 w-3.5" />
      {{ birthDate }}
    </button>
    <span
      class="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-[#64748b] dark:border-white/10 dark:bg-slate-800 dark:text-slate-400"
    >
      <UIcon name="i-lucide-calendar" class="h-3.5 w-3.5" />
      {{ memberSinceLabel }} {{ memberSince }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  plan: string
  language: string
  memberSinceLabel: string
  memberSince: string
  birthDate: string
}>()

defineEmits<{
  clickLanguage: []
  clickBirthDate: []
}>()
</script>
