<template>
  <div class="home">
    <h1>
      <span>Shoppingify</span>
      allows you take your shopping list wherever you go
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
  padding: 3rem 2rem;

  h1 {
    max-width: 31ch;
    font-size: 2rem;
    margin-bottom: 4rem;

    span {
      color: #f9a109;
      font-weight: bold;
    }
  }
}
</style>
