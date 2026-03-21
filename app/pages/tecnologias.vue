<template>
  <ContentPageLayout
    :eyebrow="t('technologiesPage.tagline')"
    :title="t('technologiesPage.title')"
    :subtitle="t('technologiesPage.subtitle')"
    :back-label="t('technologiesPage.backHome')"
    :final-cta-title="t('technologiesPage.ethics.title')"
    :final-cta-description="t('technologiesPage.ethics.description')"
    :final-cta-label="t('landing.header.startForFree')"
    final-cta-to="/registro"
  >
    <div class="layout-container space-y-12 py-12 md:space-y-16 md:py-16">
      <section class="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors md:p-8 dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_16px_50px_rgba(2,6,23,0.45)]">
        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <UIcon name="i-lucide-cpu" class="h-5 w-5" />
          </span>
          <h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">{{ t("technologiesPage.tech.title") }}</h2>
        </div>
        <p class="mt-3 max-w-3xl text-sm text-[#64748b] dark:text-slate-300">{{ t("technologiesPage.tech.subtitle") }}</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="technology in technologies"
            :key="technology.name"
            class="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-900"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-slate-900">
                  <UIcon :name="technology.icon" class="h-5 w-5" :style="{ color: technology.color }" />
                </span>
                <h3 class="text-lg font-bold tracking-tight">{{ technology.name }}</h3>
              </div>
              <UIcon name="i-lucide-zap" class="h-4 w-4 text-emerald-500/70 transition group-hover:text-emerald-500" />
            </div>
            <p class="mt-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">{{ technology.impact }}</p>
            <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">{{ technology.reason }}</p>
          </article>
        </div>
      </section>

      <section class="rounded-3xl border border-black/10 bg-[#0f172a] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] transition-colors md:p-8 dark:border-white/10">
        <div class="flex items-center gap-3">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
            <UIcon name="i-lucide-shield-check" class="h-5 w-5" />
          </span>
          <h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">{{ t("technologiesPage.bias.title") }}</h2>
        </div>
        <p class="mt-3 max-w-3xl text-sm text-white/75">{{ t("technologiesPage.bias.subtitle") }}</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <article
            v-for="item in biases"
            :key="item.name"
            class="rounded-2xl border border-white/10 bg-[#111b30] p-5 transition hover:border-emerald-300/35"
          >
            <p class="text-base font-bold">{{ item.name }}</p>
            <p class="mt-2 text-sm text-white/85">{{ item.trigger }}</p>
            <p class="mt-2 text-sm text-emerald-200/90">{{ item.outcome }}</p>
          </article>
        </div>
      </section>

    </div>
  </ContentPageLayout>
</template>

<script setup lang="ts">
type TechnologyItem = {
  name: string
  icon: string
  color: string
  impact: string
  reason: string
}

type BiasItem = {
  name: string
  trigger: string
  outcome: string
}

const { public: { appName } } = useRuntimeConfig()
const { t } = useI18n()

const technologies = computed<TechnologyItem[]>(() => [
  { name: "Bun", icon: "i-simple-icons-bun", color: "#D2A35C", impact: t("technologiesPage.tech.items.item1.impact"), reason: t("technologiesPage.tech.items.item1.reason") },
  { name: "Nuxt", icon: "i-simple-icons-nuxt", color: "#00DC82", impact: t("technologiesPage.tech.items.item2.impact"), reason: t("technologiesPage.tech.items.item2.reason") },
  { name: "MongoDB", icon: "i-simple-icons-mongodb", color: "#47A248", impact: t("technologiesPage.tech.items.item3.impact"), reason: t("technologiesPage.tech.items.item3.reason") },
  { name: "TypeScript", icon: "i-simple-icons-typescript", color: "#3178C6", impact: t("technologiesPage.tech.items.item4.impact"), reason: t("technologiesPage.tech.items.item4.reason") },
  { name: "RabbitMQ", icon: "i-simple-icons-rabbitmq", color: "#FF6600", impact: t("technologiesPage.tech.items.item5.impact"), reason: t("technologiesPage.tech.items.item5.reason") },
  { name: "WhatsApp Business", icon: "i-simple-icons-whatsapp", color: "#25D366", impact: t("technologiesPage.tech.items.item6.impact"), reason: t("technologiesPage.tech.items.item6.reason") },
  { name: "NestJS", icon: "i-simple-icons-nestjs", color: "#E0234E", impact: t("technologiesPage.tech.items.item7.impact"), reason: t("technologiesPage.tech.items.item7.reason") },
  { name: "Resend", icon: "i-simple-icons-resend", color: "#000000", impact: t("technologiesPage.tech.items.item8.impact"), reason: t("technologiesPage.tech.items.item8.reason") },
  { name: "Docker", icon: "i-simple-icons-docker", color: "#2496ED", impact: t("technologiesPage.tech.items.item9.impact"), reason: t("technologiesPage.tech.items.item9.reason") },
  { name: "Cloudflare", icon: "i-simple-icons-cloudflare", color: "#F38020", impact: t("technologiesPage.tech.items.item10.impact"), reason: t("technologiesPage.tech.items.item10.reason") },
  { name: "Vue", icon: "i-simple-icons-vuedotjs", color: "#4FC08D", impact: t("technologiesPage.tech.items.item11.impact"), reason: t("technologiesPage.tech.items.item11.reason") },
])

const biases = computed<BiasItem[]>(() => [
  { name: t("technologiesPage.bias.items.item1.name"), trigger: t("technologiesPage.bias.items.item1.trigger"), outcome: t("technologiesPage.bias.items.item1.outcome") },
  { name: t("technologiesPage.bias.items.item2.name"), trigger: t("technologiesPage.bias.items.item2.trigger"), outcome: t("technologiesPage.bias.items.item2.outcome") },
  { name: t("technologiesPage.bias.items.item3.name"), trigger: t("technologiesPage.bias.items.item3.trigger"), outcome: t("technologiesPage.bias.items.item3.outcome") },
  { name: t("technologiesPage.bias.items.item4.name"), trigger: t("technologiesPage.bias.items.item4.trigger"), outcome: t("technologiesPage.bias.items.item4.outcome") },
])

useSeoMeta({
  title: () => `${appName} | ${t("technologiesPage.seo.title")}`,
  description: () => t("technologiesPage.seo.description"),
})
</script>
