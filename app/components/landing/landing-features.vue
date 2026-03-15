<template>
  <section class="layout-container space-y-16 py-20">
    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">{{ t("landing.features.workflowsLabel") }}</p>
        <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.shareTitle") }}</h2>
        <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
          {{ t("landing.features.shareSubtitle") }}
        </p>
        <div class="mt-6 flex items-center gap-3 text-sm font-semibold text-[#0f172a] dark:text-slate-100">
          <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">→</span>
          {{ t("landing.features.seeAllFeatures") }}
        </div>
      </div>
      <div class="rounded-3xl bg-[#0f111a] p-6 shadow-2xl">
        <div class="rounded-2xl border border-white/10 bg-[#121826] p-5 text-left text-xs text-white/70">
          <p class="text-white/40">index.ts</p>
          <div class="mt-4 space-y-2 font-mono">
            <p><span class="text-[#f97316]">const</span> cloudhub = <span class="text-[#22d3ee]">create</span>()</p>
            <p><span class="text-[#22c55e]">monitor</span>(users, workflows)</p>
            <p><span class="text-[#a78bfa]">share</span>(reports)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div class="order-2 rounded-3xl bg-[#0f111a] p-6 shadow-2xl lg:order-1">
        <div class="space-y-3 rounded-2xl border border-white/10 bg-[#161b2c] p-4">
          <div v-for="feedback in feedbackPreview" :key="feedback.title" class="flex items-center justify-between rounded-xl bg-[#0f1322] p-3">
            <div>
              <p class="text-sm font-semibold text-white">{{ feedback.title }}</p>
              <p class="text-xs text-white/60">{{ feedback.subtitle }}</p>
            </div>
            <UBadge color="success" variant="soft">{{ feedback.score }}</UBadge>
          </div>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <p class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">{{ t("landing.features.commentsLabel") }}</p>
        <h2 class="max-w-md text-4xl font-extrabold leading-tight tracking-tight">{{ t("landing.features.feedbackTitle") }}</h2>
        <p class="mt-4 max-w-md text-[#64748b] dark:text-slate-300">
          {{ t("landing.features.feedbackSubtitle") }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type FeedbackPreviewItem = {
  title: string
  subtitle: string
  score: string
}

defineProps<{
  feedbackPreview: FeedbackPreviewItem[]
}>()

const { t } = useI18n()
</script>
