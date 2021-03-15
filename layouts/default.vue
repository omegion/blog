<template>
  <div>
    <portal-target name="hero"></portal-target>
    <section class="">
      <Nuxt />
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Footer from "~/components/Footer.vue";

export default defineComponent({
  name: "Index",
  components: { Footer },
});
</script>
