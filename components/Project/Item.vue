<template>
  <a :href="project.url" target="_blank">
    <div
      :class="['card project-item notification', 'is-clickable', 'is-white']"
    >
      <div class="card-content p-2">
        <div class="media">
          <div class="media-content">
            <figure
              v-if="project.thumbnail"
              v-lazy-container="{ selector: 'img' }"
              class="image is-64x64"
            >
              <img
                :alt="project.title"
                :data-src="thumbnail"
                :data-loading="thumbnailSmall"
                class="is-rounded"
              />
            </figure>
            <b-icon
              v-else-if="project.icon"
              :icon="project.icon"
              size="is-medium is-circled"
            ></b-icon>
            <b-icon v-else icon="github" size="is-medium"></b-icon>
          </div>
        </div>
        <div class="media pt-5">
          <div class="media-content">
            <p class="mb-2">
              <span
                class="is-size-7 has-text-primary has-text-weight-semibold is-capitalized"
              >
                {{ project.category }}
              </span>
              <span
                class="is-size-7 has-text-primary has-text-weight-semibold is-capitalized"
              >
              </span>
            </p>
            <p class="is-size-4 has-text-weight-semibold">{{ project.name }}</p>
            <p v-if="!project.isMaintained">
              <span>
                <span
                  class="is-size-7 has-text-secondary has-text-weight-semibold is-capitalized"
                  >Not maintained
                </span>
              </span>
            </p>
            <p v-else class="is-size-6">
              <span class="is-opacity-6 is-size-7 has-text-weight-medium"
                >started at {{ project.createdAt | formatDateMonthYearShort }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Item",
  components: {},
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const thumbnail = computed(() =>
      require("@/static/public/img/" + props.project.thumbnail)
    );

    const thumbnailSmall = computed(() =>
      require(`@/static/public/img/${props.project.thumbnail}?lqip`)
    );

    return { thumbnail, thumbnailSmall };
  },
});
</script>
