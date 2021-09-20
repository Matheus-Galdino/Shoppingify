<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <template v-if="isTextarea">
      <textarea
        :id="id"
        :value="modelValue"
        :maxlength="maxLength"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </template>

    <template v-else>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :maxlength="maxLength"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    id: {
      type: String,
    },
    label: {
      type: String,
      default: "Label",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return ["text", "url", "date", "email", "password"].includes(value);
      },
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    isTextarea: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 100,
    },
  },
});
</script>

<style lang="scss" scoped>
.input-group {
  label {
    display: block;
    color: #34333a;
    font-size: 1.4rem;
    margin-bottom: 6px;
  }

  input,
  textarea {
    display: inline-block;
    width: 100%;

    resize: none;
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #bdbdbd;
  }

  &:focus-within label {
    color: #f9a109;
  }

  &:focus-within :is(input, textarea) {
    border-color: #f9a109;
  }

  &:not(:first-of-type) {
    margin-top: 2rem;
  }
}
</style>