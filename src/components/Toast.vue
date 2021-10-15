<template>
  <div
    :class="toastType"
    class="toast-notification"
    :style="`--width: ${percentage}`"
  >
    <div class="icon-container">
      <span class="material-icons">
        {{ config.error ? "error_outline" : "done" }}
      </span>
    </div>
    <p class="toast-notification__text">{{ config.message }}</p>

    <button class="close" @click="$emit('close')">X</button>
  </div>
</template>

<script lang="ts">
import { Toast } from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Toast",
  props: {
    config: {
      type: Object as PropType<Toast>,
      default() {
        return {
          error: false,
          message: "This is a toast notification",
        };
      },
    },
    percentage: {
      type: Number,
    },
  },
  computed: {
    toastType(): string {
      return this.config.error ? "error" : "success";
    },
  },
});
</script>

<style lang="scss" scoped>
.toast-notification {
  display: flex;
  column-gap: 1rem;
  align-items: center;

  width: 90vw;
  padding: 0.8rem;
  padding-right: 1.3rem;

  max-width: 300px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);

  position: fixed;
  right: 10px;
  bottom: 15px;
  overflow: hidden;

  &::before {
    content: "";
    height: 3px;
    background: #c4c4c4;
    width: calc(var(--width) * 1%);

    position: absolute;
    left: 0;
    bottom: 0;
  }

  &__text {
    font-size: 1.5rem;
  }

  &.error .icon-container {
    background: #eb5757;
  }

  &.success .icon-container {
    background: #0b62f9;
  }
}

.icon-container {
  display: grid;
  place-content: center;

  width: 30px;
  height: 30px;

  color: #fff;
  border-radius: 50%;
}

.close {
  border: 0;
  background: 0;
  font-size: 1.4rem;
  margin-left: auto;
  display: inline-block;
}
</style>