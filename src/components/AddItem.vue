<template>
  <aside class="add-item">
    <form>
      <legend>Add a new item</legend>

      <div class="input-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter a name"
          v-model="item.name"
        />
      </div>

      <div class="input-group">
        <label for="note">Note(optional)</label>
        <textarea
          id="note"
          placeholder="Enter a quote"
          v-model="item.note"
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
        <select v-model="item.categoryId">
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </form>

    <div class="actions-group">
      <button class="borderless" @click="closeTab">cancel</button>
      <button @click="save">Save</button>
    </div>
  </aside>
</template>

<script lang="ts">
import API from "@/API";
import Item from "@/models/Item.interface";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddItem",
  data() {
    return {
      item: {} as Item,
    };
  },
  methods: {
    async save() {
      await API.saveItem(this.item);
      this.$store.dispatch("getItems");
      this.closeTab();
    },
    closeTab() {
      this.$emit("change-aside", "ActiveList");
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
</style>