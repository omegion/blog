import { Configuration } from "@nuxt/types";
import getRoutes from "./utils/getRoutes";

const VERSION = require("./package.json").version;

const config: Configuration = {
  ssr: false,
  target: "static",

  generate: {
    async routes() {
      const { $content } = require("@nuxt/content");
      const files = await $content({ deep: true }).only(["path"]).fetch();

      return files.map((file: any) =>
        file.path === "/index" ? "/" : file.path
      );
    },
  },

  head: {
    title: "Blog",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Personal blog where I write technology.",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/scss/app.scss", "@mdi/font/css/materialdesignicons.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { ssr: true, src: "@/plugins/buefy.ts" },
    { ssr: true, src: "@/plugins/filters.ts" },
    { ssr: true, src: "@/plugins/vue-lazyload.ts" },
    { ssr: true, src: "@/plugins/vue-masonry.ts" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/composition-api"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/markdownit",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "portal-vue/nuxt",
  ],

  hooks: {
    "content:file:beforeInsert": (document: {
      extension: string;
      text: any;
      readingTime: any;
    }) => {
      if (document.extension === ".md") {
        const { time } = require("reading-time")(document.text);

        document.readingTime = time;
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    typographer: true,
    html: true,
    use: [
      "markdown-it-highlightjs",
      "markdown-it-link-attributes",
      [
        "markdown-it-anchor",
        {
          level: 1,
          // slugify: string => string,
          permalink: true,
          // renderPermalink: (slug, opts, state, permalink) => {},
          permalinkClass: "header-anchor",
          permalinkSymbol: "¶",
        },
      ],
      "markdown-it-attrs",
      // "markdown-it-toc-done-right",
      // "markdown-it-emoji",
    ],
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    dashboardLoginUrl: process.env.DASHBOARD_LOGIN_URL,
    dashboardSignUpUrl: process.env.DASHBOARD_SIGNUP_URL,
    documentationUrl: process.env.DOCUMENTATION_URL,
    titlePostfix: process.env.TITLE_POSTFIX,
    appVersion: VERSION,
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    routes() {
      return getRoutes();
    },
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
    gzip: true,
    cacheTime: 1,
  },
};

export default config;
