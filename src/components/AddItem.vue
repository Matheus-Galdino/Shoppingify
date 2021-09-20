<template>
  <aside class="add-item">
    <form>
      <legend>Add a new item</legend>

      <div class="input-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="item.name"
          placeholder="Enter a name"
        />
      </div>

      <div class="input-group">
        <label for="note">Note(optional)</label>
        <textarea
          id="note"
          maxlength="300"
          v-model="item.note"
          placeholder="Enter a quote"
        ></textarea>
      </div>

      <div class="input-group">
        <label for="image">Image(optional)</label>
        <input
          type="url"
          id="image"
          placeholder="Enter a url"
          v-model="item.imageUrl"
        />
      </div>

      <div class="input-group">
        <label for="category">Category</label>
        <select id="category" v-model.number="item.categoryId">
          <option value="-1" disabled>Select a category...</option>
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <small @click="isAdding = true">
          <strong>Add new category</strong>
        </small>
      </div>
    </form>

    <div class="actions-group">
      <button class="borderless" @click="closeTab">cancel</button>
      <button @click="save">Save</button>
    </div>

    <Mask v-show="isAdding">
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
          <button class="cancel" type="button" @click="closeForm">
            Cancel
          </button>
          <button>Save</button>
        </div>
      </form>
    </Mask>
  </aside>
</template>

<script lang="ts">
import API from "@/API";
import Item from "@/models/Item.interface";
import Toast from "@/models/Toast.interface";
import Category from "@/models/Category.interface";

import { defineComponent } from "vue";

import Mask from "./Mask.vue";

export default defineComponent({
  name: "AddItem",
  components: { Mask },
  data() {
    return {
      isAdding: false,
      item: { categoryId: -1 } as Item,
      category: {} as Category,
    };
  },
  methods: {
    async save() {
      const toastConfig = {} as Toast;

      try {
        if (!this.item.name?.trim()) throw new Error("Name must not be empty");

        await API.saveItem(this.item);
        this.$store.dispatch("getItems");
        this.closeTab();

        toastConfig.error = false;
        toastConfig.message = "Item added";
      } catch (error) {
        toastConfig.error = true;
        toastConfig.message = error.message;
      } finally {
        this.$store.commit("setToastConfig", toastConfig);
        this.$store.commit("setShowToast", true);
      }
    },
    async addCategory() {
      const toastConfig = {} as Toast;

      try {
        if (!this.category.name?.trim())
          throw new Error("Category name must not be empty");

        await API.saveCategory(this.category);
        this.$store.dispatch("getCategories");

        this.closeForm();
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
    closeTab() {
      this.$emit("change-aside-and-close");
    },
    closeForm() {
      this.isAdding = false;
      this.item.categoryId = -1;
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
});
</script>

<style lang="scss" scoped>
.add-item {
  padding: 3rem;
  max-width: 500px;

  display: grid;
  grid-template-rows: 1fr auto;

  legend {
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }
}

.input-group {
  &:focus-within label {
    color: #f9a109;
  }

  &:focus-within :is(input, textarea, select) {
    border-color: #f9a109;
  }

  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  small {
    display: block;
    cursor: pointer;
    color: #f9a109;
    font-size: 1.4rem;
    margin-top: 0.3rem;
  }
}

label {
  display: block;
  color: #34333a;
  font-size: 1.4rem;
  margin-bottom: 6px;
}

input,
select,
textarea {
  display: inline-block;
  width: 100%;

  resize: none;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #bdbdbd;
}

.actions-group {
  text-align: center;

  button {
    display: inline-block;
    padding: 2rem 2.5rem;

    color: #fff;
    font-weight: bold;
    font-size: 1.6rem;
    border-radius: 12px;
    background: #f9a109;

    &.borderless {
      color: #34333a;
      margin-right: 2rem;
      background: transparent;
    }
  }
}

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