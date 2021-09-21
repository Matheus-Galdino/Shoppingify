<template>
  <div class="checkbox-container">
    <input hidden :id="id" type="checkbox" :value="modelValue" @input="emit" />
    <div class="checkbox" @click="handleClick">
      <span class="material-icons"> check </span>
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomCheckbox",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emit() {
      this.$emit("update:modelValue", !this.modelValue);
    },
    handleClick() {
      const input = document.getElementById(this.id);
      input?.click();
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox-container {
  display: flex;
  column-gap: 1rem;
  align-items: center;

  label {
    cursor: pointer;
    font-weight: 500;
    font-size: 1.3rem;
  }
}

.checkbox {
  width: 30px;
  height: 30px;
  padding: 5px;

  display: grid;
  place-content: center;

  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #d3d2d2;

  .material-icons {
    opacity: 0;
    width: 100%;
    color: #f9a109;
    transition: all 150ms ease-in;
  }
}

input:checked ~ .checkbox {
  .material-icons {
    opacity: 1;
  }
}
</style>