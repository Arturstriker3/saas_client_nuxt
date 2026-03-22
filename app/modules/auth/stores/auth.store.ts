import type { AuthSession, AuthUser } from "../types"

const AUTH_ACCESS_TOKEN_COOKIE = "auth_access_token"
const AUTH_REFRESH_TOKEN_COOKIE = "auth_refresh_token"
const AUTH_USER_COOKIE = "auth_user"

export const useAuthStore = defineStore("auth", () => {
  const accessTokenCookie = useCookie<string | null>(AUTH_ACCESS_TOKEN_COOKIE, {
    default: () => null,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  const refreshTokenCookie = useCookie<string | null>(AUTH_REFRESH_TOKEN_COOKIE, {
    default: () => null,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  const userCookie = useCookie<AuthUser | null>(AUTH_USER_COOKIE, {
    default: () => null,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  const user = computed(() => userCookie.value)
  const accessToken = computed(() => accessTokenCookie.value)
  const refreshToken = computed(() => refreshTokenCookie.value)
  const isAuthenticated = computed(() => Boolean(accessToken.value))

  const setUser = (nextUser: AuthUser | null) => {
    userCookie.value = nextUser
  }

  const setTokens = (tokens: Pick<AuthSession, "accessToken" | "refreshToken">) => {
    accessTokenCookie.value = tokens.accessToken
    refreshTokenCookie.value = tokens.refreshToken
  }

  const setSession = (session: AuthSession) => {
    setUser(session.user)
    setTokens({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    })
  }

  const signIn = (session: AuthSession) => {
    setSession(session)
  }

  const signOut = () => {
    userCookie.value = null
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setUser,
    setTokens,
    setSession,
    signIn,
    signOut,
  }
})
