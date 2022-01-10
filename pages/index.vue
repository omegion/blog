<template>
  <section>
    <category-list class="is-hidden-mobile" />
    <list v-if="articles" :articles="articles" />
    <div class="section has-text-centered">
      <b-button @click="loadMore">Load More</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from "@nuxtjs/composition-api";
import List from "~/components/List/List.vue";
import CategoryList from "~/components/Category/List.vue";

const PER_PAGE = 20;

export default defineComponent({
  name: "Index",
  components: { CategoryList, List },
  setup() {
    // @ts-ignore
    const { $config } = useContext();

    useMeta({
      title: `${$config.titlePostfix}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${$config.titlePostfix}`,
        },
        { name: "twitter:site", content: "@omegion" },
        { name: "twitter:creator", content: "@omegion" },
        {
          property: "og:site_name",
          content: $config.titlePostfix,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: $config.baseUrl },
        { property: "og:locale", content: "en_US" },
        { property: "og:description", content: `${$config.titlePostfix}` },
      ],
    });
  },
  async asyncData({ $config, $content, query, error }) {
    const w = {};
    const q = $content("articles").limit(PER_PAGE).sortBy("createdAt", "desc");

    if ($config.isProduction) {
      Object.assign(w, { isPublished: true });
    }

    Object.assign(w, { category: query.category });

    // @ts-ignore
    const resp = await q
      .where(w)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      articles: resp,
    };
  },
  data() {
    return {
      currentPage: 1,
      articles: [],
    };
  },
  head: {
    title: "Blog | Omegion",
  },
  watchQuery: ["category"],
  methods: {
    loadMore() {
      this.currentPage = this.currentPage + 1;
    },
  },
});
</script>
