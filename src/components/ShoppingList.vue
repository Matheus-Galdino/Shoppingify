<template>
  <li class="shopping-list">
    <!-- <Custom-radio /> -->
    <p class="shopping-list__name">{{ list.name }}</p>
    <p class="shopping-list__date">
      <span class="material-icons"> event_note </span>
      {{ list.date }}
    </p>

    <span class="shopping-list__status completed"> completed </span>

    <router-link to="/">
      <span class="material-icons"> navigate_next </span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ShoppingList from "@/models/ShoppingList.interface";

export default defineComponent({
  name: "ShoppingList",
  props: {
    list: {
      type: Object as PropType<ShoppingList>,
      required: true,
    },
  },
  computed: {
    listDate(): string {
      return this.list.date.toDateString();
    },
  },
});
</script>

<style lang="scss" scoped>
.shopping-list {
  height: 5rem;
  display: flex;
  padding: 0 1rem;
  column-gap: 2.5rem;
  align-items: center;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  &__name {
    font-size: 1.6rem;
    line-height: 2rem;
    margin-right: auto;
  }

  &__date {
    display: none;
    column-gap: 1rem;
    align-items: center;

    color: #c1c1c4;
    font-size: 1.2rem;
    line-height: 1.5rem;
  }

  &__status {
    padding: 5px;
    display: inline-block;

    border: 1px solid;
    border-radius: 8px;
    box-sizing: border-box;

    &.completed {
      color: #56ccf2;
      border-color: #56ccf2;
    }

    &.cancelled {
      color: #eb5757;
      border-color: #eb5757;
    }
  }
}

a {
  color: #f9a109;
}
</style>