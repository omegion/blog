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
  useRoute,
  watch,
} from "@nuxtjs/composition-api";
import List from "~/components/List/List.vue";
import CategoryList from "~/components/Category/List.vue";

const PER_PAGE = 10;

export default defineComponent({
  name: "Index",
  components: { CategoryList, List },
  setup() {
    const { $content } = useContext();
    const route = useRoute();

    const articles = ref(null);
    const perPage = ref(PER_PAGE);
    const currentPage = ref(1);

    const categorySlug = computed(() => route.value.query.category);

    const { fetch } = useFetch(async () => {
      const q = $content("articles").limit(currentPage.value * perPage.value);

      if (categorySlug.value) {
        q.where({
          category: categorySlug.value,
        });
      }

      // @ts-ignore
      articles.value = await q.fetch();
    });

    const loadMore = () => {
      currentPage.value = currentPage.value + 1;
      fetch();
    };

    fetch();

    watch(route, () => {
      fetch();
    });

    return { articles, perPage, loadMore };
  },
});
</script>
