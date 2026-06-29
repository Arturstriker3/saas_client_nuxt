import {
  authMeResponseDtoSchema,
  authSessionTokensResponseDtoSchema,
  completeGoogleOAuthRequestDtoSchema,
  loginRequestDtoSchema,
  registerRequestDtoSchema,
  refreshTokenRequestDtoSchema,
  startGoogleOAuthResponseDtoSchema,
  type AuthMeResponseDto,
  type AuthSessionTokensResponseDto,
  type CompleteGoogleOAuthRequestDto,
  type LoginRequestDto,
  type RegisterRequestDto,
} from "../dto/auth.dto";
import { z } from "zod";
import { useHttpClient } from "~/core/api/http-client";

const updateBirthDatePayloadSchema = z.object({ birthDate: z.string().min(1) });
const updateLanguagePayloadSchema = z.object({
  language: z.enum(["portuguese", "english", "spanish"]),
});

export const authRepository = {
  async login(payload: LoginRequestDto): Promise<AuthSessionTokensResponseDto> {
    const request = loginRequestDtoSchema.parse(payload);
    const httpClient = useHttpClient();
    const response = await httpClient("/auth/login", {
      method: "POST",
      body: request,
    });

    return authSessionTokensResponseDtoSchema.parse(response);
  },

  async register(payload: RegisterRequestDto): Promise<void> {
    const request = registerRequestDtoSchema.parse(payload);
    const httpClient = useHttpClient();

    await httpClient("/auth/register", {
      method: "POST",
      body: request,
    });
  },

  async startGoogleOAuth(): Promise<string> {
    const httpClient = useHttpClient();
    const response = await httpClient("/auth/oauth/google/start", {
      method: "GET",
    });
    const parsedResponse = startGoogleOAuthResponseDtoSchema.parse(response);
    return parsedResponse.authorizationUrl;
  },

  async completeGoogleOAuth(
    payload: CompleteGoogleOAuthRequestDto,
  ): Promise<AuthSessionTokensResponseDto> {
    const request = completeGoogleOAuthRequestDtoSchema.parse(payload);
    const httpClient = useHttpClient();
    const response = await httpClient("/auth/oauth/google/complete", {
      method: "POST",
      body: request,
    });

    return authSessionTokensResponseDtoSchema.parse(response);
  },

  async refreshToken(
    refreshToken: string,
  ): Promise<AuthSessionTokensResponseDto> {
    const request = refreshTokenRequestDtoSchema.parse({ refreshToken });
    const httpClient = useHttpClient();
    const response = await httpClient("/auth/refresh-token", {
      method: "POST",
      body: request,
    });

    return authSessionTokensResponseDtoSchema.parse(response);
  },

  async getMe(): Promise<AuthMeResponseDto> {
    const httpClient = useHttpClient();
    const response = await httpClient("/auth/me", {
      method: "GET",
    });
    return authMeResponseDtoSchema.parse(response);
  },

  async updateBirthDate(birthDate: string): Promise<AuthMeResponseDto> {
    const httpClient = useHttpClient();
    const response = await httpClient("/users/me/birth-date", {
      method: "POST",
      body: updateBirthDatePayloadSchema.parse({ birthDate }),
    });
    return authMeResponseDtoSchema.parse(response);
  },

  async updateLanguage(language: string): Promise<AuthMeResponseDto> {
    const httpClient = useHttpClient();
    const response = await httpClient("/users/me/language", {
      method: "POST",
      body: updateLanguagePayloadSchema.parse({ language }),
    });
    return authMeResponseDtoSchema.parse(response);
  },
};
