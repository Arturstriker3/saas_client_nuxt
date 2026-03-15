<template>
  <main class="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-6">
    <div class="space-y-3">
      <p class="text-sm font-medium text-(--ui-primary)">Base Cognitiva Ativa</p>
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Nuxt Client-Side com Tailwind 4 e Nuxt UI
      </h1>
      <p class="text-(--ui-text-muted)">
        Antes de qualquer decisão de produto, seguimos as leis em LEIS_DO_PROJETO.md derivadas de ENVIESADOS.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <UButton to="https://nuxt.com/docs/getting-started/introduction" target="_blank">
        Ver docs do Nuxt
      </UButton>
      <UButton color="neutral" variant="outline" to="https://ui.nuxt.com/" target="_blank">
        Ver docs do Nuxt UI
      </UButton>
    </div>
  </main>
</template>
