<template>
  <section>
    <category-list />
    <div v-if="articles">
      <list :articles="articles" />
    </div>
    <div class="section has-text-centered">
      <b-button @click="loadMore">Load More</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  watch,
} from "@nuxtjs/composition-api";
import List from "~/components/List/List.vue";
import CategoryList from "~/components/Category/List.vue";

const PER_PAGE = 10;

export default defineComponent({
  name: "Index",
  components: { CategoryList, List },
  head: {
    title: "Blog | Omegion",
  },
  setup() {
    const { $content, $config, error } = useContext();
    const route = useRoute();

    const articles = ref(null);
    const perPage = ref(PER_PAGE);
    const currentPage = ref(1);

    const categorySlug = computed(() => route.value.query.category);

    const { fetch } = useFetch(async () => {
      const q = $content("articles")
        .limit(currentPage.value * perPage.value)
        .sortBy("createdAt", "desc");

      if (categorySlug.value) {
        q.where({
          category: categorySlug.value,
        });
      }

      // @ts-ignore
      articles.value = await q.fetch().catch(() => {
        error({ statusCode: 404, message: "Page not found" });
      });
    });

    const loadMore = () => {
      currentPage.value = currentPage.value + 1;
      fetch();
    };

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

    fetch();

    watch(route, () => {
      fetch();
    });

    return { articles, perPage, loadMore };
  },
});
</script>
