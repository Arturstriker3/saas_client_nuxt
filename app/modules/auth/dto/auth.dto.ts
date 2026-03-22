import { z } from "zod";

export const startGoogleOAuthResponseDtoSchema = z.object({
  authorizationUrl: z.string().min(1),
});

export type StartGoogleOAuthResponseDto = z.infer<
  typeof startGoogleOAuthResponseDtoSchema
>;

export const completeGoogleOAuthRequestDtoSchema = z.object({
  code: z.string().min(1),
  state: z.string().min(1),
});

export type CompleteGoogleOAuthRequestDto = z.infer<
  typeof completeGoogleOAuthRequestDtoSchema
>;

export const loginRequestDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginRequestDto = z.infer<typeof loginRequestDtoSchema>;

export const authSessionTokensResponseDtoSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthSessionTokensResponseDto = z.infer<
  typeof authSessionTokensResponseDtoSchema
>;

export const refreshTokenRequestDtoSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenRequestDto = z.infer<
  typeof refreshTokenRequestDtoSchema
>;

export const registerRequestDtoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  language: z.enum(["portuguese", "english", "spanish"]),
  birthDate: z.string().min(1),
});

export type RegisterRequestDto = z.infer<typeof registerRequestDtoSchema>;

export const authMeResponseDtoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  role: z.string().optional(),
  language: z.string().optional(),
  birthDate: z.union([z.string(), z.date(), z.null()]).optional(),
});

export type AuthMeResponseDto = z.infer<typeof authMeResponseDtoSchema>;
