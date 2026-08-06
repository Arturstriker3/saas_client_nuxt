const isMobileSidebarOpen = ref(false);

export const useMobileSidebar = () => {
  const open = () => {
    isMobileSidebarOpen.value = true;
  };
  const close = () => {
    isMobileSidebarOpen.value = false;
  };
  const isOpen = computed(() => isMobileSidebarOpen.value);

  return { isOpen, open, close };
};
