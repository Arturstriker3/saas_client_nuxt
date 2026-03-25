import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authKeys } from "../queries/auth.keys";

export const useLogoutMutation = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const appToast = useAppToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async () => {
      authStore.signOut();
      await queryClient.removeQueries({ queryKey: authKeys.me() });
    },
    onSuccess: async () => {
      appToast.success({
        title: t("auth.toasts.success.logout"),
      });
      await navigateTo({ name: "auth-login" });
    },
    onError: (error) => {
      appToast.apiError(error, {
        title: t("auth.toasts.error.logout"),
      });
    },
  });
};
