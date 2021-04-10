import { Configuration } from "@nuxt/types";
import getRoutes from "./utils/getRoutes";

const VERSION = require("./package.json").version;

const config: Configuration = {
  ssr: true,
  target: "server",

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
  css: [
    "~assets/scss/app.scss",
    "@mdi/font/css/materialdesignicons.min.css",
    "highlight.js/styles/vs2015.css",
    { src: "~assets/styl/vssue.styl", lang: "styl" },
  ],

  loading: {
    height: "0px",
  },

  router: {
    routeNameSplitter: ".",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { ssr: true, src: "@/plugins/buefy.ts" },
    { ssr: true, src: "@/plugins/filters.ts" },
    { ssr: true, src: "@/plugins/vue-lazyload.ts" },
    { ssr: false, src: "@/plugins/vssue.ts" },
    { ssr: false, src: "@/plugins/vue-masonry.ts" },
    { ssr: false, src: "@/plugins/vue-aos.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/eslint-module",
    "@nuxtjs/composition-api",
    "@nuxtjs/google-analytics",
    "@nuxtjs/style-resources",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/content",
    "portal-vue/nuxt",
  ],

  content: {
    liveEdit: true,
    // @ts-ignore
    editor: "~/components/Editor.vue",
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-dracula.css",
      },
      remarkPlugins: [
        "remark-squeeze-paragraphs",
        "remark-slug",
        [
          "remark-autolink-headings",
          {
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: ["mdi", "mdi-link-variant", "mdi-24px"],
              },
            },
          },
        ],
        "remark-external-links",
        "remark-footnotes",
      ],
      rehypePlugins: [
        "rehype-sort-attribute-values",
        "rehype-sort-attributes",
        "rehype-raw",
      ],
    },
  },

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

  serverMiddleware: ["./server-middleware/repositories"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: process.env.NODE_ENV === "production" ? "/public/" : "/_nuxt/",
    cssSourceMap: false,
    html: {
      minify: {
        minifyCSS: true,
        minifyJS: true,
      },
    },
  },

  axios: {
    browserBaseURL: "/",
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    titlePostfix: process.env.TITLE_POSTFIX,
    isProduction: process.env.NODE_ENV === "production",
    appVersion: VERSION,
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_ID,
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
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  eslint: {
    exclude: ["node_modules", "~assets/styl/vssue.styl"],
  },
};

export default config;
