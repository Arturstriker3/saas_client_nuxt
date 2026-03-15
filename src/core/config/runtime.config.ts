export type AppRuntimeConfig = {
  apiBase: string
}

export const useAppRuntimeConfig = (): AppRuntimeConfig => {
  const config = useRuntimeConfig()

  return {
    apiBase: config.public.apiBase as string,
  }
}
