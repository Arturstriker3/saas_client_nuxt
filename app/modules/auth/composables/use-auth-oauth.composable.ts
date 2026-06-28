import { authRepository } from "../repository/auth.repository";
import { useCompleteGoogleOAuthMutation } from "../mutations/use-complete-google-oauth.mutation";

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
  const completeGoogleOAuthMutation = useCompleteGoogleOAuthMutation();

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
    language?: "portuguese" | "english" | "spanish";
    redirect?: unknown;
  }) => {
    await completeGoogleOAuthMutation.mutateAsync(input);
  };

  return {
    startGoogleOAuth,
    completeGoogleOAuth,
    isGoogleOAuthCompleting: completeGoogleOAuthMutation.isPending,
  };
};
