<template>
  <div class="">
    <p class="title is-size-4">
      <a
        :href="repository.url"
        class="has-text-hover-primary-dark"
        target="_blank"
        >{{ repository.name }}</a
      >
    </p>
    <p class="">{{ repository.description }}</p>
    <div class="pt-3">
      <table class="table">
        <tbody>
          <tr v-if="repository.languages.nodes.length > 0">
            <td class="has-text-weight-semibold">Languages</td>
            <td>
              <b-tag
                v-for="(language, index) in repository.languages.nodes"
                :key="index"
                class="mr-1"
                >{{ language.name }}
              </b-tag>
            </td>
          </tr>
          <tr v-if="repository.repositoryTopics.nodes.length > 0">
            <td class="has-text-weight-semibold">Topics</td>
            <td>
              <b-tag
                v-for="(topic, index) in repository.repositoryTopics.nodes"
                :key="index"
                class="mr-1"
                >{{ topic.topic.name }}
              </b-tag>
            </td>
          </tr>
          <tr v-if="repository.latestRelease">
            <td class="has-text-weight-semibold">Latest Release</td>
            <td>
              <a :href="repository.latestRelease.url" target="_blank">{{
                repository.latestRelease.tagName
              }}</a>
            </td>
          </tr>
          <tr>
            <td class="has-text-weight-semibold">Created at</td>
            <td>{{ repository.createdAt | formatDateMonthYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Item",
  components: {},
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
