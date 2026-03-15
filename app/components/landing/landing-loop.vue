<template>
  <section class="bg-primary py-20 text-white">
    <div class="layout-container">
      <h2 class="text-center text-4xl font-extrabold tracking-tight">{{ t("landing.loop.title") }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-white/90">
        {{ t("landing.loop.subtitle") }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <UButton color="primary" variant="solid" size="xl" class="rounded-full bg-white px-8 text-base text-[#0f172a] hover:bg-white/90">
          {{ t("landing.header.startForFree") }}
        </UButton>
        <UButton color="neutral" variant="outline" size="xl" class="rounded-full border-white/40 px-8 text-base text-white hover:bg-white/10">
          {{ t("landing.hero.viewDemo") }}
        </UButton>
      </div>
      <div class="mt-10 rounded-3xl border border-white/20 bg-[#111827] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div class="grid gap-4 md:grid-cols-4">
          <div v-for="card in dashboardCards" :key="card" class="rounded-xl border border-white/10 bg-[#0f172a] p-4">
            <p class="text-sm font-semibold">{{ card }}</p>
            <div class="mt-3 h-10 rounded-md bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  dashboardCards: string[]
}>()

const { t } = useI18n()
</script>
