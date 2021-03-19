<template>
  <b-table
    :data="[1, 2, 3, 4, 5]"
    :selected.sync="selected"
    :mobile-cards="false"
    class="repository-list"
  >
    <b-table-column field="name" label="Name">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-size-6 mb-2">
                <b-skeleton width="10em" height="1.4em" />
              </p>
              <p class="is-size-7 mb-2">
                <b-skeleton />
              </p>
              <nav class="level is-opacity-7 pb-0">
                <div class="level-left">
                  <div v-for="index in 5" :key="index" class="level-item pr-2">
                    <span class="icon is-small">
                      <b-skeleton width="1.8em" height="1.2em" />
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </b-table-column>
  </b-table>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "ListPlaceholder",
  components: {},
  setup() {},
});
</script>
