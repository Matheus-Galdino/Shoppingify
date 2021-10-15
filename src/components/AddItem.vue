<template>
  <aside class="add-item">
    <form>
      <legend>Add a new item</legend>

      <CustomInput
        id="name"
        label="Name"
        v-model="item.name"
        placeholder="Enter a name"
      />

      <CustomInput
        id="note"
        :maxLength="300"
        :isTextarea="true"
        v-model="item.note"
        label="Note (optional)"
        placeholder="Enter a quote"
      />

      <CustomInput
        id="image"
        type="url"
        label="Image(optional)"
        v-model="item.imageUrl"
        placeholder="Enter a url"
      />

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
      <AddCategoryForm @close="closeForm" />
    </Mask>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ItemAPI from "@/services/ItemAPI";
import { Item, Category } from "@/models";

import handleError from "@/utils/HandleError";

import Mask from "./Mask.vue";
import CustomInput from "./CustomInput.vue";
import AddCategoryForm from "./AddCategoryForm.vue";

export default defineComponent({
  name: "AddItem",
  components: { Mask, CustomInput, AddCategoryForm },
  data() {
    return {
      isAdding: false,
      item: { categoryId: -1 } as Item,
      category: {} as Category,
    };
  },
  methods: {
    async save() {
      handleError(async () => {
        if (!this.item.name?.trim()) throw new Error("Name must not be empty");

        await ItemAPI.saveItem(this.item, this.token);
        this.$store.dispatch("getItems");
        this.closeTab();
      }, "Item added");
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
    token(): string {
      return this.$store.state.userToken;
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

  &:focus-within select {
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

select {
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
</style>
