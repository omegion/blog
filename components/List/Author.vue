<template>
  <div class="media">
    <div class="media-left mr-2">
      <figure v-lazy-container="{ selector: 'img' }" class="image is-32x32">
        <img
          class="is-rounded"
          :alt="author.name"
          :data-src="avatar"
          :data-loading="avatarSmall"
        />
      </figure>
    </div>
    <div class="media-content pt-1 mt-1">
      <p class="title is-size-7">
        <span class="is-opacity-6">by</span>
        {{ author.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useContext, useFetch } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Author",
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // @ts-ignore
    const { $content, error } = useContext();
    const author = ref("");
    const avatar = ref("");
    const avatarSmall = ref("");

    const { fetch, fetchState } = useFetch(async () => {
      // @ts-ignore
      author.value = await $content("authors", props.slug)
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: "Page not found" });
        });
      // @ts-ignore
      avatar.value = require(`@/static/public/img/${author.value.avatar}`);
      // @ts-ignore
      avatarSmall.value = require(`@/static/public/img/${author.value.avatar}?lqip`);
    });

    fetch();

    return { author, fetchState, avatar, avatarSmall };
  },
});
</script>
