<template>
  <div class="home">
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
}
</style>
