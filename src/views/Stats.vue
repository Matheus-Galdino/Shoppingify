<template>
  <div class="stats">
    <h2>Top items</h2>
    <ul class="top-items">
      <li v-for="(item, index) in topItems" :key="index">
        <p>
          <span> {{ item.key }} </span>
          <span class="percentage"> {{ item.percentage }}% </span>
        </p>

        <Progress :percentage="item.percentage" background="#F9A109" />
      </li>
    </ul>

    <h2>Top categories</h2>
    <ul class="top-categories">
      <li v-for="(category, index) in topCategories" :key="index">
        <p>
          <span> {{ category.key }} </span>
          <span> {{ category.percentage }}% </span>
        </p>

        <Progress :percentage="category.percentage" background="#56CCF2" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Progress from "@/components/Progress.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Stats",
  components: { Progress },
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

  h2 {
    font-size: 2rem;
    line-height: 2.5rem;
    margin-bottom: 2rem;
  }
}

.top-items,
.top-categories {
  margin-bottom: 3rem;

  li:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.4rem;
    margin-bottom: 1rem;

    .percentage {
      font-size: 1.6rem;
    }
  }
}
</style>