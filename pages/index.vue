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
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  useRouter,
  watch,
} from "@nuxtjs/composition-api";
import List from "~/components/List/List.vue";
import CategoryList from "~/components/Category/List.vue";

const PER_PAGE = 10;

export default defineComponent({
  name: "Index",
  components: { CategoryList, List },
  setup() {
    const { $content, $config, error } = useContext();
    const route = useRoute();
    const router = useRouter();

    const articles = ref(null);
    const perPage = ref(PER_PAGE);
    const currentPage = ref(1);

    const categorySlug = computed(() => route.value.query.category);

    const { fetch } = useFetch(async () => {
      const w = {};
      const q = $content("articles")
        .limit(currentPage.value * perPage.value)
        .sortBy("createdAt", "desc");

      if ($config.isProduction) {
        Object.assign(w, { isPublished: true });
      }

      if (categorySlug.value) {
        Object.assign(w, { category: categorySlug.value });
      }

      // @ts-ignore
      articles.value = await q
        .where(w)
        .fetch()
        .catch(() => {
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
  head: {
    title: "Blog | Omegion",
  },
});
</script>
