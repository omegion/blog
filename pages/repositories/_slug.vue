<template>
  <div class="card repository-details">
    <div class="card-content">
      <item-placeholder v-if="fetchState.pending" />
      <item v-else-if="repository" :repository="repository" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import {
  useContext,
  useFetch,
  useMeta,
  useRoute,
} from "@nuxtjs/composition-api";

import Item from "~/components/Repository/Item.vue";
import ItemPlaceholder from "~/components/Repository/ItemPlaceholder.vue";

export default defineComponent({
  name: "Index",
  components: { ItemPlaceholder, Item },
  setup() {
    const route = useRoute();
    const { $config } = useContext();

    const repository = ref(null);

    const { fetch, fetchState } = useFetch(async () => {
      // await $axios
      //   .$get(
      //     `/api/repositories?repo=${route.value.params.slug}&owner=${route.value.query.owner}`
      //   )
      //   .then((data) => {
      //     repository.value = data;
      //   })
      //   .catch(() => {
      //     error({ statusCode: 500, message: "Could not fetch repositories." });
      //   });
    });

    useMeta(() => {
      let title = `Open Source Projects - ${$config.titlePostfix}` as string;
      let description = `Open Source Projects - ${$config.titlePostfix}` as string;
      if (repository.value !== null) {
        // @ts-ignore
        title = `${repository.value.name} - ${$config.titlePostfix}`;
        // @ts-ignore
        description = repository.value.description;
      }
      return {
        title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: description,
          },
          { property: "og:description", content: description },
        ],
      };
    });

    useMeta({
      meta: [
        { name: "twitter:site", content: "@omegion" },
        { name: "twitter:creator", content: "@omegion" },
        {
          property: "og:site_name",
          content: $config.titlePostfix,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: $config.baseUrl },
        { property: "og:locale", content: "en_US" },
      ],
    });

    fetch();

    watch(route, () => {
      fetch();
    });

    return { repository, fetchState };
  },
  head: {},
});
</script>
