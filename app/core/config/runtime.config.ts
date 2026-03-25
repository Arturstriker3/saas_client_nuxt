export type AppRuntimeConfig = {
  apiBase: string
  showTechnicalApiErrors: boolean
}

export const useAppRuntimeConfig = (): AppRuntimeConfig => {
  const config = useRuntimeConfig()

  return {
    apiBase: config.public.apiBase as string,
    showTechnicalApiErrors: Boolean(config.public.showTechnicalApiErrors),
  }
}
