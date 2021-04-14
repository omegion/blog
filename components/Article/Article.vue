<template>
  <section class="pt-2">
    <portal to="hero">
      <section class="hero is-primary-dark">
        <div
          v-lazy-container="{ selector: 'img' }"
          class="hero-background-image overlay"
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
        <div class="hero-body px-0 columns">
          <div class="container section column is-6">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <breadcrumb :items="breadcrumbs" :disable-last-item="false" />
                </div>
              </div>
            </nav>
            <p class="title is-size-2 has-text-justified">
              {{ article.title }}
            </p>
            <author :slug="article.author">
              {{ article.createdAt | formatDate }} &bull;
              <span>{{ article.readingTime | readingTimeHumanize }} read</span>
              &bull;
              <span>
                {{ pageViewCount }}
                <b-icon icon="eye" size="is-small"></b-icon>
              </span>
            </author>
          </div>
        </div>
      </section>
    </portal>
    <div class="article-body pt-6 content has-text-justified">
      <nuxt-content :document="article" />
    </div>
    <tags v-if="article.tags" :tags="article.tags" class="pt-3 pb-6" />
  </section>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "@vue/composition-api";
import { defineComponent, useContext, useMeta } from "@nuxtjs/composition-api";

import Vue from "vue";
import { CounterAPI } from "counterapi";

import Navbar from "~/components/Navbar.vue";
import Breadcrumb from "~/components/Breadcrumbs.vue";
import Author from "~/components/Article/Author.vue";
import Tags from "~/components/Article/Tags.vue";
import CopyButton from "~/components/Article/CopyButton.vue";

export default defineComponent({
  name: "Article",
  components: { Tags, Navbar, Author, Breadcrumb },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { $config } = useContext();

    const pageViewCount = ref(0);

    const breadcrumbs = ref([
      {
        route: { name: "index" },
        name: "Blog",
      },
      {
        route: { name: "index", query: { category: props.article.category } },
        name: props.article.category,
      },
    ]);
    const thumbnail = computed(() =>
      require(`@/static/public/img/${props.article.thumbnail}`)
    );
    const thumbnailSmall = computed(() =>
      require(`@/static/public/img/${props.article.thumbnail}?lqip`)
    );

    const increasePageView = (pageName: string) => {
      if (process.client) {
        const counterAPI = new CounterAPI();
        counterAPI.get(pageName, true).then((counter) => {
          pageViewCount.value = counter.Count;
        });
      }
    };

    onMounted(() => {
      const blocks = document.getElementsByClassName("nuxt-content-highlight");

      // @ts-ignore
      for (const block of blocks) {
        // @ts-ignore
        const CopyButtonComponent = Vue.extend(CopyButton);
        const component = new CopyButtonComponent().$mount();
        block.appendChild(component.$el);
      }

      increasePageView(props.article.title);
    });

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

    return {
      thumbnail,
      thumbnailSmall,
      breadcrumbs,
      pageViewCount,
    };
  },
  head: {},
});
</script>
