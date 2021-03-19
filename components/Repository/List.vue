<template>
  <b-table
    :data="repositories"
    :selected.sync="selected"
    :mobile-cards="false"
    class="repository-list"
  >
    <b-table-column field="name" label="Name" v-slot="props">
      <nuxt-link
        tag="div"
        class="card"
        :to="{ name: 'repositories-slug', params: { slug: props.row.name } }"
      >
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-size-6 mb-2">
                {{ props.row.name }}
              </p>
              <p class="is-size-7 mb-2">
                {{ props.row.description }}
              </p>
              <nav class="level is-opacity-7 pb-0">
                <div class="level-left">
                  <div class="level-item">
                    <p class="is-size-7 is-flex">
                      <span class="has-text-weight-medium">{{
                        props.row.stargazerCount
                      }}</span>
                      <span><b-icon icon="star" size="is-small"></b-icon></span>
                    </p>
                  </div>
                  <div class="level-item">
                    <p class="is-size-7 is-flex">
                      <span class="has-text-weight-medium">{{
                        props.row.forkCount
                      }}</span>
                      <span
                        ><b-icon icon="source-fork" size="is-small"></b-icon
                      ></span>
                    </p>
                  </div>
                  <div v-if="props.row.latestRelease" class="level-item">
                    <p class="is-size-7 is-flex">
                      <span class="has-text-weight-medium">{{
                        props.row.latestRelease.tagName
                      }}</span>
                      <span><b-icon icon="tag" size="is-small"></b-icon></span>
                    </p>
                  </div>
                  <div class="level-item">
                    <p
                      class="is-size-7 has-text-weight-semibold"
                      :style="{
                        color: getFirstLanguageColor(props.row.languages.nodes),
                      }"
                    >
                      {{ getFirstLanguageName(props.row.languages.nodes) }}
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nuxt-link>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "List",
  components: {},
  props: {
    repositories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const selected = ref(null);

    const getFirstLanguageName = (languages: any) => {
      if (languages.length) {
        return languages[0].name;
      }
      return "";
    };
    const getFirstLanguageColor = (languages: any) => {
      if (languages.length) {
        return languages[0].color;
      }
      return "";
    };

    return { getFirstLanguageName, getFirstLanguageColor, selected };
  },
});
</script>
