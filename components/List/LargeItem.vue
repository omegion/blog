<template>
  <div class="columns">
    <div class="column is-8">
      <div
        class="large-post"
        v-lazy:background-image="{
          src: require('@/static/public/img/' + article.thumbnail),
          loading: require('@/static/public/img/' +
            article.thumbnail +
            '?lqip'),
        }"
      ></div>
    </div>
    <div class="column is-4">
      <div class="article is-large is-py-4 is-shadowless">
        <div class="article-header">
          <nuxt-link
            tag="a"
            :to="{ name: 'slug', params: { slug: article.slug } }"
            class="is-size-8 has-text-grey has-text-weight-bold is-uppercase"
            >{{ article.category }}
          </nuxt-link>
        </div>
        <div class="article-footer">
          <nuxt-link
            tag="a"
            :to="{ name: 'slug', params: { slug: article.slug } }"
          >
            <h3 class="title is-size-3 has-text-weight-bold">
              {{ article.title }}
            </h3>
            <p class="is-mb-3">
              {{ article.description }}
            </p>
            <span class="has-text-info has-text-weight-semibold"
              >Read more
              <b-icon icon="angle-right" pack="fas" size="is-small"></b-icon
            ></span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "ListItemLarge",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const wrapperStyle = computed(() => {
      return {
        backgroundImage:
          "url(" +
          require("@/static/public/img/" + props.article.thumbnail) +
          ")",
      };
    });

    return { wrapperStyle };
  },
});
</script>
