<template>
  <section class="container section is-small">
    <h1 class="title is-size-3 has-text-black pb-3">
      Latest
      <b-button v-if="hasFilter" class="ml-3" @click="clearRouteQuery"
        >Show All
      </b-button>
    </h1>
    <portal to="hero">
      <section class="hero is-primary-dark">
        <div class="hero-head">
          <navbar />
        </div>
      </section>
    </portal>
    <div
      v-masonry
      item-selector=".item"
      class="columns is-multiline article-list"
    >
      <div
        v-for="(article, index) in articles"
        :key="index"
        v-masonry-tile
        class="column is-4 item"
      >
        <item :article="article" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useRouter,
} from "@nuxtjs/composition-api";
import Item from "~/components/List/Item.vue";

export default defineComponent({
  name: "List",
  components: { Item },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const hasFilter = computed(() => route.value.query.category);

    const clearRouteQuery = () => {
      router.replace({ query: {} });
    };

    return { hasFilter, clearRouteQuery };
  },
});
</script>
