<template>
  <li class="item">
    <p class="item-name">{{ item.name }}</p>
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Item } from "@/models";

export default defineComponent({
  name: "ShoppingListItem",
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-name {
    font-size: 1.4rem;
  }
}
</style>