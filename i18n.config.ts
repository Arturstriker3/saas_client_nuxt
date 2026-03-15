import en from "./app/i18n/locales/en.json";
import es from "./app/i18n/locales/es.json";
import pt from "./app/i18n/locales/pt.json";

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
