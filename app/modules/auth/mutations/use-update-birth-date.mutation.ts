import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { authRepository } from "../repository/auth.repository"
import { authKeys } from "../queries/auth.keys"

export const useUpdateBirthDateMutation = () => {
  const { t } = useI18n()
  const appToast = useAppToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (birthDate: string) => authRepository.updateBirthDate(birthDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
      appToast.success({ title: t("app.profile.birthDateUpdated") })
    },
    onError: () => {
      appToast.error({ title: t("app.profile.birthDateError") })
    },
  })
}
