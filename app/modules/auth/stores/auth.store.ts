import type { AuthUser } from "../types"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  const signIn = (nextUser: AuthUser) => {
    user.value = nextUser
  }

  const signOut = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
  }
})
