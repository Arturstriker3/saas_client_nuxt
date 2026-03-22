import { useQuery } from "@tanstack/vue-query"
import { storeToRefs } from "pinia"
import { authRepository } from "../repository/auth.repository"
import { authKeys } from "./auth.keys"

export const AUTH_ME_STALE_TIME = 60_000

export const useMeQuery = () => {
  const authStore = useAuthStore()
  const { accessToken } = storeToRefs(authStore)

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authRepository.getMe(),
    enabled: computed(() => Boolean(accessToken.value)),
    staleTime: AUTH_ME_STALE_TIME,
  })
}
