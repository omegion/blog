<template>
  <div class="">
    <span v-for="(tag, index) in tags" :key="index" class="">
      <b-tag class="mr-2">
        <span class="is-capitalized">
          {{ tag }}
        </span>
      </b-tag>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Tags",
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  setup() {},
});
</script>
