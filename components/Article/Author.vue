<template>
  <div class="media">
    <div class="media-left mr-2">
      <figure class="image is-48x48" v-lazy-container="{ selector: 'img' }">
        <img
          class="is-rounded"
          :alt="author.name"
          :data-src="avatar"
          :data-loading="avatarSmall"
        />
      </figure>
    </div>
    <div class="media-content mt-1">
      <p class="title is-size-6 mb-2">
        <span class="has-text-weight-normal has-text-grey-light">by</span>
        {{ author.name }}
      </p>
      <p class="title has-text-grey-light is-size-7">
        {{ createdAt | formatDate }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Author",
  props: {
    slug: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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
