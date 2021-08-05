<template>
  <div class="radio">
    <input type="radio" :name="name" :checked="checked" hidden />
    <div class="inner-bg"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomRadio",
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      default: "default",
    },
  },
});
</script>

<style lang="scss" scoped>
.radio {
  width: 15px;
  height: 15px;
  padding: 2px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #f9a109;
}

.inner-bg {
  width: 100%;
  height: 100%;
  max-width: 0;
  max-height: 0;
  border-radius: 50%;
  background: #f9a109;
  transition: all 0.2s ease-in-out;
}

input:checked ~ .inner-bg {
  max-width: 15px;
  max-height: 15px;
}
</style>