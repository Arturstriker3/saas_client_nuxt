import type { $Fetch } from "nitropack";
import {
  authSessionTokensResponseDtoSchema,
  refreshTokenRequestDtoSchema,
} from "~/modules/auth/dto/auth.dto";
import { useAppRuntimeConfig } from "../config/runtime.config";

const AUTH_ACCESS_TOKEN_COOKIE = "auth_access_token";
const AUTH_REFRESH_TOKEN_COOKIE = "auth_refresh_token";
const AUTH_RETRY_HEADER = "x-auth-refresh-attempt";
const REFRESH_TOKEN_ENDPOINT = "/auth/refresh-token";
type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "CONNECT";

const toHttpMethod = (method: unknown): HttpMethod | undefined => {
  if (typeof method !== "string") {
    return;
  }

  const normalizedMethod = method.toUpperCase();
  switch (normalizedMethod) {
    case "GET":
    case "POST":
    case "PUT":
    case "PATCH":
    case "DELETE":
    case "HEAD":
    case "OPTIONS":
    case "TRACE":
    case "CONNECT":
      return normalizedMethod;
    default:
      return;
  }
};

export const useHttpClient = (): $Fetch => {
  const { apiBase } = useAppRuntimeConfig();

  return $fetch.create({
    baseURL: apiBase,
    onRequest({ options }) {
      const headers = new Headers(options.headers as HeadersInit | undefined);
      const authStore = useAuthStore();
      const accessTokenFromCookie = useCookie<string | null>(
        AUTH_ACCESS_TOKEN_COOKIE,
        {
          default: () => null,
        },
      ).value;
      const accessToken = authStore.accessToken ?? accessTokenFromCookie;

      if (accessToken && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      options.headers = headers;
    },
    async onResponseError({ request, options, response }) {
      if (response.status !== 401) {
        return;
      }

      const headers = new Headers(options.headers as HeadersInit | undefined);
      const hasRetried = headers.get(AUTH_RETRY_HEADER) === "1";
      const isRefreshRequest =
        typeof request === "string" && request.includes(REFRESH_TOKEN_ENDPOINT);

      if (hasRetried || isRefreshRequest) {
        useAuthStore().signOut();
        return;
      }

      const refreshToken = useCookie<string | null>(AUTH_REFRESH_TOKEN_COOKIE, {
        default: () => null,
      }).value;
      if (!refreshToken) {
        useAuthStore().signOut();
        return;
      }

      try {
        const refreshRequest = refreshTokenRequestDtoSchema.parse({
          refreshToken,
        });
        const refreshedResponse = await $fetch(REFRESH_TOKEN_ENDPOINT, {
          method: "POST",
          baseURL: apiBase,
          body: refreshRequest,
        });
        const refreshedTokens =
          authSessionTokensResponseDtoSchema.parse(refreshedResponse);

        useAuthStore().setTokens(refreshedTokens);

        const retryHeaders = new Headers(
          options.headers as HeadersInit | undefined,
        );
        retryHeaders.set(
          "Authorization",
          `Bearer ${refreshedTokens.accessToken}`,
        );
        retryHeaders.set(AUTH_RETRY_HEADER, "1");
        const { method, ...retryOptions } = options;

        return await $fetch(request, {
          ...retryOptions,
          method: toHttpMethod(method),
          baseURL: apiBase,
          headers: retryHeaders,
        });
      } catch {
        useAuthStore().signOut();
      }
    },
  });
};
