import { authRepository } from "../repository/auth.repository";
import { useAuthSession } from "./use-auth-session.composable";

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

export const useAuthOAuth = () => {
  const { applyTokensAndLoadCurrentUser } = useAuthSession();

  const startGoogleOAuth = async (
    redirectRouteName?: AuthRedirectRouteName,
  ) => {
    if (redirectRouteName) {
      sessionStorage.setItem(
        OAUTH_REDIRECT_STORAGE_KEY,
        getSafeRedirectRouteName(redirectRouteName),
      );
    }

    const authorizationUrl = await authRepository.startGoogleOAuth();
    window.location.href = authorizationUrl;
  };

  const completeGoogleOAuth = async (input: {
    code: string;
    state: string;
    redirect?: unknown;
  }) => {
    const tokens = await authRepository.completeGoogleOAuth({
      code: input.code,
      state: input.state,
    });

    await applyTokensAndLoadCurrentUser(tokens);

    const persistedRedirectRouteName = sessionStorage.getItem(
      OAUTH_REDIRECT_STORAGE_KEY,
    );
    sessionStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);

    await navigateTo({
      name: getSafeRedirectRouteName(
        input.redirect ?? persistedRedirectRouteName,
      ),
    });
  };

  return {
    startGoogleOAuth,
    completeGoogleOAuth,
  };
};
