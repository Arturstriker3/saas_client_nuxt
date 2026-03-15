<template>
  <section ref="sectionRef" class="bg-primary py-20 text-white">
    <div class="layout-container transition-all duration-700 ease-out" :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
      <h2 class="text-center text-4xl font-extrabold tracking-tight" :style="titleStyle">{{ t("landing.notifications.title") }}</h2>
      <div class="mt-10 rounded-3xl bg-[#111827] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out" :style="boardStyle">
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="(notification, index) in notifications"
            :key="notification.title"
            class="rounded-2xl border border-white/10 bg-[#0f172a] p-4 transition-all duration-500 ease-out"
            :style="getNotificationStyle(index)"
          >
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

const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)

const { top } = useElementBounding(sectionRef)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (!entry?.isIntersecting || sectionVisible.value) {
    return
  }

  sectionVisible.value = true
}, { threshold: 0.22 })

const parallaxOffset = computed(() => {
  const motion = (top.value - 380) * -0.028
  return Math.max(-16, Math.min(16, motion))
})

const titleStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
  transition: "all 620ms ease",
}))

const boardStyle = computed(() => ({
  opacity: sectionVisible.value ? "1" : "0",
  transform: sectionVisible.value ? `translate3d(0, ${parallaxOffset.value}px, 0)` : "translate3d(0, 22px, 0)",
  transitionDelay: sectionVisible.value ? "120ms" : "0ms",
}))

const getNotificationStyle = (index: number) => {
  if (!sectionVisible.value) {
    return {
      opacity: "0",
      transform: "translate3d(0, 14px, 0)",
      transitionDelay: "0ms",
    }
  }

  return {
    opacity: "1",
    transform: `translate3d(0, ${parallaxOffset.value * (index - 1) * 0.16}px, 0)`,
    transitionDelay: `${index * 90 + 180}ms`,
  }
}
</script>
