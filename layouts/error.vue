<template>
  <div class="container">
    <portal to="hero">
      <section class="hero is-primary-dark">
        <div class="hero-head">
          <navbar />
        </div>
      </section>
    </portal>
    <section class="section is-large">
      <h1 v-if="error.statusCode === 404" class="title">Page not found</h1>
      <h1 v-else>An error occurred. {{ error.message }}</h1>
      <b-button
        tag="nuxt-link"
        to="/"
        type="is-secondary"
        icon-left="arrow-left"
        class="mt-4"
        >Home page
      </b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Navbar from "~/components/Navbar.vue";

export default defineComponent({
  components: { Navbar },
  // eslint-disable-next-line vue/require-prop-types
  props: ["error"],
});
</script>
