<template>
  <div class="relative min-h-screen overflow-hidden bg-white text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70" :style="backgroundStyle" />
    <div class="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
      <section
        class="hidden p-2 transition-all duration-700 ease-out lg:block"
        :class="isContentVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
      >
        <div>
          <img
            src="/marcato.logo.png"
            alt="Logo Marcato"
            class="h-auto w-full max-w-[24rem] object-contain transition-all duration-700 ease-out"
            :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
            :style="{ transitionDelay: isContentVisible ? '220ms' : '0ms' }"
          >
          <div class="mt-10 space-y-3">
            <article
              v-for="item in heroHighlights"
              :key="item.title"
              class="rounded-2xl border border-black/10 bg-white/80 p-4 transition-all duration-700 ease-out dark:border-white/10 dark:bg-slate-900/70"
              :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
              :style="{ transitionDelay: isContentVisible ? `${item.delay}ms` : '0ms' }"
            >
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  <UIcon :name="item.icon" class="h-4 w-4" />
                </span>
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{{ item.title }}</p>
                  <p class="mt-1.5 text-sm text-slate-700 dark:text-slate-300">{{ item.description }}</p>
                </div>
              </div>
            </article>
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
          <NuxtLink :to="{ name: 'auth-register' }" class="text-sm font-semibold text-primary hover:underline">
            {{ t("auth.login.switchToRegister") }}
          </NuxtLink>
        </div>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold tracking-tight">{{ t("auth.login.title") }}</h2>
          <p class="mt-2 text-sm text-[#64748b] dark:text-slate-300">{{ t("auth.login.subtitle") }}</p>
        </div>
        <form
          class="mt-8 space-y-4 transition-all duration-200"
          :class="isAuthActionLoading ? 'pointer-events-none opacity-80 blur-[1px]' : ''"
          @submit.prevent="handleLoginSubmit"
        >
          <div class="space-y-2">
            <label for="email" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.login.emailLabel") }}</label>
            <UInput
              id="email"
              v-model="email"
              type="email"
              maxlength="254"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              :placeholder="t('auth.login.emailPlaceholder')"
              :disabled="isAuthActionLoading"
            />
            <p v-if="loginEmailError" class="text-xs font-semibold text-rose-600 dark:text-rose-400">
              {{ loginEmailError }}
            </p>
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-semibold text-[#334155] dark:text-slate-200">{{ t("auth.login.passwordLabel") }}</label>
            <UInput
              id="password"
              v-model="password"
              :type="showLoginPassword ? 'text' : 'password'"
              maxlength="72"
              required
              size="xl"
              color="primary"
              variant="outline"
              class="w-full"
              placeholder="••••••••"
              :disabled="isAuthActionLoading"
            >
              <template #trailing>
                <UButton
                  type="button"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  square
                  :disabled="isAuthActionLoading"
                  @click="showLoginPassword = !showLoginPassword"
                >
                  <UIcon :name="showLoginPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="h-5 w-5" />
                </UButton>
              </template>
            </UInput>
          </div>
          <div class="flex justify-end">
            <NuxtLink :to="{ name: 'auth-forgot-password' }" class="text-xs font-semibold text-primary hover:underline">{{ t("auth.login.forgotPassword") }}</NuxtLink>
          </div>
          <UButton
            type="submit"
            color="primary"
            size="xl"
            class="mt-1 w-full justify-center rounded-xl"
            :loading="isLoginLoading"
            :disabled="isAuthActionLoading"
          >
            <span v-if="!isLoginLoading">{{ t("auth.login.submit") }}</span>
          </UButton>
          <div class="relative py-1">
            <div class="h-px bg-black/10 dark:bg-white/10" />
            <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-semibold text-[#64748b] dark:bg-slate-900 dark:text-slate-300">{{ t("auth.common.or") }}</span>
          </div>
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            size="xl"
            class="w-full justify-center gap-3 rounded-xl border-[#d0d7e2] bg-white text-[#0f172a] hover:bg-slate-50 dark:border-white/20 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            :loading="isGoogleOAuthLoading"
            :disabled="isAuthActionLoading"
            @click="handleGoogleOAuthStart"
          >
            <UIcon name="i-logos-google-icon" class="h-4 w-4" />
            {{ t("auth.common.continueWithGoogle") }}
          </UButton>
        </form>
      </section>
    </div>
    <p class="relative pb-6 text-center text-xs font-semibold text-[#64748b] dark:text-slate-400">© {{ currentYear }} {{ appName }}. {{ t("auth.common.allRightsReserved") }}</p>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod"
import { useAuthOAuth } from "~/modules/auth/composables/use-auth-oauth.composable"
import { useAuthSession } from "~/modules/auth/composables/use-auth-session.composable"

definePageMeta({
  name: "auth-login",
})

const { t } = useI18n()
const {
  public: { appName },
} = useRuntimeConfig()
const route = useRoute()
const { startGoogleOAuth } = useAuthOAuth()
const { signInWithPassword } = useAuthSession()
const isContentVisible = ref(false)
const currentYear = new Date().getFullYear()
type HeroHighlight = {
  icon: string
  title: string
  description: string
  delay: number
}
type AuthRedirectRouteName = "app"

const showLoginPassword = ref(false)
const email = ref("")
const password = ref("")
const loginEmailError = ref("")
const isLoginLoading = ref(false)
const isGoogleOAuthLoading = ref(false)
const isAuthActionLoading = computed(() =>
  isLoginLoading.value || isGoogleOAuthLoading.value,
)
const heroHighlights = computed<HeroHighlight[]>(() => [
  {
    icon: "i-lucide-check-check",
    title: t("auth.login.hero.item1.title"),
    description: t("auth.login.hero.item1.description"),
    delay: 320,
  },
  {
    icon: "i-lucide-target",
    title: t("auth.login.hero.item2.title"),
    description: t("auth.login.hero.item2.description"),
    delay: 420,
  },
])

const getSafeRedirectRouteName = (redirectValue: unknown): AuthRedirectRouteName => {
  if (redirectValue === "app" || redirectValue === "dashboard") {
    return "app"
  }

  return "app"
}

const handleLoginSubmit = async () => {
  const normalizedEmail = email.value.trim().toLowerCase()
  const isEmailValid = z.string().email().safeParse(normalizedEmail).success
  if (!isEmailValid) {
    loginEmailError.value = t("auth.login.errors.invalidEmail")
    return
  }

  loginEmailError.value = ""

  if (!password.value) {
    return
  }

  isLoginLoading.value = true

  try {
    await signInWithPassword({
      email: normalizedEmail,
      password: password.value,
      redirectRouteName: route.query.redirect,
    })
  }
  catch {
    return
  }
  finally {
    isLoginLoading.value = false
  }
}

watch(email, () => {
  loginEmailError.value = ""
})

const handleGoogleOAuthStart = async () => {
  isGoogleOAuthLoading.value = true

  try {
    await startGoogleOAuth(getSafeRedirectRouteName(route.query.redirect))
  }
  catch {
    return
  }
  finally {
    isGoogleOAuthLoading.value = false
  }
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
