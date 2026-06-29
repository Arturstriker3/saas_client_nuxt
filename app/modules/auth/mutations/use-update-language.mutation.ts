import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { authRepository } from "../repository/auth.repository"
import { authKeys } from "../queries/auth.keys"

export const useUpdateLanguageMutation = () => {
  const { t } = useI18n()
  const appToast = useAppToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (language: string) => authRepository.updateLanguage(language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
      appToast.success({ title: t("app.profile.languageUpdated") })
    },
    onError: () => {
      appToast.error({ title: t("app.profile.languageError") })
    },
  })
}
