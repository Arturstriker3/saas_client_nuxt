<template>
  <Transition name="back-to-top-fade">
    <div
      v-if="visible"
      class="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:px-0"
    >
      <UButton
        color="primary"
        size="lg"
        class="pointer-events-auto rounded-full px-5 shadow-lg shadow-black/20"
        @click="scrollToTop"
      >
        <UIcon name="i-lucide-arrow-up" class="h-4 w-4" />
      </UButton>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>

<style scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.back-to-top-fade-enter-from,
.back-to-top-fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
}
</style>
