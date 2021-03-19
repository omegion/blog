<template>
  <div class="card is-horizontal has-background">
    <div class="card-image">
      <nuxt-link tag="a" :to="{ name: 'slug', params: { slug: article.slug } }">
        <figure v-lazy-container="{ selector: 'img' }" class="image is-4by3">
          <img
            :alt="article.title"
            :data-src="thumbnail"
            :data-loading="thumbnailSmall"
          />
        </figure>
      </nuxt-link>
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="has-text-weight-semibold">
                <nuxt-link
                  tag="a"
                  :to="{ name: 'index', query: { category: article.category } }"
                  class="is-size-7 has-text-hover-primary-dark is-capitalized"
                >
                  {{ article.category }}
                </nuxt-link>
                <span class="ml-3 is-opacity-6 is-size-7"
                  >{{ article.createdAt | formatDateMonthYear }}
                </span>
              </p>
            </div>
          </div>
        </nav>
        <nuxt-link
          tag="a"
          :to="{ name: 'slug', params: { slug: article.slug } }"
          class="title is-4"
        >
          {{ article.title }}
        </nuxt-link>
        <p v-if="!article.isPublished" class="pt-4">
          <b-tag type="is-danger" class="has-text-weight-semibold">Draft</b-tag>
        </p>
        <p class="pt-4">
          {{ article.description }}
        </p>
        <br />
        <Author :slug="article.author" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";
import Author from "~/components/List/Author.vue";

export default defineComponent({
  name: "ListLargeItem",
  components: { Author },
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
