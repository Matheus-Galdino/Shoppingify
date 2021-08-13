<template>
  <div id="mask">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Mask",
});
</script>

<style lang="scss" scoped>
#mask {
  position: fixed;
  inset: 0;

  display: grid;
  place-content: center;
  background: rgba(0, 0, 0, 0.2);
}
</style>