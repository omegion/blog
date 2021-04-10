<template>
  <section class="pt-2">
    <portal to="hero">
      <section class="hero is-primary-dark">
        <div class="hero-background-image overlay"></div>
        <div class="hero-head">
          <navbar type="is-white" />
        </div>
        <div class="hero-body px-0 columns">
          <div class="container section column is-6">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <b-skeleton height="2em" width="8em"></b-skeleton>
                </div>
              </div>
            </nav>
            <p class="title is-size-2">
              <b-skeleton height="1em" width="8em"></b-skeleton>
            </p>
            <author-placeholder />
          </div>
        </div>
      </section>
    </portal>
    <div class="article-body pt-6 content has-text-justified">
      <div class="nuxt-content">
        <b-skeleton v-for="index in 20" :key="index" width="100%"></b-skeleton>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Navbar from "~/components/Navbar.vue";
import AuthorPlaceholder from "~/components/Article/AuthorPlaceholder.vue";

export default defineComponent({
  name: "ArticlePlaceholder",
  components: { AuthorPlaceholder, Navbar },
  setup() {
    const breadcrumbs = ref([
      {
        route: { name: "index" },
        name: "Blog",
      },
    ]);

    return { breadcrumbs };
  },
});
</script>
