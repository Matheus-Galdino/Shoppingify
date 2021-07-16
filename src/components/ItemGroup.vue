<template>
  <section class="item-group">
    <h3 class="group-title">{{ group.key }}</h3>

    <ul class="items">
      <Item
        v-for="item in group.items"
        :key="item.id"
        :item="item"
        @opened="$emit('change-aside', 'ItemReview')"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ItemGroupType from "@/models/ItemGroup.interface";
import Item from "./Item.vue";

export default defineComponent({
  components: { Item },
  name: "ItemGroup",
  props: {
    group: {
      type: Object as PropType<ItemGroupType>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.group-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.item-group {
  margin-bottom: 3rem;
}

.items {
  display: flex;
  row-gap: 2rem;
  flex-wrap: wrap;
  column-gap: 1rem;
  align-items: center;
}
</style>