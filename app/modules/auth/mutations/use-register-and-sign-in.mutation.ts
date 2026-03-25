import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { RegisterRequestDto } from "../dto/auth.dto";
import { authRepository } from "../repository/auth.repository";
import { authKeys } from "../queries/auth.keys";
import { AUTH_ME_STALE_TIME } from "../queries/use-me.query";

export const useRegisterAndSignInMutation = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const appToast = useAppToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (payload: RegisterRequestDto) => {
      await authRepository.register(payload);

      const tokens = await authRepository.login({
        email: payload.email,
        password: payload.password,
      });

      authStore.setTokens(tokens);

      try {
        await queryClient.fetchQuery({
          queryKey: authKeys.me(),
          queryFn: () => authRepository.getMe(),
          staleTime: AUTH_ME_STALE_TIME,
        });
      } catch (error) {
        authStore.signOut();
        throw error;
      }
    },
    onSuccess: async () => {
      appToast.success({
        title: t("auth.toasts.success.register"),
      });
      await navigateTo({ name: "dashboard" });
    },
    onError: (error) => {
      appToast.apiError(error, {
        title: t("auth.toasts.error.register"),
      });
    },
  });
};
