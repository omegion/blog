<template>
  <section class="hero is-primary-light">
    <div class="hero-body">
      <div class="container section is-small">
        <h1 class="title is-size-3 has-text-black pb-2">Browse Categories</h1>
        <div class="category-list columns">
          <category-item
            v-for="(category, index) in categories"
            :key="index"
            :item="category"
            class="column is-3"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from "@nuxtjs/composition-api";
import CategoryItem from "~/components/Category/Item.vue";

export default defineComponent({
  name: "CategoryList",
  components: { CategoryItem },
  setup() {
    const { $content, error } = useContext();
    const categories = ref([]);

    const { fetch } = useFetch(async () => {
      // @ts-ignore
      categories.value = await $content("categories")
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: "Page not found" });
        });
    });

    fetch();

    return { categories };
  },
});
</script>
