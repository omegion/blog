<template>
  <div class="media">
    <div class="media-left mr-2">
      <figure v-lazy-container="{ selector: 'img' }" class="image is-48x48">
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
        <span class="has-text-weight-normal is-opacity-6">by</span>
        {{ author.name }}
      </p>
      <p class="title is-opacity-6 is-size-7">
        {{ createdAt | formatDate }} &bull;
        <span>{{ readingTimeHumanized }} read</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
} from "@nuxtjs/composition-api";
import moment from "moment";

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
    readingTime: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { $content, error } = useContext();
    const author = ref("");
    const avatar = ref("");
    const avatarSmall = ref("");

    const readingTimeHumanized = computed(() => {
      const duration = moment.duration(props.readingTime);
      return duration.humanize();
    });

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

    return { author, fetchState, avatar, avatarSmall, readingTimeHumanized };
  },
});
</script>
