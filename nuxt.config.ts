// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "nuxt-quasar-ui",
    "@sidebase/nuxt-auth",
    "nuxt-server-utils",
    "@formkit/auto-animate/nuxt",
  ],
  googleFonts: {
    families: {
      Lora: true,
    },
    // overwriting: true,
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  quasar: {
    plugins: ["Dialog", "Loading", "Notify"],
  },
});
