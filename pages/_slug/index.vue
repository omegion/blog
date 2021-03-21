<template>
  <div class="columns">
    <article-placeholder
      v-if="fetchState.pending"
      class="container section column is-6"
    />
    <Article
      v-else-if="article"
      :article="article"
      class="container section column is-6"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useRoute,
} from "@nuxtjs/composition-api";
import Article from "~/components/Article/Article.vue";
import ArticlePlaceholder from "~/components/Article/ArticlePlaceholder.vue";

export default defineComponent({
  name: "Index",
  components: { Article, ArticlePlaceholder },
  setup() {
    const route = useRoute();
    const { $content, $config, error } = useContext();
    const article = ref(null);

    const { fetch, fetchState } = useFetch(async () => {
      const w = {};

      if ($config.isProduction) {
        Object.assign(w, { isPublished: true });
      }

      // @ts-ignore
      article.value = await $content("articles", route.value.params.slug)
        .where(w)
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: "Page not found" });
        });
    });

    fetch();

    return { article, fetchState };
  },
  head: {},
});
</script>
