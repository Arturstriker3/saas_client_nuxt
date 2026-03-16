<template>
  <div class="relative min-h-screen overflow-hidden bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70" :style="backgroundStyle" />
    <div class="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
      <section
        class="relative hidden overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,#f8fffd_0%,#ebf5ff_46%,#f4edff_100%)] p-10 text-[#0f172a] shadow-[0_28px_80px_rgba(15,23,42,0.14)] transition-all duration-700 ease-out lg:block"
        :class="isContentVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
      >
        <div class="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-emerald-300/40 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-indigo-300/45 blur-3xl" />
        <div class="relative z-10">
          <div
            class="inline-flex rounded-[2rem] border border-white/70 bg-white/60 p-2 shadow-[0_14px_36px_rgba(14,116,144,0.24)] backdrop-blur-xl transition-all duration-700 ease-out"
            :class="isContentVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-75 opacity-0'"
            :style="{ transitionDelay: isContentVisible ? '260ms' : '0ms' }"
          >
            <img src="/marcato.logo.png" alt="Logo" class="h-72 w-72 object-cover" >
          </div>
          <p class="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">{{ appName }}</p>
          <h1 class="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900">{{ t("auth.login.hero.title") }}</h1>
          <p class="mt-4 text-base text-slate-700">
            {{ t("auth.login.hero.subtitle") }}
          </p>
          <div class="mt-8 space-y-3">
            <div class="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{{ t("auth.login.hero.item1.title") }}</p>
              <p class="mt-2 text-sm text-slate-700">{{ t("auth.login.hero.item1.description") }}</p>
            </div>
            <div class="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <p class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{{ t("auth.login.hero.item2.title") }}</p>
              <p class="mt-2 text-sm text-slate-700">{{ t("auth.login.hero.item2.description") }}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="mx-auto w-full max-w-md rounded-[2rem] border border-black/10 bg-white/95 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.14)] backdrop-blur-sm transition-all duration-700 ease-out md:p-8 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_24px_64px_rgba(2,6,23,0.45)]"
        :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ transitionDelay: isContentVisible ? '120ms' : '0ms' }"
      >
        <div class="mb-6 flex items-center justify-between">
          <NuxtLink
            to="/"
            :aria-label="t('auth.common.backToHome')"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#334155] transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-slate-300"
          >
            <UIcon name="i-lucide-arrow-left" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink to="/registro" class="text-sm font-semibold text-primary hover:underline">
            {{ t("auth.login.switchToRegister") }}
          </NuxtLink>
        </div>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold tracking-tight">{{ t("auth.login.title") }}</h2>
          <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">{{ t("auth.login.subtitle") }}</p>
        </div>
        <form class="mt-8 space-y-4" @submit.prevent="handleLoginSubmit">
          <div class="space-y-2">
            <label for="email" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.login.emailLabel") }}</label>
            <UInput
              id="email"
              v-model="email"
              type="email"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.login.emailPlaceholder')"
            />
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.login.passwordLabel") }}</label>
            <UInput
              id="password"
              :type="showLoginPassword ? 'text' : 'password'"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              placeholder="••••••••"
            >
              <template #trailing>
                <UButton
                  type="button"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  square
                  @click="showLoginPassword = !showLoginPassword"
                >
                  <UIcon :name="showLoginPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="h-5 w-5" />
                </UButton>
              </template>
            </UInput>
          </div>
          <div class="flex justify-end">
            <NuxtLink to="/esqueci-senha" class="text-xs font-semibold text-primary hover:underline">{{ t("auth.login.forgotPassword") }}</NuxtLink>
          </div>
          <UButton type="submit" color="primary" size="xl" class="mt-1 w-full justify-center rounded-xl">{{ t("auth.login.submit") }}</UButton>
          <div class="relative py-1">
            <div class="h-px bg-black/10 dark:bg-white/10" />
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-[#64748b] dark:bg-slate-900 dark:text-slate-300">{{ t("auth.common.or") }}</span>
          </div>
          <UButton type="button" color="neutral" variant="outline" size="xl" class="w-full justify-center gap-3 rounded-xl border-[#d0d7e2] bg-white text-[#0f172a] hover:bg-slate-50 dark:border-white/20 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900">
            <UIcon name="i-simple-icons-google" class="h-4 w-4 text-[#4285F4]" />
            {{ t("auth.common.continueWithGoogle") }}
          </UButton>
        </form>
      </section>
    </div>
    <p class="relative pb-6 text-center text-xs font-semibold text-[#64748b] dark:text-slate-400">© {{ currentYear }} {{ appName }}. {{ t("auth.common.allRightsReserved") }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { appName } } = useRuntimeConfig()
const isContentVisible = ref(false)
const currentYear = new Date().getFullYear()
const showLoginPassword = ref(false)
const email = ref("")

const handleLoginSubmit = () => {
}

const backgroundStyle = {
  background: `
    radial-gradient(circle at 8% 10%, rgba(16,185,129,0.12), transparent 36%),
    radial-gradient(circle at 88% 8%, rgba(14,165,233,0.1), transparent 34%),
    repeating-linear-gradient(
      170deg,
      rgba(16,185,129,0.08) 0px,
      rgba(16,185,129,0.08) 1px,
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
