<template>
  <div ref="copy" class="copy">
    <b-icon :icon="icon" :type="iconType"></b-icon>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from "@vue/composition-api";
import Clipboard from "clipboard";

export default defineComponent({
  name: "CopyButton",
  components: {},
  setup() {
    const state = ref("init");
    const copy = ref(null);

    const icon = computed(() => {
      if (state.value === "copied") {
        return "check";
      }
      return "content-copy";
    });

    const iconType = computed(() => {
      if (state.value === "copied") {
        return "is-white";
      }
      return "is-grey";
    });

    onMounted(() => {
      // @ts-ignore
      const copyCode = new Clipboard(copy.value, {
        target(trigger) {
          return trigger.previousElementSibling;
        },
      });
      copyCode.on("success", (event) => {
        event.clearSelection();
        state.value = "copied";
        window.setTimeout(() => {
          state.value = "init";
        }, 2000);
      });
    });

    return { state, copy, icon, iconType };
  },
});
</script>
