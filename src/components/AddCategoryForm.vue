<template>
  <form @submit.prevent="addCategory" class="add-category-form">
    <CustomInput
      label="Name"
      id="new-category"
      v-model.trim="category.name"
      placeholder="Category name"
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

import { Category } from "@/models";
import handleError from "@/utils/HandleError";
import CategoryAPI from "@/services/CategoryAPI";

import CustomInput from "./CustomInput.vue";

export default defineComponent({
  name: "AddCategoryForm",
  components: { CustomInput },
  data() {
    return {
      category: {} as Category,
    };
  },
  methods: {
    async addCategory() {
      handleError(async () => {
        if (!this.category.name) throw new Error("Category name must not be empty");

        await CategoryAPI.saveCategory(this.category, this.token);
        this.$store.dispatch("getCategories");

        this.$emit("close");
      }, "Category added");
    },
  },
  computed: {
    token(): string {
      return this.$store.state.userToken;
    }
  }
});
</script>

<style lang="scss" scoped>
.add-category-form {
  width: 90vw;
  max-width: 600px;

  padding: 2rem;
  background: #fff;
  border-radius: 15px;

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