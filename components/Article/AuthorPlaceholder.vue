<template>
  <div class="media">
    <div class="media-left mr-2">
      <figure class="image is-48x48">
        <b-skeleton circle width="48px" height="48px"></b-skeleton>
      </figure>
    </div>
    <div class="media-content mt-1">
      <p class="title is-size-6 mb-2">
        <b-skeleton width="7em" />
      </p>
      <p class="title is-opacity-6 is-size-7">
        <b-skeleton width="5em" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "AuthorPlaceholder",
  props: {},
  setup() {},
});
</script>
