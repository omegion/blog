<template>
  <section class="hero is-primary-light">
    <div class="hero-body">
      <div class="container section is-small">
        <h1 class="title is-size-3 has-text-black pb-2">Browse Categories</h1>
        <b-carousel-list
          v-model="currentCarousel"
          :data="categories"
          :items-to-show="4"
          :has-opacity="false"
          :arrow-hover="false"
          icon-size="is-medium"
          class="category-list columns"
        >
          <template #item="category">
            <category-item :item="category" class="column" />
          </template>
        </b-carousel-list>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useContext, useFetch } from "@nuxtjs/composition-api";
import CategoryItem from "~/components/Category/Item.vue";

export default defineComponent({
  name: "CategoryList",
  components: { CategoryItem },
  setup() {
    // @ts-ignore
    const { $content } = useContext();
    const currentCarousel = ref(0);
    const categories = ref([]);

    const { fetch } = useFetch(async () => {
      // @ts-ignore
      categories.value = await $content("categories")
        .sortBy("order", "asc")
        .fetch();
    });

    fetch();

    return { categories, currentCarousel };
  },
});
</script>
