import { authRepository } from "../repository/auth.repository";
import type { RegisterRequestDto } from "../dto/auth.dto";

type AuthRouteName = "dashboard";

const getSafeRedirectRouteName = (routeName: unknown): AuthRouteName => {
  if (routeName === "dashboard") {
    return routeName;
  }

  return "dashboard";
};

export const useAuthSession = () => {
  const authStore = useAuthStore();

  const syncCurrentUser = async () => {
    const me = await authRepository.getMe();
    authStore.setUser({
      name: me.name,
      email: me.email,
    });
  };

  const applyTokensAndLoadCurrentUser = async (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    try {
      authStore.setTokens(tokens);
      await syncCurrentUser();
    } catch (error) {
      authStore.signOut();
      throw error;
    }
  };

  const signInWithPassword = async (payload: {
    email: string;
    password: string;
    redirectRouteName?: unknown;
  }) => {
    const tokens = await authRepository.login({
      email: payload.email,
      password: payload.password,
    });
    await applyTokensAndLoadCurrentUser(tokens);

    await navigateTo({
      name: getSafeRedirectRouteName(payload.redirectRouteName),
    });
  };

  const registerAndSignIn = async (payload: RegisterRequestDto) => {
    await authRepository.register(payload);

    const tokens = await authRepository.login({
      email: payload.email,
      password: payload.password,
    });
    await applyTokensAndLoadCurrentUser(tokens);

    await navigateTo({
      name: "dashboard",
    });
  };

  return {
    syncCurrentUser,
    applyTokensAndLoadCurrentUser,
    signInWithPassword,
    registerAndSignIn,
  };
};
