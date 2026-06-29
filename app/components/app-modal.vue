<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-[15vh] pb-10"
        @click.self="$emit('close')"
      >
        <div
          class="relative mx-4 w-full max-w-md rounded-2xl border border-black/10 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-slate-900"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/10">
            <h2 class="text-base font-bold tracking-tight">
              <slot name="title" />
            </h2>
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              square
              @click="$emit('close')"
            >
              <UIcon name="i-lucide-x" class="h-4 w-4" />
            </UButton>
          </div>

          <div class="px-5 py-6">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-3 border-t border-black/5 px-5 py-4 dark:border-white/10"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal-backdrop">
      <div v-if="open" class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(4px);
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 200ms ease;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}
</style>
