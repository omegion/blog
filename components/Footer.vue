<template>
  <footer class="footer has-background-primary-dark has-text-white is-size-8">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <span class="has-text-white has-text-weight-bold is-size-3"
            >Omegion Blog</span
          >
          <div class="pt-3 has-text-white-ter has-text-justified">
            <div class="media">
              <div class="media-content has-text-weight-medium">
                It's a personal blog that I write for my interests.
              </div>
            </div>
          </div>
        </div>
        <div class="column"></div>
        <div class="column is-2">
          <h2 class="title is-size-5 has-text-white">Navigate</h2>
          <p class="pb-2">
            <a href="/" class="has-text-grey-light has-text-hover-white"
              >Blog</a
            >
          </p>
          <p class="pb-2">
            <nuxt-link
              tag="a"
              :to="{ name: 'projects' }"
              class="has-text-grey-light has-text-hover-white"
              >Projects
            </nuxt-link>
          </p>
          <p class="pb-2">
            <nuxt-link
              tag="a"
              :to="{ name: 'repositories' }"
              class="has-text-grey-light has-text-hover-white"
              >Open Source
            </nuxt-link>
          </p>
          <p class="pb-2">
            <a
              href="https://github.com/omegion"
              class="has-text-grey-light has-text-hover-white"
              target="_blank"
              >GitHub</a
            >
          </p>
        </div>
      </div>
      <div class="columns pt-3">
        <div class="column"></div>
        <div class="column is-10">
          <p class="has-text-centered is-size-7 is-opacity-4">
            © Omegion {{ dateYear }}. All rights reserved. {{ appVersion }}
            <br />
            <br />
            When you visit or interact with our sites, services or tools, we or
            our authorised service providers may use cookies for storing
            information to help provide you with a better, faster and safer
            experience and for marketing purposes.
          </p>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api";
// @ts-ignore
import moment from "moment";

export default defineComponent({
  name: "Footer",
  setup() {
    const { $config } = useContext();

    const dateYear = computed(() => moment().year());
    const appVersion = computed(() => $config.appVersion);

    return { dateYear, appVersion };
  },
});
</script>
