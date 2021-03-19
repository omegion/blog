<template>
  <section class="container section pt-2">
    <portal to="hero">
      <section class="hero is-primary-dark is-medium">
        <div
          class="hero-background-image overlay"
          v-lazy-container="{ selector: 'img' }"
        >
          <img
            :alt="article.title"
            :src="thumbnail"
            :data-src="thumbnail"
            :data-loading="thumbnailSmall"
          />
        </div>
        <div class="hero-head">
          <navbar type="is-white" />
        </div>
        <div class="hero-body columns">
          <div class="container column is-9">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <breadcrumb :article="article" />
                </div>
              </div>
            </nav>
            <p class="title is-size-2">{{ article.title }}</p>
            <author :slug="article.author" :created-at="article.createdAt" />
          </div>
        </div>
      </section>
    </portal>
    <div class="article-body pt-6 content has-text-justified">
      <nuxt-content :document="article" />
    </div>
    <tags v-if="article.tags" :tags="article.tags" class="pt-3" />
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useMeta,
} from "@nuxtjs/composition-api";
import Navbar from "~/components/Navbar.vue";
import Breadcrumb from "~/components/Article/Breadcrumbs.vue";
import Author from "~/components/Article/Author.vue";
import Tags from "~/components/Article/Tags.vue";

export default defineComponent({
  name: "Article",
  components: { Tags, Navbar, Author, Breadcrumb },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  head: {},
  setup(props) {
    const { $config } = useContext();

    const thumbnail = computed(() =>
      require(`@/static/public/img/${props.article.thumbnail}`)
    );
    const thumbnailSmall = computed(() =>
      require(`@/static/public/img/${props.article.thumbnail}?lqip`)
    );

    useMeta({
      title: `${props.article.title} - ${$config.titlePostfix}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: props.article.description,
        },
        { name: "keywords", content: props.article.tags.join(",") },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: `${props.article.title} - ${$config.titlePostfix}`,
        },
        { name: "twitter:site", content: "@omegion" },
        { name: "twitter:creator", content: "@omegion" },
        {
          name: "twitter:image",
          content: props.article.thumbnail,
        },
        {
          property: "og:title",
          content: `${props.article.title} - ${$config.titlePostfix}`,
        },
        {
          property: "og:site_name",
          content: $config.titlePostfix,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: $config.baseUrl },
        { property: "og:locale", content: "en_US" },
        {
          property: "og:image",
          content: `${$config.baseUrl}${thumbnail.value}`,
        },
        { property: "og:description", content: props.article.description },
      ],
    });

    return { thumbnail, thumbnailSmall };
  },
});
</script>
