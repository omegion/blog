<template>
  <nav
    class="breadcrumb is-white is-small has-arrow-separator"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <nuxt-link
          tag="a"
          :to="{ name: 'index' }"
          class="has-text-weight-semibold is-size-7"
        >
          Blog
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          tag="a"
          :to="{ name: 'index', query: { category: article.category } }"
          class="has-text-weight-semibold is-size-7 is-capitalized"
        >
          {{ article.category }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Breadcrumb",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup() {},
});
</script>
