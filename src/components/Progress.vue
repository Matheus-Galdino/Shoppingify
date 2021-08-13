<template>
  <div class="progress">
    <div class="fill" :style="fillStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Progress",
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
      default: "#000",
    },
  },
  computed: {
    fillStyle(): Record<string, string | number> {
      return {
        "--width": this.percentage,
        "--background": this.background,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.progress {
  height: 5px;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: #e0e0e0;
}

.fill {
  height: 100%;
  border-radius: 4px;
  background: var(--background);
  width: calc(var(--width) * 1%);
}
</style>