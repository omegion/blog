<template>
  <section>
    <nuxt-link
      tag="div"
      :to="{ name: 'index', query: { category: item.slug } }"
      :class="[
        'card category-item notification',
        item.type,
        { 'is-active': isActive() },
      ]"
    >
      <div class="card-content p-2">
        <div class="media">
          <div class="media-content">
            <b-icon :icon="item.icon" size="is-medium"></b-icon>
          </div>
        </div>
        <div class="media pt-5">
          <div class="media-content">
            <p class="is-size-5 has-text-weight-semibold">{{ item.name }}</p>
            <p class="is-size-6">{{ articleCount }} articles</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useContext, useFetch, useRoute } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "CategoryItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    // @ts-ignore
    const { $content, $config } = useContext();
    const articleCount = ref(0);

    const isActive = () => {
      return route.value.query.category === props.item.slug;
    };

    const { fetch } = useFetch(async () => {
      const w = { category: props.item.slug };

      if ($config.isProduction) {
        Object.assign(w, { isPublished: true });
      }

      // @ts-ignore
      const articles = await $content("articles")
        .where(w)
        .only(["slug"])
        .fetch();

      articleCount.value = articles.length;
    });

    fetch();

    return { isActive, articleCount };
  },
});
</script>
