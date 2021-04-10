<template>
  <section>
    <portal to="hero">
      <section class="hero is-primary-light">
        <div class="hero-head">
          <navbar type="is-primary-light" shadow />
          <div class="container">
            <div class="section py-5">
              <breadcrumbs :items="breadcrumbs" type="is-primary" />
            </div>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="section">
              <div class="columns">
                <div class="column is-6">
                  <p class="title is-size-1 has-text-black">Projects</p>
                  <p class="subtitle pt-4">
                    List of public projects that I started.Some of them is not
                    maintained at the moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </portal>
    <section class="container section is-small pl-0">
      <div class="columns">
        <div class="column is-12">
          <List v-if="projects" :projects="projects" />
        </div>
      </div>
    </section>
    <NuxtChild />
  </section>
</template>

<script lang="ts">
import { ref } from "@vue/composition-api";
import {
  defineComponent,
  useContext,
  useFetch,
  useMeta,
} from "@nuxtjs/composition-api";
import Navbar from "~/components/Navbar.vue";
import List from "~/components/Project/List.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";

const PER_PAGE = 10;

export default defineComponent({
  name: "Index",
  components: { Navbar, List, Breadcrumbs },
  setup() {
    const projects = ref(null);
    const perPage = ref(PER_PAGE);
    const currentPage = ref(1);

    // @ts-ignore
    const { $config, $content, error } = useContext();

    const repositories = ref(null);
    const breadcrumbs = ref([
      {
        route: { name: "index" },
        name: "Blog",
      },
      {
        route: {},
        name: "Projects",
      },
    ]);

    const { fetch } = useFetch(async () => {
      const w = {};
      const q = $content("projects")
        .limit(currentPage.value * perPage.value)
        .sortBy("isMaintained", "desc")
        .sortBy("createdAt", "desc");

      // @ts-ignore
      projects.value = await q
        .where(w)
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: "Page not found" });
        });
    });

    useMeta({
      title: `Projects - ${$config.titlePostfix}`,
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

    return { repositories, breadcrumbs, projects };
  },
  head: {
    title: "Blog | Omegion",
  },
});
</script>
