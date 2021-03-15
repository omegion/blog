<template>
  <div class="columns">
    <Article v-if="article" :article="article" class="column is-8" />
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
    const { $content } = useContext();
    const article = ref(null);

    const { fetch } = useFetch(async () => {
      // @ts-ignore
      article.value = await $content(
        "articles",
        route.value.params.slug
      ).fetch();
    });

    fetch();

    return { article };
  },
});
</script>
