import tailwindcss from "@tailwindcss/vite";

const appName = process.env.NUXT_PUBLIC_APP_NAME || "SaaS Client";

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
      appName,
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
    name: appName,
  },
  app: {
    head: {
      title: appName,
      titleTemplate: "%s",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", href: "/favicon.ico" },
      ],
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
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
