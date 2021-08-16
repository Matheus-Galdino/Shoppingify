<template>
  <li class="item">
    <p @click="clickHandler">{{ item.name }}</p>
    <span class="material-icons" @click="addToList"> add </span>
  </li>
</template>

<script lang="ts">
import API from "@/API";
import ItemType from "@/models/Item.interface";
import Toast from "@/models/Toast.interface";
import { defineComponent, PropType } from "vue";

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

      const toastConfig = {} as Toast;

      try {
        if (!listId) {
          throw new Error("Cannot add item without an active list");
        }

        await API.addItemToList(listId, this.item.id);
        await this.$store.dispatch("getActiveListItems");

        toastConfig.error = false;
        toastConfig.message = "Item added to list";
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