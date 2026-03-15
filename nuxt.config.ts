import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "app/",
  ssr: false,
  nitro: {
    preset: "static",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    name: "SaaS Client",
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
  ],
  css: ["~/assets/css/main.css"],
  plugins: ["~/core/plugins/vue-query"],
  imports: {
    dirs: ["core/utils", "modules/**/composables", "modules/**/stores"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/modules",
      extensions: [".vue"],
      pattern: "**/components/*.vue",
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "pt",
    strategy: "no_prefix",
    vueI18n: "../i18n.config.ts",
    locales: [
      { code: "pt", name: "Português", language: "pt-BR" },
      { code: "en", name: "English", language: "en-US" },
      { code: "es", name: "Español", language: "es-ES" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  ogImage: {
    enabled: false,
  },
});
