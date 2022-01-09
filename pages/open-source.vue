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
          <li v-for="(repo, index) in repositories" :key="index">
            <span>{{ repo.name }}</span>
          </li>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { ref } from "@vue/composition-api";
import { defineComponent, useContext, useMeta } from "@nuxtjs/composition-api";
import Navbar from "~/components/Navbar.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import GithubApi from "~/services/github/api";
import Controller from "~/services/github/controller";

export default defineComponent({
  name: "Index",
  components: { Navbar, Breadcrumbs },
  setup() {
    const projects = ref(null);

    // @ts-ignore
    const { $config } = useContext();

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

    return { repositories, breadcrumbs, projects };
  },
  async asyncData(context) {
    const api = new GithubApi(context.env.githubToken);
    const controller = new Controller(api);

    return await controller
      .getRepositories()
      .then((data) => {
        return { repositories: data };
      })
      .catch((err) => {
        throw err;
      });
  },
  head: {
    title: "Blog | Omegion",
  },
});
</script>
