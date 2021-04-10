<template>
  <div class="">
    <p class="title is-size-4">
      <b-skeleton height="30px"></b-skeleton>
    </p>
    <p class="">
      <b-skeleton />
      <b-skeleton />
    </p>
    <div class="pt-3">
      <table class="table">
        <tbody>
          <tr v-for="index in 5" :key="index">
            <td class="has-text-weight-semibold">
              <b-skeleton width="100px" />
            </td>
            <td>
              <b-skeleton width="150px" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ItemPlaceholder",
  components: {},
  setup() {
    return {};
  },
});
</script>
