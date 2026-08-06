<template>
  <ClientOnly>
    <div class="flex h-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] transition-colors dark:bg-slate-950 dark:text-slate-100">
      <AppSidebar />
      <div class="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>
    </div>
  </ClientOnly>
</template>
