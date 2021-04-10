<template>
  <a :href="article.description" target="_blank">
    <div class="card has-background has-background-primary">
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="has-text-weight-semibold">
                <nuxt-link
                  tag="a"
                  :to="{ name: 'index', query: { category: article.category } }"
                  class="is-size-7 has-text-white has-text-hover-grey is-capitalized"
                >
                  {{ article.category }}
                </nuxt-link>
                <span class="ml-3 has-text-white is-opacity-6 is-size-7"
                  >{{ article.createdAt | formatDateMonthYear }}
                </span>
              </p>
            </div>
          </div>
        </nav>
        <p class="title is-size-3 has-text-white">
          {{ article.title }}
        </p>
        <p v-if="!article.isPublished" class="pt-4">
          <b-tag type="is-danger" class="has-text-weight-semibold">Draft</b-tag>
        </p>
        <p class="pt-4 has-text-white is-opacity-6 is-ellipsis">
          {{ article.description }}
        </p>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ListLinkItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const thumbnail = computed(() =>
      require("@/static/public/img/" + props.article.thumbnail)
    );

    const thumbnailSmall = computed(() =>
      require(`@/static/public/img/${props.article.thumbnail}?lqip`)
    );

    return { thumbnail, thumbnailSmall };
  },
});
</script>
