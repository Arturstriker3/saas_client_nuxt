import { storeToRefs } from "pinia"
import { useAuthStore } from "~/modules/auth/stores/auth.store"

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  if (!to.path.startsWith("/private")) {
    return
  }

  if (!isAuthenticated.value) {
    return navigateTo("/")
  }
})
