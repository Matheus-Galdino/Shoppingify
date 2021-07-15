<template>
  <aside class="add-item">
    <form>
      <legend>Add a new item</legend>

      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Enter a name" />
      </div>

      <div class="input-group">
        <label for="note">Note(optional)</label>
        <textarea id="note" placeholder="Enter a quote"></textarea>
      </div>

      <div class="input-group">
        <label for="image">Image(optional)</label>
        <input type="url" id="image" placeholder="Enter a url" />
      </div>

      <div class="input-group">
        <label for="category">Category</label>
        <input type="text" id="category" placeholder="Type a category" />
      </div>
    </form>

    <div class="actions-group">
      <button class="borderless" @click="$emit('changeTab', 'ActiveList')">
        cancel
      </button>
      <button>Save</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddItem",
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

  &:focus-within :is(input, textarea) {
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