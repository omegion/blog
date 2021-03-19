<template>
  <figure class="is-absolute is-right-0 is-bottom-0 is-left-0 z-index-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="96px"
      viewBox="0 0 100 100"
      version="1.1"
      preserveAspectRatio="none"
    >
      <path
        fill="#fff"
        d="M0,0 C40,33 66,52 75,52 C83,52 92,33 100,0 L100,100 L0,100 L0,0 Z"
      ></path>
    </svg>
  </figure>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Divider",
  props: {
    type: {
      type: String,
      default: "is-white",
    },
  },
  setup() {},
});
</script>
