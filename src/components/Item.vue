<template>
  <li class="item" @click="clickHandler">
    <p>{{ item.name }}</p>
    <span class="material-icons"> add </span>
  </li>
</template>

<script lang="ts">
import ItemType from "@/models/Item.interface";
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
  cursor: pointer;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.4rem;
  }

  .material-icons {
    font-size: 2rem;
    color: #c1c1c4;
  }
}
</style>