<template>
  <div class="media">
    <div class="media-left mr-2">
      <figure class="image is-32x32">
        <img class="is-rounded" :src="avatar" :alt="author.name" />
      </figure>
    </div>
    <div class="media-content pt-1 mt-1">
      <p class="title is-size-7">
        <span class="has-text-grey">by</span>
        {{ author.name }}
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
  },
  setup(props) {
    const { $content } = useContext();
    const author = ref("");
    const avatar = ref("");

    const { fetch, fetchState } = useFetch(async () => {
      // @ts-ignore
      author.value = await $content("authors", props.slug)
        .fetch()
        .catch(() => {
          console.error({ statusCode: 404, message: "Post not found" });
        });
      // @ts-ignore
      avatar.value = require(`@/static/public/img/${author.value.avatar}`);
    });

    fetch();

    return { author, fetchState, avatar };
  },
});
</script>
