<template>
  <div class="columns">
    <Article
      v-if="!fetchState.pending"
      :article="article"
      class="column is-8"
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
  head: {},
  setup() {
    const route = useRoute();
    const { $content, error } = useContext();
    const article = ref(null);

    const { fetch, fetchState } = useFetch(async () => {
      // @ts-ignore
      article.value = await $content("articles", route.value.params.slug)
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: "Page not found" });
        });
    });

    fetch();

    return { article, fetchState };
  },
});
</script>
