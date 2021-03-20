<template>
  <div class="columns">
    <Article
      v-if="!fetchState.pending && article"
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

export default defineComponent({
  name: "Index",
  components: { Article },
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
