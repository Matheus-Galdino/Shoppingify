<template>
  <form @submit.prevent="addCategory" class="add-category-form">
    <label for="new-category">Name</label>
    <input
      type="text"
      id="new-category"
      v-model="category.name"
      placeholder="Category name"
      required
    />

    <div class="add-category-form__footer">
      <button class="cancel" type="button" @click="$emit('close')">
        Cancel
      </button>
      <button>Save</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import API from "@/API";
import Toast from "@/models/Toast.interface";
import Category from "@/models/Category.interface";

export default defineComponent({
  name: "AddCategoryForm",
  data() {
    return {
      category: {} as Category,
    };
  },
  methods: {
    async addCategory() {
      const toastConfig = {} as Toast;

      try {
        if (!this.category.name?.trim())
          throw new Error("Category name must not be empty");

        await API.saveCategory(this.category);
        this.$store.dispatch("getCategories");

        this.$emit("close");
        toastConfig.error = false;
        toastConfig.message = "Category added";
      } catch (error) {
        toastConfig.error = true;
        toastConfig.message = error.message;
      } finally {
        this.$store.commit("setToastConfig", toastConfig);
        this.$store.commit("setShowToast", true);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.add-category-form {
  width: 90vw;
  max-width: 600px;

  padding: 2rem;
  background: #fff;
  border-radius: 15px;

  label {
    display: block;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 1rem;
    margin-bottom: 1rem;
    display: inline-block;

    width: 100%;
    font-size: 1.5rem;
    border-radius: 10px;
    border: 2px solid #bdbdbd;

    &:focus {
      border-color: #f9a109;
    }
  }

  &__footer {
    display: flex;
    margin-top: 1rem;
    justify-content: flex-end;

    button {
      color: #fff;
      padding: 2rem 4rem;
      border-radius: 12px;
      display: inline-block;
      background: #f9a109;

      &.cancel {
        color: #000;
        padding: 2rem;
        background: #fff;
      }
    }
  }
}
</style>