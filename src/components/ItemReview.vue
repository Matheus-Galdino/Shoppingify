<template>
  <aside class="item-review">
    <span class="back-button" @click="$emit('change-aside-and-close')">
      <span class="material-icons"> arrow_right_alt </span>
      back
    </span>

    <div class="item-review__body">
      <img :src="item.imageUrl" />

      <span class="title">name</span>
      <p class="content">{{ item.name }}</p>

      <span class="title">category</span>
      <p class="content">{{ item.category.name }}</p>

      <span class="title" v-show="item.note">note</span>
      <p class="content">
        {{ item.note }}
      </p>
    </div>

    <div class="item-review__actions">
      <button class="borderless" @click="deleteItem">delete</button>
      <button @click="addToList">Add to list</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ListAPI from "@/services/ListAPI";
import ItemAPI from "@/services/ItemAPI";
import handleError from "@/utils/HandleError";

export default defineComponent({
  name: "ItemReview",
  methods: {
    async deleteItem() {
      handleError(async () => {
        await ItemAPI.deleteItem(this.item, this.token);
        await this.$store.dispatch("getItems");
        this.$emit("change-aside-and-close");
        this.$store.commit("setDetailItem", null);
      }, "Item deleted");
    },
    async addToList() {
      const listId = this.$store.state.activeList?.id;

      handleError(async () => {
        if (!listId) throw new Error("Cannot add item without an active list");

        await ListAPI.addItemToList(listId, this.item.id, this.token);
        await this.$store.dispatch("getActiveListItems");
      }, "Item added to list");
    },
  },
  computed: {
    item() {
      return this.$store.state.detailItem;
    },
    token(): string {
      return this.$store.state.userToken;
    },
  },
});
</script>

<style lang="scss" scoped>
.item-review {
  padding: 3rem;
  max-width: 500px;
  background: #fff;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

.back-button {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  cursor: pointer;
  color: #f9a109;
  font-weight: bold;
  font-size: 1.4rem;

  .material-icons {
    color: #f9a109;
    margin-right: 6px;
    transform: rotate(180deg);
  }
}

.item-review__body {
  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;

    border-radius: 25px;
    margin-bottom: 1rem;
  }
}

.title {
  display: block;
  color: #c1c1c4;
  font-size: 1.5rem;

  margin-top: 3rem;
  margin-bottom: 1rem;
}

.content {
  font-size: 2rem;
}

.item-review__actions {
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