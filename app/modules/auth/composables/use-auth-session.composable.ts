import { useQueryClient } from "@tanstack/vue-query"
import type { RegisterRequestDto } from "../dto/auth.dto"
import { useLoginMutation } from "../mutations/use-login.mutation"
import { useRegisterAndSignInMutation } from "../mutations/use-register-and-sign-in.mutation"
import { authKeys } from "../queries/auth.keys"
import { AUTH_ME_STALE_TIME } from "../queries/use-me.query"
import { authRepository } from "../repository/auth.repository"

export const useAuthSession = () => {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  const loginMutation = useLoginMutation()
  const registerAndSignInMutation = useRegisterAndSignInMutation()

  const syncCurrentUser = async () => {
    await queryClient.fetchQuery({
      queryKey: authKeys.me(),
      queryFn: () => authRepository.getMe(),
      staleTime: AUTH_ME_STALE_TIME,
    })
  }

  const applyTokensAndLoadCurrentUser = async (tokens: {
    accessToken: string
    refreshToken: string
  }) => {
    try {
      authStore.setTokens(tokens)
      await syncCurrentUser()
    }
    catch (error) {
      authStore.signOut()
      throw error
    }
  }

  const signInWithPassword = async (payload: {
    email: string
    password: string
    redirectRouteName?: unknown
  }) => {
    await loginMutation.mutateAsync(payload)
  }

  const registerAndSignIn = async (payload: RegisterRequestDto) => {
    await registerAndSignInMutation.mutateAsync(payload)
  }

  return {
    syncCurrentUser,
    applyTokensAndLoadCurrentUser,
    signInWithPassword,
    registerAndSignIn,
  }
}
