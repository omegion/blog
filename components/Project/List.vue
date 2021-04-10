<template>
  <section class="container section is-small">
    <div
      v-masonry
      item-selector=".item"
      transition-duration="0s"
      class="columns is-multiline project-list"
    >
      <div
        v-for="(project, index) in projects"
        :key="index"
        v-masonry-tile
        class="column is-3 item"
        data-aos="fade-up"
        :data-aos-delay="100 * index"
      >
        <item :project="project"></item>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Item from "~/components/Project/Item.vue";

export default defineComponent({
  name: "List",
  components: { Item },
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  setup() {},
});
</script>
