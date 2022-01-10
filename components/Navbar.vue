<template>
  <b-navbar
    :type="type"
    :shadow="shadow"
    wrapper-class="container section py-0"
  >
    <template #brand>
      <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
        <p class="title is-size-2 logo">Om.</p>
      </b-navbar-item>
    </template>
    <template #start></template>

    <template #end>
      <b-navbar-item tag="nuxt-link" :to="{ name: 'index' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="{ name: 'projects' }">
        Projects
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="{ name: 'open-source' }">
        Open Source
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Navbar",
  props: {
    type: {
      type: String,
      default: "is-primary-dark",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
