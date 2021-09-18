<template>
  <div class="home page">
    <h1>
      <span>Shoppingify</span> allows you take your <br />
      shopping list wherever you go
    </h1>
    <ItemGroup
      v-for="(group, index) in itemsGroups"
      :key="index"
      :group="group"
      @change-aside="$emit('change-aside', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ItemGroup from "@/components/ItemGroup.vue";

export default defineComponent({
  name: "Home",
  components: { ItemGroup },
  computed: {
    itemsGroups() {
      return this.$store.state.items;
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  h1 {
    display: none;

    @media (min-width: 1200px) {
      display: block;
      font-size: 26px;
      margin-bottom: 50px;
    }

    span {
      color: #f9a109;
      font-weight: bold;
    }
  }
}
</style>
