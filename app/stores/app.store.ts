export const useAppStore = defineStore("app", () => {
  const sidebarOpen = ref(false)

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  return {
    sidebarOpen,
    toggleSidebar,
  }
})
