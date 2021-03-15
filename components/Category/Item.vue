<template>
  <section>
    <nuxt-link
      tag="div"
      :to="{ name: 'index', query: { category: item.slug } }"
      :class="[
        'card category-item notification',
        item.type,
        { 'is-active': isActive },
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
            <p class="is-size-6">4 articles</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from "@nuxtjs/composition-api";

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

    const isActive = computed(() => {
      return route.value.query.category === props.item.slug;
    });

    return { isActive };
  },
});
</script>
