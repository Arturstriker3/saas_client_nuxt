import { authRepository } from "../repository/auth.repository";
import { useCompleteGoogleOAuthMutation } from "../mutations/use-complete-google-oauth.mutation";

export const useAuthOAuth = () => {
  const completeGoogleOAuthMutation = useCompleteGoogleOAuthMutation();

  const startGoogleOAuth = async () => {
    const authorizationUrl = await authRepository.startGoogleOAuth();
    window.location.href = authorizationUrl;
  };

  const completeGoogleOAuth = async (input: {
    code: string;
    state: string;
    language?: "portuguese" | "english" | "spanish";
  }) => {
    await completeGoogleOAuthMutation.mutateAsync(input);
  };

  return {
    startGoogleOAuth,
    completeGoogleOAuth,
    isGoogleOAuthCompleting: completeGoogleOAuthMutation.isPending,
  };
};
