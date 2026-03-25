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
      showTechnicalApiErrors:
        process.env.NUXT_PUBLIC_SHOW_TECHNICAL_API_ERRORS === "true",
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
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "format-detection",
          content: "telephone=no, date=no, email=no, address=no",
        },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "mobile-web-app-capable", content: "yes" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/marcato.logo.png" },
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
  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
      },
    ],
  },
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
    optimizeDeps: {
      include: [
        "zod",
        "libphonenumber-js",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@tanstack/vue-query",
      ],
    },
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
