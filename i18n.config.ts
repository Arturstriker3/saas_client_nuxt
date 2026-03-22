import en from "./app/core/i18n/locales/en.json";
import es from "./app/core/i18n/locales/es.json";
import pt from "./app/core/i18n/locales/pt.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pt",
  fallbackLocale: "en",
  messages: {
    pt,
    en,
    es,
  },
}));
