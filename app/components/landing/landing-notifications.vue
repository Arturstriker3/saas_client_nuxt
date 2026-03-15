<template>
  <section class="bg-primary py-20 text-white">
    <div class="layout-container">
      <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.notifications.title") }}</h2>
      <div class="mt-10 rounded-3xl bg-[#111827] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="notification in notifications" :key="notification.title" class="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
            <p class="text-sm font-semibold">{{ notification.title }}</p>
            <p class="mt-1 text-xs text-white/70">{{ notification.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type NotificationItem = {
  title: string
  description: string
}

defineProps<{
  notifications: NotificationItem[]
}>()

const { t } = useI18n()
</script>
