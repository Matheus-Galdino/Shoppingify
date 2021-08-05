<template>
  <div class="history">
    <h1>Shopping history</h1>
    <ul class="lists">
      <Shopping-list :list="list" v-for="list in lists" :key="list.id" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ShoppingList from "@/components/ShoppingList.vue";

export default defineComponent({
  name: "History",
  components: { ShoppingList },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
});
</script>

<style lang="scss" scoped>
.history {
  padding: 3rem 2rem;

  h1 {
    color: #34333a;
    font-size: 2.6rem;
    line-height: 3.2rem;
    margin-bottom: 3rem;
  }
}

.lists {
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
}
</style>
