<template>
  <div class="flex min-h-screen items-center justify-center bg-white px-6 text-center text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="max-w-md space-y-3">
      <div class="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
        <UIcon name="i-lucide-loader-circle" class="h-6 w-6 animate-spin" />
      </div>
      <h1 class="text-xl font-bold">{{ t("auth.login.title") }}</h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        {{ statusMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthOAuth } from "~/modules/auth/composables/use-auth-oauth.composable"

definePageMeta({
  name: "auth-google-callback",
})

const { t } = useI18n()
const route = useRoute()
const { completeGoogleOAuth } = useAuthOAuth()
const statusMessage = ref(t("auth.oauth.processing"))

onMounted(async () => {
  const code = route.query.code
  const state = route.query.state

  if (typeof code !== "string" || typeof state !== "string") {
    statusMessage.value = t("auth.oauth.error")
    await navigateTo({ name: "auth-login" })
    return
  }

  try {
    await completeGoogleOAuth({
      code,
      state,
      redirect: route.query.redirect,
    })
  }
  catch {
    statusMessage.value = t("auth.oauth.error")
    await navigateTo({ name: "auth-login" })
  }
})
</script>
