// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true }
// })

import { defineNuxtConfig } from "nuxt/config";

// import { defineNuxtConfig } from "nuxt/config";

// export default defineNuxtConfig({
//   devtools: { enabled: true },
//   modules: ["@nuxtjs/tailwindcss"],
//   css: ["/assets/main.css"],
//   // css: ["@/assets/css/main.css"],
//   app: {
//     head: {
//       title: "Xomie's Manager - Ticket Solutions",
//       meta: [
//         { charset: "utf-8" },
//         { name: "viewport", content: "width=device-width, initial-scale=1" },
//       ],
//     },
//   },
// });

export default defineNuxtConfig({
  compatibilityDate: "2025-10-28",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["vue-toastification/dist/index.css"],
  app: {
    head: {
      title: "Xomie's Manager - Ticket Solutions",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
