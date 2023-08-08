export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AMS",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["bootstrap-icons/font/bootstrap-icons.css", "@/static/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/auth.js",
    "~/plugins/vuex",
    "~/plugins/chart.js",
    { src: "~/plugins/bootstrap.js", mode: "client" },
    // Other plugins
    { src: "~/plugins/boxicons.js", ssr: false },
    { src: "~/plugins/select2.js", mode: "client" },
    { src: "~/plugins/jquery.js", mode: "client" },
    { src: "~/plugins/inactivity-logout.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/axios"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "cookie-universal-nuxt",
    "@nuxtjs/dotenv",
  ],

  axios: {
    baseURL: process.env.API_BASE_URL, // Adjust the URL accordingly
    credentials: true,
  },

  store: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["xlsx"],
  },
};
