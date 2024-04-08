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
    "@formkit/auto-animate/nuxt",
  ],
  googleFonts: {
    families: {
      Lora: true,
    },
    overwriting: true,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
});
