<template>
  <div class="stats">
    <h2>Top items</h2>
    <h3 v-for="(item, index) in topItems" :key="index">
      {{ item.key }}
    </h3>

    <h4 v-for="(category, index) in topCategories" :key="index">
      {{ category.key }}
    </h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Stats",
  computed: {
    topItems() {
      return this.$store.state.topItems;
    },
    topCategories() {
      return this.$store.state.topCategories;
    },
  },
});
</script>

<style lang="scss" scoped>
.stats {
  padding: 3rem 2rem;
}
</style>