<template>
  <div class="popup">
    <p class="popup-text">{{ text }}</p>
    <button class="close" @click="$emit('cancel')">x</button>

    <div class="popup__footer">
      <button class="cancel" @click="$emit('cancel')">cancel</button>
      <button class="confirm" @click="$emit('confirm')">Yes</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmPopup",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.popup {
  width: 90vw;
  max-width: 500px;
  padding: 3rem 2rem;
  background: #fff;
  position: relative;
  border-radius: 24px;

  &-text {
    color: #34334a;
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}

.cancel,
.confirm {
  padding: 2rem;
  border-radius: 12px;
  display: inline-block;
}

.confirm {
  color: #fff;
  background: #eb5757;
}

.cancel {
  background: 0;
  color: #34333a;
}

.close {
  position: absolute;
  top: 1rem;
  right: 2rem;

  border: 0;
  background: 0;
  color: #828282;
  font-size: 1.7rem;
}
</style>