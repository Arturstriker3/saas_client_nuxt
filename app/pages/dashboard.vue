<template>
  <div class="min-h-screen bg-white px-5 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <div class="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Área privada</p>
        <h1 class="mt-1 text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Bem-vindo, {{ user?.name ?? "Usuário" }}.
        </p>
      </div>
      <UButton color="neutral" variant="outline" size="lg" class="rounded-xl" @click="handleSignOut">
        Sair
      </UButton>
    </div>

    <div class="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <p class="text-sm text-slate-600 dark:text-slate-300">Email autenticado:</p>
      <p class="mt-1 text-base font-semibold">{{ user?.email ?? "-" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"

definePageMeta({
  name: "dashboard",
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleSignOut = async () => {
  authStore.signOut()
  await navigateTo({ name: "auth-login" })
}
</script>
