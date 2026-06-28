<template>
  <div
    class="relative min-h-screen overflow-hidden bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70"
      :style="backgroundStyle"
    />
    <div
      class="relative mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-5 py-10"
    >
      <section
        class="w-full max-w-md rounded-[2rem] border border-black/10 bg-white/95 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.14)] backdrop-blur-sm transition-all duration-700 ease-out md:p-8 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_24px_64px_rgba(2,6,23,0.45)]"
        :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="mb-6">
          <NuxtLink
            to="/"
            :aria-label="t('auth.common.backToHome')"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#334155] transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-slate-300"
          >
            <UIcon name="i-lucide-arrow-left" class="h-4 w-4" />
          </NuxtLink>
        </div>
        <div class="text-center">
          <img
            src="/marcato.logo.png"
            alt="Logo Marcato"
            class="mx-auto h-12 w-auto"
          >
          <h1 class="mt-6 text-2xl font-extrabold tracking-tight">
            {{ t("auth.forgotPassword.title") }}
          </h1>
          <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">
            {{ t("auth.forgotPassword.description") }}
          </p>
        </div>

        <form class="mt-8 space-y-4" @submit.prevent="handleSubmit">
          <UInput
            v-model="email"
            type="email"
            :placeholder="t('auth.forgotPassword.emailPlaceholder')"
            size="xl"
            color="primary"
            variant="outline"
            class="w-full"
            autocomplete="email"
          >
            <template #leading>
              <UIcon name="i-lucide-mail" class="h-4 w-4 text-[#64748b]" />
            </template>
          </UInput>

          <UButton
            type="submit"
            color="primary"
            size="xl"
            class="w-full justify-center rounded-xl"
            :loading="isLoading"
          >
            {{ t("auth.forgotPassword.sendLink") }}
          </UButton>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink
            :to="{ name: 'auth-login' }"
            class="text-sm font-semibold text-primary hover:underline"
          >
            {{ t("auth.forgotPassword.backToLogin") }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "auth-forgot-password",
})

const { t } = useI18n()
const appToast = useAppToast()
const isContentVisible = ref(false)

const email = ref("")
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!email.value) {
    appToast.warning({ title: t("auth.forgotPassword.emailRequired") })
    return
  }

  isLoading.value = true

  // TODO: integrate with backend endpoint
  await new Promise((resolve) => setTimeout(resolve, 1000))

  isLoading.value = false
  appToast.success({ title: t("auth.forgotPassword.emailSent") })
}

const backgroundStyle = {
  background: `
    radial-gradient(circle at 8% 6%, rgba(16,185,129,0.16), transparent 38%),
    radial-gradient(circle at 92% 10%, rgba(14,165,233,0.14), transparent 34%),
    repeating-linear-gradient(
      170deg,
      rgba(16,185,129,0.07) 0px,
      rgba(16,185,129,0.07) 1px,
      transparent 1px,
      transparent 34px
    )
  `,
}

onMounted(() => {
  requestAnimationFrame(() => {
    isContentVisible.value = true
  })
})
</script>
