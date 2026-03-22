import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { authRepository } from "../repository/auth.repository"
import { authKeys } from "../queries/auth.keys"
import { AUTH_ME_STALE_TIME } from "../queries/use-me.query"

const OAUTH_REDIRECT_STORAGE_KEY = "oauth_redirect_after_login"
type AuthRedirectRouteName = "dashboard"

const getSafeRedirectRouteName = (
  routeName: unknown,
): AuthRedirectRouteName => {
  if (routeName === "dashboard") {
    return routeName
  }

  return "dashboard"
}

export const useCompleteGoogleOAuthMutation = () => {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      code: string
      state: string
      redirect?: unknown
    }) => {
      const tokens = await authRepository.completeGoogleOAuth({
        code: input.code,
        state: input.state,
      })

      authStore.setTokens(tokens)

      try {
        await queryClient.fetchQuery({
          queryKey: authKeys.me(),
          queryFn: () => authRepository.getMe(),
          staleTime: AUTH_ME_STALE_TIME,
        })
      }
      catch (error) {
        authStore.signOut()
        throw error
      }

      const persistedRedirectRouteName = sessionStorage.getItem(
        OAUTH_REDIRECT_STORAGE_KEY,
      )
      sessionStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY)

      return {
        redirectRouteName: getSafeRedirectRouteName(
          input.redirect ?? persistedRedirectRouteName,
        ),
      }
    },
    onSuccess: async (result) => {
      await navigateTo({ name: result.redirectRouteName })
    },
  })
}
