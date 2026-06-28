import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authRepository } from "../repository/auth.repository";
import { authKeys } from "../queries/auth.keys";
import { AUTH_ME_STALE_TIME } from "../queries/use-me.query";

const OAUTH_REDIRECT_STORAGE_KEY = "oauth_redirect_after_login";
type AuthRedirectRouteName = "dashboard";

const getSafeRedirectRouteName = (
  routeName: unknown,
): AuthRedirectRouteName => {
  if (routeName === "dashboard") {
    return routeName;
  }

  return "dashboard";
};

export const useCompleteGoogleOAuthMutation = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const appToast = useAppToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (input: {
      code: string;
      state: string;
      language?: "portuguese" | "english" | "spanish";
      redirect?: unknown;
    }) => {
      const tokens = await authRepository.completeGoogleOAuth({
        code: input.code,
        state: input.state,
        language: input.language,
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

      const persistedRedirectRouteName = sessionStorage.getItem(
        OAUTH_REDIRECT_STORAGE_KEY,
      );
      sessionStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);

      return {
        redirectRouteName: getSafeRedirectRouteName(
          input.redirect ?? persistedRedirectRouteName,
        ),
      };
    },
    onSuccess: async (result) => {
      appToast.success({
        title: t("auth.toasts.success.googleLogin"),
      });
      await navigateTo({ name: result.redirectRouteName });
    },
    onError: (error) => {
      appToast.apiError(error, {
        title: t("auth.toasts.error.googleLogin"),
      });
    },
  });
};
