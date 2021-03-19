<template>
  <section>
    <portal to="hero">
      <section class="hero is-primary-dark is-overflow-hidden">
        <div class="hero-head">
          <navbar shadow />
          <div class="container">
            <div class="section py-5">
              <breadcrumbs :items="breadcrumbs" type="is-white" />
            </div>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="section pt-0">
              <p class="title is-size-1">Open Source Projects</p>
              <p class="subtitle pt-4">
                I like to use open source projects for most of our projects
                <br />
                and love to contribute to the open source community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </portal>
    <section class="container section is-small pl-0">
      <div class="columns">
        <div class="column is-8">
          <list-placeholder v-if="fetchState.pending" />
          <list v-else :repositories="repositories" />
        </div>
        <div class="column is-4 pl-0">
          <NuxtChild />
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
  useRouter,
} from "@nuxtjs/composition-api";
import Navbar from "~/components/Navbar.vue";
import List from "~/components/Repository/List.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import Divider from "~/components/Divider.vue";
import ListPlaceholder from "~/components/Repository/ListPlaceholder.vue";

export default defineComponent({
  name: "Index",
  components: { ListPlaceholder, Navbar, List, Breadcrumbs, Divider },
  head: {
    title: "Blog | Omegion",
  },
  setup() {
    const { $config, error, $axios } = useContext();
    const router = useRouter();

    const repositories = ref(null);
    const breadcrumbs = ref([
      {
        route: { name: "index" },
        name: "Blog",
      },
      {
        route: {},
        name: "Open Source",
      },
    ]);

    const { fetch, fetchState } = useFetch(async () => {
      await $axios
        .$get("/api/repositories")
        .then((data) => {
          repositories.value = data;
          router.push({
            name: "repositories-slug",
            params: { slug: data[0].name },
          });
        })
        .catch(() => {
          error({ statusCode: 500, message: "Could not fetch repositories." });
        });
    });

    useMeta({
      title: `Open Source Projects - ${$config.titlePostfix}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${$config.titlePostfix}`,
        },
        { name: "twitter:site", content: "@omegion" },
        { name: "twitter:creator", content: "@omegion" },
        {
          property: "og:site_name",
          content: $config.titlePostfix,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: $config.baseUrl },
        { property: "og:locale", content: "en_US" },
        { property: "og:description", content: `${$config.titlePostfix}` },
      ],
    });

    fetch();

    return { repositories, breadcrumbs, fetchState };
  },
});
</script>
