import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { authRepository } from "../repository/auth.repository";
import { authKeys } from "../queries/auth.keys";
import { AUTH_ME_STALE_TIME } from "../queries/use-me.query";

type AuthRouteName = "dashboard";

const getSafeRedirectRouteName = (routeName: unknown): AuthRouteName => {
  if (routeName === "dashboard") {
    return routeName;
  }

  return "dashboard";
};

export const useLoginMutation = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      redirectRouteName?: unknown;
    }) => {
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

      return {
        redirectRouteName: getSafeRedirectRouteName(payload.redirectRouteName),
      };
    },
    onSuccess: async (result) => {
      await navigateTo({ name: result.redirectRouteName });
    },
  });
};
