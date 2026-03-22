import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { authKeys } from "../queries/auth.keys"

export const useLogoutMutation = () => {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      authStore.signOut()
      await queryClient.removeQueries({ queryKey: authKeys.me() })
    },
    onSuccess: async () => {
      await navigateTo({ name: "auth-login" })
    },
  })
}
