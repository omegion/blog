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
            <author
              :slug="article.author"
              :created-at="article.createdAt"
              :reading-time="article.readingTime"
            />
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
  onMounted,
  ref,
} from "@nuxtjs/composition-api";
import Vue from "vue";
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

    onMounted(() => {
      const blocks = document.getElementsByClassName("nuxt-content-highlight");

      // @ts-ignore
      for (const block of blocks) {
        // @ts-ignore
        const CopyButtonComponent = Vue.extend(CopyButton);
        const component = new CopyButtonComponent().$mount();
        block.appendChild(component.$el);
      }
    });

    return { thumbnail, thumbnailSmall, breadcrumbs };
  },
});
</script>
