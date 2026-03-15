export type SupportedLocale = "pt" | "en" | "es"

export const useLocaleSwitcher = () => {
  const { locale, locales, setLocale } = useI18n()

  const availableLocales = computed(() =>
    locales.value.map((currentLocale) => ({
      code: currentLocale.code,
      name: currentLocale.name ?? currentLocale.code,
    })),
  )

  const changeLocale = async (nextLocale: SupportedLocale) => {
    if (nextLocale === locale.value) {
      return
    }

    await setLocale(nextLocale)
  }

  return {
    locale,
    availableLocales,
    changeLocale,
  }
}
