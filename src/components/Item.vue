<template>
  <li class="item">
    <p @click="clickHandler">{{ item.name }}</p>
    <span class="material-icons" @click="addToList"> add </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ListAPI from "@/services/ListAPI";
import handleError from "@/utils/HandleError";
import ItemType from "@/models/Item.interface";

export default defineComponent({
  name: "Item",
  props: {
    item: {
      type: Object as PropType<ItemType>,
      required: true,
    },
  },
  methods: {
    clickHandler() {
      this.$store.commit("setDetailItem", this.item);
      this.$emit("opened");
    },
    async addToList() {
      const listId = this.$store.state.activeList?.id;

      handleError(async () => {
        if (!listId) {
          throw new Error("Cannot add item without an active list");
        }
        
        await ListAPI.addItemToList(listId, this.item.id, this.token);
        await this.$store.dispatch("getActiveListItems");
      }, "Item added to list");
    },
  },
  computed: {
    token(): string {
      return this.$store.state.userToken;
    },
  }
});
</script>

<style lang="scss" scoped>
.item {
  flex: 1;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;

  max-width: 200px;
  min-width: 150px;

  padding: 1.3rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  p {
    flex-grow: 1;
    cursor: pointer;
    font-size: 1.4rem;
  }

  .material-icons {
    cursor: pointer;
    font-size: 2rem;
    color: #c1c1c4;
  }
}
</style>