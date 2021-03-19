<template>
  <div class="card repository-details">
    <div class="card-content">
      <item-placeholder v-if="fetchState.pending" />
      <item v-else :repository="repository" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useRoute,
  watch,
} from "@nuxtjs/composition-api";

import Item from "~/components/Repository/Item.vue";
import ItemPlaceholder from "~/components/Repository/ItemPlaceholder.vue";

export default defineComponent({
  name: "Index",
  components: { ItemPlaceholder, Item },
  setup() {
    const route = useRoute();
    const { error, $axios } = useContext();

    const repository = ref(null);

    const { fetch, fetchState } = useFetch(async () => {
      await $axios
        .$get(`/api/repositories?repo=${route.value.params.slug}`)
        .then((data) => {
          repository.value = data;
        })
        .catch(() => {
          error({ statusCode: 500, message: "Could not fetch repositories." });
        });
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
